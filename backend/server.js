require('dotenv').config(); // ◄--- CRITICAL: Must be line 1 to load your variables!
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 

const app = express();

// 1. Establish Database Connection Bridge
connectDB();

// 2. Global Request Handling Middleware
app.use(cors());
app.use(express.json()); 

// 3. Application Route Mount Points
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); 

// 4. Live Server Listener Process
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛰️ Server broadcasting flawlessly on port ${PORT}`);
});