const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Customer', customerSchema);