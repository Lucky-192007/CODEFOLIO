const express = require("express");
const router = express.Router();

const {
  getPublicPortfolio,
  getPortfolioByDomain,
} = require("../controllers/portfolioController");

router.get("/domain/:domain", getPortfolioByDomain);
router.get("/:username", getPublicPortfolio);

module.exports = router;
