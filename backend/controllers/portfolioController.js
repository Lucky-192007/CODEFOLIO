const User = require("../models/User");

const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getPublicPortfolio,
};