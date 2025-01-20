const express = require('express');
const router = express.Router();
const { createExam, updateExam, deleteExam } = require('../controllers/examController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('Teacher'), createExam);
router.put('/:id', authenticateToken, authorizeRoles('Teacher'), updateExam);
router.delete('/:id', authenticateToken, authorizeRoles('Teacher'), deleteExam);

module.exports = router;
