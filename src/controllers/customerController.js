const Customer = require('../models/customerModel');
const mongoose = require('mongoose');

// Create a new customer
exports.saveCustomer = async (req, res) => {
    const { code, name, email, contact, address } = req.body;

    try {
        // Check for missing fields
        if (!code || !name || !email || !contact || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new customer
        const customer = new Customer({ code, name, email, contact, address, isActive: true });

        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer); // Respond with the created customer
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // Duplicate email error
            return res.status(400).json({ message: 'Customer with this email already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a customer by ID
exports.getCustomer = async (req, res) => {
    const { id } = req.params;

    // Check for valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid customer ID format' });
    }

    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get active customers
exports.getActiveCustomers = async (req, res) => {
    try {
        const activeCustomers = await Customer.find({ isActive: true });
        res.status(200).json(activeCustomers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Enable a customer
exports.enableCustomer = async (req, res) => {
    const { id } = req.params;

    // Check for valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid customer ID format' });
    }

    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        customer.isActive = true; // Set isActive to true
        await customer.save();

        res.status(200).json({ message: 'Customer enabled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Disable a customer
exports.disableCustomer = async (req, res) => {
    const { id } = req.params;

    // Check for valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid customer ID format' });
    }

    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        customer.isActive = false; // Set isActive to false
        await customer.save();

        res.status(200).json({ message: 'Customer disabled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
