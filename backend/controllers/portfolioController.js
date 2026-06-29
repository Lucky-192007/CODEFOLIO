const User = require("../models/User");

const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    console.log("Username:", username);

    const user = await User.findOne({ username }).select("-password");

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error(err);   // <-- IMPORTANT

    res.status(500).json({
      message: "Server error fetching public portfolio.",
      error: err.message,
    });
  }
};

module.exports = { getPublicPortfolio };