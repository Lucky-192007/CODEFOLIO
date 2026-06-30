const User = require("../models/User");

const publicUserSelect = "-password -email -__v";

const getPublicPortfolio = async (req, res) => {
  try {
    const username = String(req.params.username || "").toLowerCase().trim();

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    const user = await User.findOneAndUpdate(
      { username },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    ).select(publicUserSelect);

    if (!user) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("GET PUBLIC PORTFOLIO ERROR:", error);
    res.status(500).json({ message: "Server error fetching public portfolio." });
  }
};

const getPortfolioByDomain = async (req, res) => {
  try {
    const domain = String(req.params.domain || "")
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

    if (!domain) {
      return res.status(400).json({ message: "Domain is required." });
    }

    const user = await User.findOneAndUpdate(
      { customDomain: domain },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    ).select(publicUserSelect);

    if (!user) {
      return res.status(404).json({
        message: "No portfolio is mapped to this domain.",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("GET PORTFOLIO BY DOMAIN ERROR:", error);
    res.status(500).json({ message: "Server error fetching portfolio by domain." });
  }
};

module.exports = {
  getPublicPortfolio,
  getPortfolioByDomain,
};
