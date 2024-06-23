const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  otplessId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  identities: Array,
  network: Object,
  deviceInfo: Object
});

const User = mongoose.model('User', userSchema);
module.exports = User;
