const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const { protect } = require('../middlewares/authMiddleware');


// Save a batch
router.post('/', protect, batchController.saveBatch);

// Get a batch by ID
router.get('/:id', protect, batchController.getBatch);

// Get all batches
router.get('/', protect, batchController.getAllBatches);

// Get active batches
router.get('/get/active', protect, batchController.getActiveBatches);

// Disable a batch
router.put('/:id/disable', protect, batchController.disableBatch);

// Enable a batch
router.put('/:id/enable', protect, batchController.enableBatch);

module.exports = router;
