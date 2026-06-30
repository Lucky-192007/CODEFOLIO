const mongoose = require("mongoose");
const User = require("../models/User");

const pickDefined = (source, keys) => {
  const result = {};

  keys.forEach((key) => {
    if (source[key] !== undefined) {
      result[key] = source[key];
    }
  });

  return result;
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id." });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User profile record not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error fetching profile dataset." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      userId,
      customDomain,
      templateId,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id." });
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "Workspace user record not found." });
    }

    const updates = pickDefined(req.body, [
      "fullName",
      "title",
      "experience",
      "location",
      "bio",
      "github",
      "linkedin",
      "website",
      "email",
      "photo",
      "resume",
    ]);

    if (templateId !== undefined) {
      const allowedTemplates = ["minimal", "cyberpunk", "corporate"];

      if (!allowedTemplates.includes(templateId)) {
        return res.status(400).json({ message: "Invalid template selected." });
      }

      updates.templateId = templateId;
    }

    const unset = {};

    if (customDomain !== undefined) {
      const cleanDomain = String(customDomain || "")
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");

      if (!cleanDomain) {
        unset.customDomain = "";
      } else {
        if (!existingUser.isPro) {
          return res.status(403).json({
            message: "Custom domains are a Pro feature. Upgrade to map your own domain.",
          });
        }

        const domainPattern = /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/;

        if (!domainPattern.test(cleanDomain)) {
          return res.status(400).json({
            message: "Enter a valid domain like example.com without https:// or www.",
          });
        }

        const taken = await User.findOne({
          customDomain: cleanDomain,
          _id: { $ne: userId },
        });

        if (taken) {
          return res.status(400).json({
            message: "That domain is already mapped to another portfolio.",
          });
        }

        updates.customDomain = cleanDomain;
      }
    }

    const updateQuery = { $set: updates };

    if (Object.keys(unset).length > 0) {
      updateQuery.$unset = unset;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Portfolio data synced successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "That email, username, or custom domain is already in use.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)[0]?.message || "Invalid profile data.",
      });
    }

    res.status(500).json({
      message: error.message || "Server error updating profile metrics.",
    });
  }
};

module.exports = { getProfile, updateProfile };
