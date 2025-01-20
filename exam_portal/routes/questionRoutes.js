const express = require('express');
const router = express.Router();
const { createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('Teacher'), createQuestion);
router.put('/:id', authenticateToken, authorizeRoles('Teacher'), updateQuestion);
router.delete('/:id', authenticateToken, authorizeRoles('Teacher'), deleteQuestion);

module.exports = router;
