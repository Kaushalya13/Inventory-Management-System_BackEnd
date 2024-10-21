const Item = require('../models/itemModel');

// Create a new item
exports.createItem = async (req, res) => {
  const { name, code, price, stock, description, isActive, brand, batches, suppliers } = req.body;

  try {
    // Check for missing fields
    if (!name || !code || price === undefined || stock === undefined || !description || isActive === undefined || !brand) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the new item
    const item = new Item({
      name,
      code,
      price,
      stock,
      description,
      isActive,
      brand,
      batches,
      suppliers,
    });

    const savedItem = await item.save();

    if (savedItem === null) {
      res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json(savedItem); // Respond with the created item
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // Handle internal server error
  }
};

// Get an item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('brand')
      .populate('batches')
      .populate('suppliers');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') { // Handle invalid ObjectId format
      return res.status(400).json({ message: 'Invalid item ID format' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('brand')
      .populate('batches')
      .populate('suppliers');

    // If no items are found, return 404
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get active items
exports.getActiveItems = async (req, res) => {
  try {
    const activeItems = await Item.find({ isActive: true })
      .populate('brand')
      .populate('batches')
      .populate('suppliers');

    // If no active items are found, return 404
    if (activeItems.length === 0) {
      return res.status(404).json({ message: 'No active items found' });
    }

    res.status(200).json(activeItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Enable an item
exports.enableItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isActive = true; // Set isActive to true
    await item.save();

    res.status(200).json({ message: 'Item enabled successfully' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') { // Handle invalid ObjectId format
      return res.status(400).json({ message: 'Invalid item ID format' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Disable an item
exports.disableItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isActive = false; // Set isActive to false
    await item.save();

    res.status(200).json({ message: 'Item disabled successfully' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') { // Handle invalid ObjectId format
      return res.status(400).json({ message: 'Invalid item ID format' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
