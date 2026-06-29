const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:userId', protect, getProfile);
router.put('/update', protect, updateProfile);

module.exports = router;