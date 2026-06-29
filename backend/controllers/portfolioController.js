const User = require('../models/User');

// Public portfolio — no auth required, returns only safe public fields
const getPublicPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      '-password -email -__v'
    );
    if (!user) {
      return res.status(404).json({ message: "Portfolio not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching public portfolio." });
  }
};

module.exports = { getPublicPortfolio };