const express = require("express");
const {
  createSubject,
  getSubjectById,
  getAllSubject,
  updateSubject,
  deleteSubject,
  deleteChapter,
  deletePaper,
  deleteClass,
  addClass,
  addchapter,
  addPaper,
  addChapterContent,
  updateChapterContent,
  deleteChapterContent,
} = require("../controller/subject.controller");

const router = express.Router();

router.post("/", createSubject);

router.post(
  "/:subjectId/class/:classId/paper/:paperId/chapter/:chapterIndex/content",
  addChapterContent,
);

router.get("/", getAllSubject);

router.get("/:id", getSubjectById);

router.put("/:sid/class/:classId/paper", addPaper);

router.put("/:sid/class/:classId/paper/:paperId/chapter", addchapter);

router.put("/:sid/class", addClass);

router.put("/:id", updateSubject);

router.put(
  "/:subjectId/class/:classId/paper/:paperId/chapter/:chapterIndex/content/:contentIndex",
  updateChapterContent,
);

router.delete("/:id", deleteSubject);

router.delete("/:sid/class/:classId", deleteClass);

router.delete("/:sid/class/:classId/paper/:paperId", deletePaper);

router.delete(
  "/:sid/class/:classId/paper/:paperId/chapter/:index",
  deleteChapter,
);

router.delete(
  "/:subjectId/class/:classId/paper/:paperId/chapter/:chapterIndex/content/:contentIndex",
  deleteChapterContent,
);
module.exports = router;
