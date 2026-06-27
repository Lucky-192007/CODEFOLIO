const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Make sure bcrypt is imported at the top of your authRoutes.js file
const bcrypt = require('bcryptjs'); 

// 1. FORGOT PASSWORD ROUTE
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No workspace profile matches that email address." });
    }

    // Generate a temporary reset token valid for 15 minutes
    const resetToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );

    // In production, you would use a package like nodemailer to send this link via email.
    // For now, we will send it back in the response so you can test it directly!
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    res.json({ 
      message: "Password reset token generated successfully.", 
      resetLink: resetLink // Copy/paste this to test in your browser later
    });

  } catch (error) {
    res.status(500).json({ message: "Server error during recovery request." });
  }
});

// 2. RESET PASSWORD ROUTE
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User session expired or invalid profile." });
    }

    // Explicitly update password (so your Pre-Save Bcrypt hashing hook triggers cleanly)
    user.password = password;
    await user.save();

    res.json({ message: "Password updated successfully. You can now log in with your new credential." });

  } catch (error) {
    res.status(400).json({ message: "The reset link is invalid or has expired." });
  }
});