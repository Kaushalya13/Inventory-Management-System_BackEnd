const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  totalAmount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }], // Many-to-many with items via OrderItem
});

module.exports = mongoose.model('Order', orderSchema);
