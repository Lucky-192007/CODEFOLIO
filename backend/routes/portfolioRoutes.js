const express = require('express');
const router = express.Router();
const { getPublicPortfolio } = require('../controllers/portfolioController');

// Public — no token required
router.get('/:username', getPublicPortfolio);

module.exports = router;