const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profile.controller.js');
const authMiddleware = require('../controllers/auth.middleware.js');

// Routes for creating/updating and getting user profile
router.post('/profile', authMiddleware, createOrUpdateProfile);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
