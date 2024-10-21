const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  code: { type: String, required: true },
  quantity: { type: Number, required: true },
  manufactureDate: { type: Date, required: true },
  expireDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }, // Many-to-one with Supplier
});

module.exports = mongoose.model('Batch', batchSchema);
