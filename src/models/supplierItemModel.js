const mongoose = require('mongoose');

const supplierItemSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
});

module.exports = mongoose.model('SupplierItem', supplierItemSchema);
