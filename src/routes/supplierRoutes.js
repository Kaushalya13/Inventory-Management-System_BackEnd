const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

// POST request to create a new supplier
router.post('/', protect, supplierController.saveSupplier);

// GET request to get a supplier by ID
router.get('/:id', protect, supplierController.getSupplier);

// GET request to get all suppliers
router.get('/', protect, supplierController.getAllSuppliers);

// GET request to get active suppliers
router.get('/get/active', protect, supplierController.getActiveSuppliers);

// PUT request to enable a supplier by ID
router.put('/:id/enable', protect, supplierController.enableSupplier);

// PUT request to disable a supplier by ID
router.put('/:id/disable', protect, supplierController.disableSupplier);

module.exports = router;