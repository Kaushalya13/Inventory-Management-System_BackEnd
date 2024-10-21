const Supplier = require('../models/supplierModel');

// Create a new supplier
exports.saveSupplier = async (req, res) => {
    const { code, name, contact,email, address } = req.body;

    try {
        // Check for missing fields
        if (!code || !name || !contact || !email || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if supplier already exists by name
        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with this name already exists' });
        }

        // Create the new supplier
        const supplier = new Supplier({ code , name, contact,email, address, isActive: true });
        const savedSupplier = await supplier.save();

        res.status(201).json(savedSupplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a supplier by ID
exports.getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get active suppliers
exports.getActiveSuppliers = async (req, res) => {
    try {
        const activeSuppliers = await Supplier.find({ isActive: true });
        res.status(200).json(activeSuppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Enable a supplier
exports.enableSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.isActive = true;
        await supplier.save();

        res.status(200).json({ message: 'Supplier enabled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Disable a supplier
exports.disableSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.isActive = false;
        await supplier.save();

        res.status(200).json({ message: 'Supplier disabled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
