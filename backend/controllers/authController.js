const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password credentials." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error during login processing." });
  }
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "An account with that email already exists." });
    const newUser = new User({ email, username, password, skills: DEFAULT_SKILLS, projects: DEFAULT_PROJECTS });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error during user registration." });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No workspace profile matches that email address." });
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ message: "Password reset token generated.", resetLink: `http://localhost:5173/reset-password/${resetToken}` });
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