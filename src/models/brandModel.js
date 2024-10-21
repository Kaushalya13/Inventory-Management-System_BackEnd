const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Brand', brandSchema);
