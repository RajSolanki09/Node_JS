const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam.controller");
const { authMiddleware, checkRole } = require("../middleware/user.middleware");

router.post("/", authMiddleware, checkRole(['teacher']), examController.createExam);
router.get("/", authMiddleware, examController.getExams);

module.exports = router;