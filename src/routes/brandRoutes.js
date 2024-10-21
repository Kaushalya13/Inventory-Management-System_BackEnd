const express = require('express');
const { createBrand, getAllBrands, enableBrand, disableBrand } = require('../controllers/brandController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');


router.post('/', protect,createBrand); // Create a new brand
router.get('/',protect, getAllBrands); // Get all brands
router.put('/:id/enable',protect, enableBrand); // Enable a brand
router.put('/:id/disable',protect, disableBrand); // Disable a brand

module.exports = router;
