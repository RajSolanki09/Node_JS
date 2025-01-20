const express = require('express');
const router = express.Router();
const { createExam, updateExam, deleteExam } = require('../controllers/examController');

router.post('/', createExam);          // Create exam
router.put('/:examId', updateExam);   // Update exam
router.delete('/:examId', deleteExam); // Delete exam

module.exports = router;
