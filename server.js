const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Alternative way to load .env in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Session tracking for credit deduction
const activeSessions = new Map(); // userId -> { startTime, lastActivity, creditDeductionTimer }

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? true  // Allow same origin for single deployment
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

console.log('CORS configured for single deployment');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with retry logic
const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      // Debug: Log environment variables
      console.log('=== MongoDB Connection Attempt ===');
      console.log('Attempt:', retries + 1);
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
      console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
      console.log('MONGODB_URI starts with:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) : 'undefined');
      
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }
      
      const mongoUri = process.env.MONGODB_URI;
      console.log('Attempting to connect...');
      
      // Remove deprecated options for newer Mongoose versions
      const conn = await mongoose.connect(mongoUri);
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log('Database name:', conn.connection.name);
      console.log('Connection ready state:', conn.connection.readyState);
      break;
      
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries} failed:`, error.message);
      
      if (retries >= maxRetries) {
        console.error('🚨 All MongoDB connection attempts failed');
        console.error('Full error:', error);
        // Don't exit in production, let the app run without DB for debugging
        if (process.env.NODE_ENV !== 'production') {
          process.exit(1);
        }
      } else {
        console.log(`⏳ Retrying in 5 seconds... (${retries}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
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
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    cors: 'enabled'
  });
});

// Test CORS endpoint
app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Try to perform a simple database operation
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    
    res.json({
      message: 'Database test completed',
      connectionState: states[dbState],
      userCount: userCount,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set',
      mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database test failed',
      error: error.message,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set'
    });
  }
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
  const buildPath = path.join(__dirname, 'client/build');
  
  // Check if build directory exists
  const fs = require('fs');
  if (fs.existsSync(buildPath)) {
    console.log('Serving static files from:', buildPath);
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => {
      const indexPath = path.join(buildPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({ 
          error: 'Frontend build not found',
          message: 'The React app has not been built yet. Please run the build process.'
        });
      }
    });
  } else {
    console.log('Build directory not found:', buildPath);
    app.get('*', (req, res) => {
      res.status(404).json({ 
        error: 'Frontend not built',
        message: 'The React app build directory does not exist. Please run the build process.',
        buildPath: buildPath
      });
    });
  }
} else {
  // Development mode - just serve API
  app.get('/', (req, res) => {
    res.json({ 
      message: 'LearnInfinity API Server - Development Mode',
      note: 'Frontend should be running on port 3000'
    });
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