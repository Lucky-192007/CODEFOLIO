const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Predefined System Seed Arrays
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

// =========================================================================
// 1. SYSTEM INITIALIZATION & PROFILE RETRIEVAL
// =========================================================================
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User profile record not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching profile dataset." });
  }
});

// =========================================================================
// 2. AUTHENTICATION CORE LAYER (LOGIN / REGISTER)
// =========================================================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error during login processing." });
  }
});

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "An account with that email already exists." });
    }

    const newUser = new User({ 
      email, 
      username, 
      password,
      skills: DEFAULT_SKILLS, 
      projects: DEFAULT_PROJECTS
    });
    
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error during user registration." });
  }
});

// =========================================================================
// 3. ACCOUNT SECURITY LAYER (RECOVERY / RESET)
// =========================================================================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No workspace profile matches that email address." });
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ message: "Password reset token generated.", resetLink: `http://localhost:5173/reset-password/${resetToken}` });
  } catch (error) {
    res.status(500).json({ message: "Server error during recovery request." });
  }
});

router.post('/reset-password/:token', async (req, res) => {
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
});

// =========================================================================
// 4. METRICS & BASE PROFILE FIELDS MANAGEMENT
// =========================================================================
router.put('/update-profile', async (req, res) => {
  const {userId,fullName,title,experience,location,bio,github,linkedin,website,email,photo} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName,title,experience,location,bio,github,linkedin,website,email,photo},
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) return res.status(404).json({ message: "Workspace user records not found." });
    res.json({ message: "Data layers securely synced!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error updating profile metrics." });
  }
});

// =========================================================================
// 5. SUBDOCUMENT MATRIX LAYER: SKILLS MANAGEMENT
// =========================================================================
router.post('/add-skill', async (req, res) => {
  try {
    const { userId, skill } = req.body;
    if (!userId || !skill?.name) return res.status(400).json({ message: "Missing required parameters." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (!user.skills) user.skills = [];
    user.skills.push(skill);
    await user.save();
    res.status(200).json({ message: "Skill added successfully", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Internal server data error.", error: err.message });
  }
});

router.delete('/delete-skill', async (req, res) => {
  try {
    const { userId, skillIdentifier } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (typeof skillIdentifier === 'string' && skillIdentifier.length === 24) {
      user.skills = user.skills.filter(s => s._id.toString() !== skillIdentifier);
    } else {
      user.skills.splice(Number(skillIdentifier), 1);
    }
    await user.save();
    res.status(200).json({ message: "Skill removed cleanly", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
});

// =========================================================================
// 6. SUBDOCUMENT MATRIX LAYER: PROJECTS SHOWCASE MANAGEMENT
// =========================================================================
router.post('/add-project', async (req, res) => {
  try {
    const { userId, project } = req.body;
    if (!userId || !project?.title) return res.status(400).json({ message: "Missing required project attributes." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (!user.projects) user.projects = [];
    
    user.projects.push(project);
    await user.save();
    res.status(200).json({ message: "Project created", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
});

router.delete('/delete-project', async (req, res) => {
  try {
    const { userId, projectIdentifier } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (typeof projectIdentifier === 'string' && projectIdentifier.length === 24) {
      user.projects = user.projects.filter(p => p._id.toString() !== projectIdentifier);
    } else {
      user.projects.splice(Number(projectIdentifier), 1);
    }
    await user.save();
    res.status(200).json({ message: "Project removed", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
});

// =========================================================================
// MUTATE AN EXISTING PORTFOLIO ENTRY
// =========================================================================
router.put('/update-project', async (req, res) => {
  try {
    const { userId, projectIdentifier, project } = req.body;
    if (!userId || !projectIdentifier) return res.status(400).json({ message: "Missing matching transaction arguments." });
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile context not found." });

    // Determine targeting criteria strategy
    let targetIndex = -1;
    if (typeof projectIdentifier === 'string' && projectIdentifier.length === 24) {
      targetIndex = user.projects.findIndex(p => p._id.toString() === projectIdentifier);
    } else {
      targetIndex = Number(projectIdentifier);
    }

    if (targetIndex === -1 || !user.projects[targetIndex]) {
      return res.status(404).json({ message: "Target project not found in matrix stack." });
    }

    // Safely assign updated attributes to subdocument layer directly
    user.projects[targetIndex].title = project.title || user.projects[targetIndex].title;
    user.projects[targetIndex].description = project.description !== undefined ? project.description : user.projects[targetIndex].description;
    user.projects[targetIndex].techStack = project.techStack || user.projects[targetIndex].techStack;
    user.projects[targetIndex].github = project.github !== undefined ? project.github : user.projects[targetIndex].github;
    user.projects[targetIndex].live = project.live !== undefined ? project.live : user.projects[targetIndex].live;
    user.projects[targetIndex].screenshot = project.screenshot !== undefined ? project.screenshot : user.projects[targetIndex].screenshot;

    await user.save();
    res.status(200).json({ message: "Project record modified safely", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal update layer malfunction.", error: err.message });
  }
});

module.exports = router;