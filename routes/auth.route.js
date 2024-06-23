const express = require('express');
const router = express.Router();
const { signin, otplessAuth, getProfile, updateProfile } = require('../controllers/auth.controller.js');
const authMiddleware = require('../controllers/auth.middleware.js');

router.post('/signin', signin);
router.post('/otpless', otplessAuth);

router.get('/profile', authMiddleware, getProfile); // Add route for fetching profile
router.post('/profile', authMiddleware, updateProfile); // Add route for updating profile

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
