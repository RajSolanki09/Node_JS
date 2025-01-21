const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");
const { authMiddleware, checkRole } = require("../middleware/user.middleware");

router.post("/", authMiddleware, checkRole(['teacher']), resultController.addResult);
router.get("/", authMiddleware, resultController.getResults);

module.exports = router;