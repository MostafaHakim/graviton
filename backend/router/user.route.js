const express = require("express");

const {
  createUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controller/user.controller");
const authUser = require("../middleware/authMiddleware");
const {
  createExam,
  publishExam,
  getExamById,
} = require("../controller/exam.controller");
const { createTest } = require("../controller/test.controller");
const { createQuestion } = require("../controller/questions.controller");
const router = express.Router();

router.post("/register", createUser);
router.post("/logout", authUser, logoutUser);
// ============Exam Create ==================
router.post("/exams", createExam);
router.post("/exams/:examId/tests", createTest);
router.post("/tests/:testId/questions", createQuestion);
// ============================================
router.get("/", getAllUsers);
router.get("/profile", authUser, userProfile);

// ===========Exams================
router.get("/exams/:id", getExamById);
// ======================================

router.put("/:id", updateUser);

// ============Exam Create ==================
router.put("/exams/:id/publish", publishExam);

router.delete("/:id", deleteUser);

module.exports = router;
