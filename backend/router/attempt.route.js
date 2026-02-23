const express = require("express");
const {
  submitExam,
  getStudentAttempts,
  getAttemptById,
  checkAttemptById,
} = require("../controller/attempt.controller");

const router = express.Router();

// routes/attemptRoutes.js
router.post("/submit", submitExam);
router.get("/student/:studentId", getStudentAttempts);
router.get("/:id", getAttemptById);
router.get("/check/:paperId", checkAttemptById);

module.exports = router;
