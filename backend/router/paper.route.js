const express = require("express");
const {
  createPaper,
  getPaperById,
  getAllPaper,
  getPaperByChapterId,
} = require("../controller/paper.controller");
const router = express.Router();

// routes/paperRoutes.js
router.post("/", createPaper);
router.get("/", getAllPaper);
router.get("/:id", getPaperById);
router.get("/chapter/:chapterId", getPaperByChapterId);

module.exports = router;
