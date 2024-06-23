const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wouldInvest: { type: Boolean, required: true },
  yearlyIncome: { type: String, required: true },
  sourceOfIncome: { type: String, required: true },
  usedBuyNowPayLater: { type: Boolean, required: true },
  currentlyInvested: { type: Boolean, required: true },
  portfolioSize: { type: String, required: true },
  investmentOptions: { type: [String], required: true },
  investmentDuration: { type: String, required: true },
  riskTolerance: { type: String, required: true },
});

module.exports = mongoose.model('Profile', ProfileSchema);
