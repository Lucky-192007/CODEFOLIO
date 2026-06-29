const express = require('express');
const router = express.Router();
const { addProject, updateProject, deleteProject } = require('../controllers/projectController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, addProject);
router.put('/update', verifyToken, updateProject);
router.delete('/delete', verifyToken, deleteProject);

module.exports = router;