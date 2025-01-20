const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/student/:studentId', resultController.getResultsByStudent);

router.post('/submit', resultController.submitResult);

router.get('/:id', resultController.getResultById);

module.exports = router;
