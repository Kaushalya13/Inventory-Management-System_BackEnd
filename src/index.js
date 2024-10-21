const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const brandRoutes = require('./routes/brandRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const batchRoutes = require('./routes/batchRoutes');
const { protect } = require('./middlewares/authMiddleware');


dotenv.config(); // env config

connectDB(); // database eka connect karanna gnno db.js eke function eka call karala

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed (e.g., cookies, authorization headers)
  }));
  
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/batch', batchRoutes);

// // Test route to check authentication middleware
app.get('/api/test', protect, (req, res) => {
    res.json({ userId: req.user._id, email: req.user.email });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});