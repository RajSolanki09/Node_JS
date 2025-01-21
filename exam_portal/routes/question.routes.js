const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const { authMiddleware, checkRole } = require("../middleware/user.middleware");

router.post("/", authMiddleware, checkRole(['teacher']), questionController.addQuestion);
router.get("/:examId", authMiddleware, questionController.getQuestions);
router.put("/:questionId", authMiddleware, checkRole(['teacher']), questionController.updateQuestion);
router.delete("/:questionId", authMiddleware, checkRole(['teacher']), questionController.deleteQuestion);

module.exports = router;