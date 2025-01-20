const express = require('express');
const router = express.Router();
const { createResult, getResults } = require('../controllers/resultController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('Student'), createResult);
router.get('/', authenticateToken, authorizeRoles('Student', 'Teacher', 'Admin'), getResults);

module.exports = router;
