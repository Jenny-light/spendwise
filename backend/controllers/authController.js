const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log('📝 Registration attempt:', { name, email, hasPassword: !!password });

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log('❌ User already exists:', email);
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    // Create user
    const user = await User.create({
      name,
      email,
      password, // Will be hashed by pre-save middleware
    });

    if (user) {
      // Generate token
      let token;
      try {
        token = generateToken(user._id);
      } catch (tokenError) {
        console.error('Token generation error:', tokenError);
        res.status(500);
        throw new Error('Failed to generate authentication token. Please check server configuration.');
      }
      
      console.log('✅ User registered successfully:', user.email);
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      message: error.message,
    });
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      res.status(400);
      throw new Error(messages.join(', '));
    }
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      res.status(400);
      throw new Error('User with this email already exists');
    }
    // Handle database connection errors
    if (error.name === 'MongoServerError' || error.message.includes('MongoServerError') || error.message.includes('buffering timed out')) {
      console.error('Database connection error:', error);
      res.status(500);
      throw new Error('Database connection error. Please ensure MongoDB is running and try again.');
    }
    // Re-throw other errors
    throw error;
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check for user email (include password for comparison)
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // Will be hashed by pre-save middleware
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};