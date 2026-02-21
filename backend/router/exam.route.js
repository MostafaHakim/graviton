const express = require("express");
const { getAllExam } = require("../controller/exam.controller");
const {
  submitExam,
  startExam,
} = require("../controller/exam.submit.controller");
const authUser = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllExam);

router.post("/start/:testId", authUser, startExam);
router.post("/submit/:attemptId", submitExam);
module.exports = router;
