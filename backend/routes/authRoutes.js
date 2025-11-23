const express = require('express');
const router = express.Router();

try {
  const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
  } = require('../controllers/authController');
  const { protect } = require('../middleware/authMiddleware');

  // Register routes
  router.post('/register', registerUser);
  router.post('/login', loginUser);
  router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

  // Log registered routes for debugging
  console.log('📝 Auth routes registered: POST /register, POST /login, GET/PUT /profile');
  console.log('   Full paths: POST /api/auth/register, POST /api/auth/login');
} catch (error) {
  console.error('❌ Error setting up auth routes:', error);
  throw error;
}

module.exports = router;