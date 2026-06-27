require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Initialize DB Engine Connection
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Parses json body payloads automatically

// Route Wireframes
app.use('/api/auth', require('./routes/auth'));

// Test Route context verification
app.get('/', (req, res) => res.send('API Pipeline Processing...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🛰️  Server broadcasting on port ${PORT}`));