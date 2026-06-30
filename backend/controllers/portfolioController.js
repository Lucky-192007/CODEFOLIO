const User = require('../models/User');

// Public route — no auth required
// Returns only safe public-facing fields, never exposes email or password
const getPublicPortfolio = async (req, res) => {
  try {
    // Phase 6.3 — Portfolio Analytics
    // Atomically increment the view count and stamp the last-viewed time.
    // This only ever runs for the public route, so it never double-counts
    // when the owner is editing/previewing their own portfolio in the dashboard.
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    ).select('-password -email -__v');

    if (!user) return res.status(404).json({ message: "Portfolio not found." });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching public portfolio." });
  }
};

module.exports = { getPublicPortfolio };