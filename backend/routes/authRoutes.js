const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { login, register, forgotPassword, resetPassword } = require('../controllers/authController');
const { getProfile, updateProfile }                      = require('../controllers/profileController');
const { addProject, updateProject, deleteProject }       = require('../controllers/projectController');
const { addSkill, deleteSkill }                          = require('../controllers/skillController');

// ── Auth (public) ──────────────────────────────────────────────────────────
router.post('/login',                  login);
router.post('/register',               register);
router.post('/forgot-password',        forgotPassword);
router.post('/reset-password/:token',  resetPassword);

// ── Profile (protected) ────────────────────────────────────────────────────
router.get( '/profile/:userId',  protect, getProfile);
router.put( '/update-profile',   protect, updateProfile);

// ── Projects (protected) ───────────────────────────────────────────────────
router.post(  '/add-project',     protect, addProject);
router.put(   '/update-project',  protect, updateProject);
router.delete('/delete-project',  protect, deleteProject);

// ── Skills (protected) ─────────────────────────────────────────────────────
router.post(  '/add-skill',    protect, addSkill);
router.delete('/delete-skill', protect, deleteSkill);

module.exports = router;