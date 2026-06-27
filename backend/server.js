const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // or your db connection path

const app = express();

// 1. GLOBAL MIDDLEWARE (MUST BE AT THE TOP)
app.use(cors());
app.use(express.json()); // ◄--- CRITICAL: If this is below your routes, login requests fail!

// 2. ROUTE REGISTRATIONS
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // ◄--- Make sure this matches exactly

// ... rest of your server configuration ...