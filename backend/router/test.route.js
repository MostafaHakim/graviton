const express = require("express");
const {
  ceateNewTest,
  addQuestion,
  bulkAddQuestions,
  getTestByChapter,
  getTestById,
  getQuestionsByTestId,
  deleteQuestion,
  deleteTest,
} = require("../controller/test.controller");
const router = express.Router();

// --- Create Test ---
router.post("/", ceateNewTest);

// ---get test by chapter--------
router.get("/:chapterId", getTestByChapter);

// ---get questions by Id--------
router.get("/questions/:testId", getQuestionsByTestId);
// ---get test by Id--------
router.get("/single/:testId", getTestById);

// --- Add Single Question ---
router.post("/questions", addQuestion);

// --- Bulk Question Upload (JSON/CSV) ---
router.post("/questions/bulk/:testId", bulkAddQuestions);

// =========================================================
// =================Delete===========================
// =========================================================

// --- test by Id--------
router.delete("/:id", deleteTest);

// --- questions by Id--------
router.delete("/questions/:id", deleteQuestion);

module.exports = router;
