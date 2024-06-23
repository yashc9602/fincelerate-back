const Profile = require('../models/profile.model');

// Create or update user profile
const createOrUpdateProfile = async (req, res) => {
  const { userId } = req;
  const {
    wouldInvest,
    yearlyIncome,
    sourceOfIncome,
    usedBuyNowPayLater,
    currentlyInvested,
    portfolioSize,
    investmentOptions,
    investmentDuration,
    riskTolerance
  } = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      // Update profile
      profile.wouldInvest = wouldInvest;
      profile.yearlyIncome = yearlyIncome;
      profile.sourceOfIncome = sourceOfIncome;
      profile.usedBuyNowPayLater = usedBuyNowPayLater;
      profile.currentlyInvested = currentlyInvested;
      profile.portfolioSize = portfolioSize;
      profile.investmentOptions = investmentOptions;
      profile.investmentDuration = investmentDuration;
      profile.riskTolerance = riskTolerance;
    } else {
      // Create new profile
      profile = new Profile({
        user: userId,
        wouldInvest,
        yearlyIncome,
        sourceOfIncome,
        usedBuyNowPayLater,
        currentlyInvested,
        portfolioSize,
        investmentOptions,
        investmentDuration,
        riskTolerance
      });
    }

    await profile.save();
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Error in creating/updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { createOrUpdateProfile, getProfile };
