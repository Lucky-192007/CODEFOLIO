const express = require('express');
const router = express.Router();
const { getPublicPortfolio } = require('../controllers/portfolioController');

// Public route — no token required
router.get('/:userId', getPublicPortfolio);

module.exports = router;