const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define sub-schema structure for Skills matrix tracking
const SkillSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    enum: ["Programming Languages", "Frontend", "Backend", "Database", "DevOps"] 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  }
});

// Define sub-schema structure for Projects cabinet showcase (Aligned with frontend)
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  techStack: [{ type: String, trim: true }],
  github: { type: String, default: "", trim: true },
  live: { type: String, default: "", trim: true },
  screenshot: { type: String, default: "" }
});

// Main User Account Schema configuration
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  
  // Core Profile Customization metrics
  fullName: { type: String, default: "" },
  title: { type: String, default: "" },
  experience: { type: String, default: "" },
  location: { type: String, default: "" },
  bio: { type: String, default: "" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  website: { type: String, default: "" },
  
  photo: { type: String, default: "" },
  skills: [SkillSchema],
  projects: [ProjectSchema]
}, {
  timestamps: true
});

// Pre-save middleware Hook: Automatically hashes passwords
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);