const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ◄--- NEW PROFILE METRIC MAPPINGS ADDED HERE:
  fullName: { type: String, default: "New Developer" },
  title: { type: String, default: "Software Engineer" },
  experience: { type: String, default: "0+ Years" },
  location: { type: String, default: "" },
  bio: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  websiteUrl: { type: String, default: "" }
}, { timestamps: true });

// Pre-save middleware: Automate hashing passwords before database write layers
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper Method: Safely verify a plain text password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);