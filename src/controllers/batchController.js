const Batch = require('../models/batchModel');

// Save a new batch
exports.saveBatch = async (req, res) => {
  const { code, quantity, manufactureDate, expireDate, supplier } = req.body;

  try {
    // Check for missing fields
    if (!code || !quantity || !manufactureDate || !expireDate || !supplier) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const batch = new Batch({
      code,
      quantity,
      manufactureDate,
      expireDate,
      isActive: true,
      supplier,
    });

    const savedBatch = await batch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a batch by ID
exports.getBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('supplier');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate('supplier');
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get active batches
exports.getActiveBatches = async (req, res) => {
  try {
    const activeBatches = await Batch.find({ isActive: true }).populate('supplier');
    res.status(200).json(activeBatches);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Disable a batch
exports.disableBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    batch.isActive = false;
    await batch.save();

    res.status(200).json({ message: 'Batch disabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Enable a batch
exports.enableBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    batch.isActive = true;
    await batch.save();

    res.status(200).json({ message: 'Batch enabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};