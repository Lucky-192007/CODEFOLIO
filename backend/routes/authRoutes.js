const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to sign JSON Web Tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new developer user node
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    let usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ message: 'Username is taken' });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during allocation context' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate identity & output session token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server processing defect' });
  }
});

module.exports = router;