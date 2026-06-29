const User = require('../models/User');

const addSkill = async (req, res) => {
  try {
    const { userId, skill } = req.body;
    if (!userId || !skill?.name) {
      return res.status(400).json({ message: "Missing required parameters." });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (!user.skills) user.skills = [];
    user.skills.push(skill);
    await user.save();
    res.status(200).json({ message: "Skill added successfully", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Internal server data error.", error: err.message });
  }
};

const deleteSkill = async (req, res) => {
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
};

module.exports = { addSkill, deleteSkill };