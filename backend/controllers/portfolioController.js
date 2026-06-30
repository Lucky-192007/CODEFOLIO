const User = require("../models/User");

const getPublicPortfolio = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    ).select("-password -email -__v");

    if (!user) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching public portfolio." });
  }
};

const getPortfolioByDomain = async (req, res) => {
  try {
    const domain = req.params.domain.toLowerCase().replace(/^www\./, "");

    const user = await User.findOneAndUpdate(
      { customDomain: domain },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    ).select("-password -email -__v");

    if (!user) {
      return res.status(404).json({ message: "No portfolio is mapped to this domain." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching portfolio by domain." });
  }
};

module.exports = {
  getPublicPortfolio,
  getPortfolioByDomain,
};
