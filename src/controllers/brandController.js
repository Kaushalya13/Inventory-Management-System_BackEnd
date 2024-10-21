// controllers/brandController.js
const Brand = require('../models/brandModel');

// Create a new brand (optional, if you haven't implemented it yet)
exports.createBrand = async (req, res) => {
  const { name, code } = req.body;

  try {
    // Check for missing fields
    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    // Create the new brand
    const brand = new Brand({ name, code, isActive: true });
    const savedBrand = await brand.save();

    res.status(201).json(savedBrand); // Respond with the created brand
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Enable a brand
exports.enableBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    brand.isActive = true; // Set isActive to true
    await brand.save();

    res.status(200).json({ message: 'Brand enabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Disable a brand
exports.disableBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    brand.isActive = false; // Set isActive to false
    await brand.save();

    res.status(200).json({ message: 'Brand disabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
