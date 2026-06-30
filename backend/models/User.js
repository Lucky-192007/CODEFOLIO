
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SkillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Programming Languages", "Frontend", "Backend", "Database", "DevOps"],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  techStack: [{ type: String, trim: true }],
  github: { type: String, default: "", trim: true },
  live: { type: String, default: "", trim: true },
  screenshot: { type: String, default: "" },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "Username can only contain lowercase letters, numbers, and hyphens.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    fullName: { type: String, default: "" },
    title: { type: String, default: "" },
    experience: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    website: { type: String, default: "" },
    photo: { type: String, default: "" },
    resume: { type: String, default: "" },

    templateId: {
      type: String,
      default: "minimal",
      enum: ["minimal", "cyberpunk", "corporate"],
    },

    isPro: { type: Boolean, default: false },
    proActivatedAt: { type: Date, default: null },
    stripeCustomerId: { type: String, default: "" },
    stripeSubscriptionId: { type: String, default: "" },

    skills: [SkillSchema],
    projects: [ProjectSchema],

    customDomain: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    views: { type: Number, default: 0 },
    lastViewed: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);

