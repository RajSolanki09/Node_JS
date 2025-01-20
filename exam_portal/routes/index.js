const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const examRoutes = require('./examRoutes');
const questionRoutes = require('./questionRoutes');
const resultRoutes = require('./resultRoutes');

router.use('/users', userRoutes);
router.use('/exams', examRoutes);
router.use('/questions', questionRoutes);
router.use('/results', resultRoutes);

module.exports = router;