require('dotenv').config(); // ◄--- CRITICAL: Must be line 1 to load your variables!
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();

// 1. Establish Database Connection Bridge
connectDB();

// 2. Global Security & Request Handling Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:5173", "http://localhost:5000"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
imgSrc: [
 "'self'",
 "data:",
 "blob:",
 "https://images.unsplash.com",
 "https://res.cloudinary.com",
 "https://via.placeholder.com"
],
      },
    },
  })
);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ◄--- Temporary request logger (remove before production)
app.use((req, res, next) => {
  if (req.path.includes('skill') || req.path.includes('project')) {
    console.log(`\n=== 📥 INCOMING REQUEST: ${req.method} ${req.path} ===`);
    console.log("BODY RECV:", JSON.stringify(req.body, null, 2));
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).send("🛰️ Backend Security Engine Online and Broadcasting!");
});

// 3. Application Route Mount Points
const authRoutes      = require('./routes/authRoutes');
const uploadRoutes    = require('./routes/uploadRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

app.use('/api/auth',      authRoutes);       // all existing frontend URLs unchanged
app.use('/api/upload',    uploadRoutes);     // image upload unchanged
app.use('/api/portfolio', portfolioRoutes);  // ← NEW public portfolio

// 4. Live Server Listener Process
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛰️ Server broadcasting flawlessly on port ${PORT}`);
});