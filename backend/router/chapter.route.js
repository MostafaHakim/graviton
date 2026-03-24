const express = require("express");
const router = express.Router();
const chapterController = require("../controller/chapter.controller");

// Create a new chapter
router.post("/", chapterController.createChapter);

// Get all chapters for a subject
router.get("/subject/:subjectId", chapterController.getChaptersBySubject);

// Get a chapter by ID
router.get("/:chapterId", chapterController.getChapterById);

router.put("/update/:id", chapterController.updateChapter);

// Delete a chapter
router.delete("/:chapterId", chapterController.deleteChapter);

module.exports = router;
