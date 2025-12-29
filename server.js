const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Session tracking for credit deduction
const activeSessions = new Map(); // userId -> { startTime, lastActivity, creditDeductionTimer }

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Session management functions
const startUserSession = (userId) => {
  // Clear any existing session for this user
  if (activeSessions.has(userId)) {
    clearTimeout(activeSessions.get(userId).creditDeductionTimer);
  }

  const sessionData = {
    startTime: new Date(),
    lastActivity: new Date(),
    creditDeductionTimer: null
  };

  // Set timer to deduct credit after 1 hour (3600000 ms)
  sessionData.creditDeductionTimer = setTimeout(async () => {
    try {
      const User = require('./models/User');
      const user = await User.findById(userId);
      
      if (user && user.credits > 0) {
        user.credits -= 1;
        user.totalHoursLearned += 1;
        user.lastLogin = new Date();
        await user.save();
        
        console.log(`Credit deducted for user ${userId}. Remaining credits: ${user.credits}`);
        
        // Start a new session cycle if user is still active
        if (activeSessions.has(userId)) {
          startUserSession(userId);
        }
      } else {
        console.log(`User ${userId} has no credits left or user not found`);
        endUserSession(userId);
      }
    } catch (error) {
      console.error(`Error deducting credit for user ${userId}:`, error);
    }
  }, 3600000); // 1 hour = 3600000 milliseconds

  activeSessions.set(userId, sessionData);
  console.log(`Session started for user ${userId}`);
};

const updateUserActivity = (userId) => {
  if (activeSessions.has(userId)) {
    const sessionData = activeSessions.get(userId);
    sessionData.lastActivity = new Date();
    activeSessions.set(userId, sessionData);
  }
};

const endUserSession = (userId) => {
  if (activeSessions.has(userId)) {
    const sessionData = activeSessions.get(userId);
    if (sessionData.creditDeductionTimer) {
      clearTimeout(sessionData.creditDeductionTimer);
    }
    activeSessions.delete(userId);
    console.log(`Session ended for user ${userId}`);
  }
};

// Middleware to track user activity
const trackUserActivity = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (token) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      
      // Start session if not exists, update activity if exists
      if (!activeSessions.has(userId)) {
        startUserSession(userId);
      } else {
        updateUserActivity(userId);
      }
    } catch (error) {
      // Invalid token, ignore
    }
  }
  
  next();
};

// Apply activity tracking middleware to all API routes
app.use('/api', trackUserActivity);

// API Routes
app.use('/api/auth', require('./routes/auth'));

// Basic API route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'LearnInfinity API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Root API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'LearnInfinity API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/me'
    }
  });
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown - cleanup active sessions
process.on('SIGTERM', () => {
  console.log('SIGTERM received, cleaning up active sessions...');
  activeSessions.forEach((sessionData, userId) => {
    if (sessionData.creditDeductionTimer) {
      clearTimeout(sessionData.creditDeductionTimer);
    }
  });
  activeSessions.clear();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, cleaning up active sessions...');
  activeSessions.forEach((sessionData, userId) => {
    if (sessionData.creditDeductionTimer) {
      clearTimeout(sessionData.creditDeductionTimer);
    }
  });
  activeSessions.clear();
  process.exit(0);
});