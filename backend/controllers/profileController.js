const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User profile record not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching profile dataset." });
  }
};

const updateProfile = async (req, res) => {
  const { userId, fullName, title, experience, location, bio, github, linkedin, website, email, photo, resume } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, title, experience, location, bio, github, linkedin, website, email, photo, resume },
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) return res.status(404).json({ message: "Workspace user records not found." });
    res.json({ message: "Data layers securely synced!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error updating profile metrics." });
  }
};

module.exports = { getProfile, updateProfile };