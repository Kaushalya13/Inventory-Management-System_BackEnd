const express = require('express');
const {
    saveCustomer,
    getCustomer,
    getAllCustomers,
    getActiveCustomers,
    enableCustomer,
    disableCustomer,
} = require('../controllers/customerController');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// Create a new customer
router.post('/', protect, saveCustomer);  // protect middleware eka call karala thiyenne

// Get a customer by ID
router.get('/:id', protect, getCustomer);

// Get all customers
router.get('/', protect, getAllCustomers);

// Get active customers
router.get('/get/active', protect, getActiveCustomers);

// Enable a customer
router.put('/:id/enable', protect, enableCustomer);

// Disable a customer
router.put('/:id/disable', protect, disableCustomer);

module.exports = router;