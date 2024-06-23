const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, password });
      await user.save();
      res.json({ message: "User created successfully" });
    } else {
      res.json({ message: "User already exists" });
    }
  } catch (error) {
    console.error('Error in signin:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const otplessAuth = async (req, res) => {
  const { userId, identities, network, deviceInfo } = req.body;

  try {
    let user = await User.findOne({ otplessId: userId });

    if (!user) {
      user = new User({
        otplessId: userId,
        identities,
        network,
        deviceInfo
      });
      await user.save();
    } else {
      user.identities = identities;
      user.network = network;
      user.deviceInfo = deviceInfo;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use the same secret key
    res.json({ success: true, user, token });
  } catch (error) {
    console.error('Error in OTPLESS authentication:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, profile: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, profile: user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { signin, otplessAuth, getProfile, updateProfile };
