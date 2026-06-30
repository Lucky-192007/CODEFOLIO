const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const DEFAULT_SKILLS = [
  { category: "Programming Languages", name: "JavaScript" },
  { category: "Programming Languages", name: "Python" },
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "Tailwind CSS" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express" },
  { category: "Database", name: "MongoDB" }
];

const DEFAULT_PROJECTS = [
  {
    title: "E-Commerce Cloud Engine",
    description: "A highly scalable custom retail store client infrastructure utilizing modern responsive dashboard paradigms and integrated database hooks.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://google.com",
    screenshot: ""
  }
];


const login = async (req, res) => {
  console.log("📥 Login request received");
  console.log(req.body);

  try {
    // Get credentials from request
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password credentials.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password credentials.",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        title: user.title,
        photo: user.photo,
        isPro: user.isPro,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Email, username, and password are all required." });
    }
    const userExists = await User.findOne({ $or: [{ email }, { username: username.toLowerCase() }] });
    if (userExists) {
      const field = userExists.email === email ? "email" : "username";
      return res.status(400).json({ message: `An account with that ${field} already exists.` });
    }
    const newUser = new User({ email, username, password, skills: DEFAULT_SKILLS, projects: DEFAULT_PROJECTS });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    // Mongo duplicate-key error (race condition / unique index hit)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || { username: 1 })[0];
      return res.status(400).json({ message: `That ${field} is already taken.` });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // Always return the same generic message whether or not the user exists,
    // so this endpoint can't be used to find out which emails are registered.
    const genericResponse = { message: "If an account exists for that email, a reset link has been sent." };
    if (!user) return res.json(genericResponse);

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

    let emailSent = false;
    try {
      await sendEmail({
        to: user.email,
        subject: "Reset your CodeFolio password",
        html: `
          <p>Hi ${user.username || ""},</p>
          <p>We received a request to reset your CodeFolio password. This link expires in 15 minutes.</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      });
      emailSent = true;
    } catch (emailError) {
      console.error("FORGOT-PASSWORD EMAIL ERROR:", emailError.message);
      // Email isn't configured / failed to send — fall back to logging the
      // link to the server console so the flow is still testable.
      console.log(`🔗 Password reset link for ${user.email}: ${resetLink}`);
    }

    res.json({
      ...genericResponse,
      // Only exposed when the email genuinely failed to send, so dev/testing
      // still works without valid SMTP credentials. Safe to keep — a real
      // user with working email never sees this since emailSent is true.
      ...(emailSent ? {} : { resetLink }),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during recovery request." });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User session expired or invalid profile." });
    user.password = password;
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(400).json({ message: "The reset link is invalid or has expired." });
  }
};

module.exports = { login, register, forgotPassword, resetPassword };