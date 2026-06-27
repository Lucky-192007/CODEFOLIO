const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ==========================================
// 1. LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }

    // Check if password matches the database hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }

    // Create a login token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login processing." });
  }
});

// ==========================================
// 2. REGISTER ROUTE
// ==========================================
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "An account with that email already exists." });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during user registration." });
  }
});

// ==========================================
// 3. FORGOT PASSWORD ROUTE
// ==========================================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No workspace profile matches that email address." });
    }

    const resetToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    res.json({ 
      message: "Password reset token generated successfully.", 
      resetLink: resetLink 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error during recovery request." });
  }
});

// ==========================================
// 4. RESET PASSWORD ROUTE
// ==========================================
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User session expired or invalid profile." });
    }

    user.password = password;
    await user.save();

    res.json({ message: "Password updated successfully. You can now log in with your new credential." });

  } catch (error) {
    res.status(400).json({ message: "The reset link is invalid or has expired." });
  }
});



module.exports = router;