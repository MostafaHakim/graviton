const express = require("express");

const {
  createUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controller/user.controller");

const {
  createExam,
  publishExam,
  getExamById,
  getAllExam,
} = require("../controller/exam.controller");

const { createTest, getTestsById } = require("../controller/test.controller");

const {
  createQuestion,
  createQuestionsBulk,
} = require("../controller/questions.controller");
const authUser = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary");

const router = express.Router();

router.post("/register", createUser);
router.post("/logout", authUser, logoutUser);
router.post("/exams", createExam);
router.post("/exams/:examId/tests", upload.single("audio"), createTest);
router.post("/tests/:testId/questions", createQuestion);
router.post("/tests/:testId/questions-bulk", createQuestionsBulk);
// ============================================

router.get("/", getAllUsers);
router.get("/exams", getAllExam);
router.get("/profile", authUser, userProfile);
router.get("/exams/:id", getExamById);
router.get("/tests/:id", getTestsById);
// ======================================

router.put("/:id", updateUser);
router.put("/exams/:id/publish", publishExam);

router.delete("/:id", deleteUser);

module.exports = router;
