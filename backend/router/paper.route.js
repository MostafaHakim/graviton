const express = require("express");
const {
  createPaper,
  getPaperById,
  getAllPaper,
  getPaperByChapterId,
  getAllSkillPaper,
} = require("../controller/paper.controller");
const router = express.Router();

// routes/paperRoutes.js
router.post("/", createPaper);
router.get("/", getAllPaper);
router.get("/skills", getAllSkillPaper);
router.get("/:id", getPaperById);
router.get("/chapter/:chapterId", getPaperByChapterId);

module.exports = router;
