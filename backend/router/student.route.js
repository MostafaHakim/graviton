const express = require("express");
const { startExam, submitExam } = require("../controller/student.controller");
const authUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/exams/:id/start", authUser, startExam); // Start Exam
router.post("/exams/:id/submit", submitExam); // Submit Exam

module.exports = router;
