const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { isAuthorized, isAuthenticated } = require('../controllers/userController.js ');

router.post('/create', isAuthenticated, isAuthorized(['admin', 'teacher']), questionController.createQuestion);

router.put('/update/:id', isAuthenticated, isAuthorized(['admin', 'teacher']), questionController.updateQuestion);

router.delete('/delete/:id', isAuthenticated, isAuthorized(['admin', 'teacher']), questionController.deleteQuestion);

router.get('/exam/:examId', questionController.getQuestionsByExam);

router.get('/:id', questionController.getQuestionById);

module.exports = router;
