const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const user = new User({
      name,
      email,
      password,
      credits: 24 // 24 free credits for new users
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      joinedDate: user.joinedDate,
      stats: user.getStats()
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully! You have been awarded 24 free credits.',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0] || 'Validation error'
      });
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = generateToken(user._id);

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const { name, email } = req.body;

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userData
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
});

// @route   POST /api/auth/skills
// @desc    Add skill to user profile
// @access  Private
router.post('/skills', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const { skill, category, level, description, type } = req.body;

    if (!skill || !category || !level || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide skill, category, level, and type'
      });
    }

    const newSkill = {
      skill,
      category,
      level,
      description: description || ''
    };

    if (type === 'offered') {
      user.skillsOffered.push(newSkill);
    } else if (type === 'learning') {
      user.skillsLearning.push(newSkill);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "offered" or "learning"'
      });
    }

    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      skillsOffered: user.skillsOffered,
      skillsLearning: user.skillsLearning,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: 'Skill added successfully',
      user: userData
    });

  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during skill addition'
    });
  }
});

// @route   DELETE /api/auth/skills/:type/:index
// @desc    Remove skill from user profile
// @access  Private
router.delete('/skills/:type/:index', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const { type, index } = req.params;
    const skillIndex = parseInt(index);

    if (type === 'offered') {
      if (skillIndex >= 0 && skillIndex < user.skillsOffered.length) {
        user.skillsOffered.splice(skillIndex, 1);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid skill index'
        });
      }
    } else if (type === 'learning') {
      if (skillIndex >= 0 && skillIndex < user.skillsLearning.length) {
        user.skillsLearning.splice(skillIndex, 1);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid skill index'
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "offered" or "learning"'
      });
    }

    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      skillsOffered: user.skillsOffered,
      skillsLearning: user.skillsLearning,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: 'Skill removed successfully',
      user: userData
    });

  } catch (error) {
    console.error('Remove skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during skill removal'
    });
  }
});

// @route   POST /api/auth/deduct-credit
// @desc    Deduct one credit from user (hourly usage)
// @access  Private
router.post('/deduct-credit', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has credits
    if (user.credits <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits'
      });
    }

    // Deduct one credit
    user.credits -= 1;
    user.totalHoursLearned += 1;
    
    // Update last activity
    user.lastLogin = new Date();
    
    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      skillsOffered: user.skillsOffered,
      skillsLearning: user.skillsLearning,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: 'Credit deducted successfully',
      user: userData,
      hoursSpent: user.totalHoursLearned
    });

  } catch (error) {
    console.error('Credit deduction error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during credit deduction'
    });
  }
});

// @route   POST /api/auth/add-credit
// @desc    Add credits to user (when teaching)
// @access  Private
router.post('/add-credit', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const { hours = 1 } = req.body;

    // Add credits (1 credit per hour taught)
    user.credits += hours;
    user.totalHoursTaught += hours;
    user.sessionsCompleted += 1;
    
    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      skillsOffered: user.skillsOffered,
      skillsLearning: user.skillsLearning,
      joinedDate: user.joinedDate,
      lastLogin: user.lastLogin,
      stats: user.getStats()
    };

    res.json({
      success: true,
      message: `${hours} credit(s) added successfully`,
      user: userData,
      creditsEarned: hours
    });

  } catch (error) {
    console.error('Credit addition error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during credit addition'
    });
  }
});

// @route   POST /api/auth/start-session
// @desc    Start user session for credit tracking
// @access  Private
router.post('/start-session', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Session started successfully',
      sessionStartTime: new Date(),
      userCredits: user.credits
    });

  } catch (error) {
    console.error('Session start error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during session start'
    });
  }
});

// @route   POST /api/auth/end-session
// @desc    End user session
// @access  Private
router.post('/end-session', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({
      success: true,
      message: 'Session ended successfully'
    });

  } catch (error) {
    console.error('Session end error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during session end'
    });
  }
});

module.exports = router;