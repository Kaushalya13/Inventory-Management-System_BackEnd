// routes/itemRoutes.js
const express = require('express');
const {
  getItem,
  getAllItems,
  getActiveItems,
  enableItem,
  disableItem,
  createItem,
} = require('../controllers/itemController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protecting all item routes with the 'protect' middleware
router.post('/', protect, createItem); // Only authenticated users can create an item
router.get('/:id', protect, getItem); // Get an item by ID
router.get('/', protect, getAllItems); // Get all items
router.get('/active', protect, getActiveItems); // Get active items
router.put('/enable/:id', protect, enableItem); // Enable an item
router.put('/disable/:id', protect, disableItem); // Disable an item

module.exports = router;