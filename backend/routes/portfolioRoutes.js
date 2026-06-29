const express = require('express');
const router = express.Router();
const { getPublicPortfolio } = require('../controllers/portfolioController');

// Public — no token required
router.get('/:userId', getPublicPortfolio);

module.exports = router;