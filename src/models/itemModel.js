const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // One-to-many with Brand
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }], // One-to-many with Batch
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupplierItem' }], // Many-to-many with Supplier via SupplierItem
});

module.exports = mongoose.model('Item', itemSchema);
