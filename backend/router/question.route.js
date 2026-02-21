const express = require("express");
const {
  addQuestion,
  getQuestionsByTest,
} = require("../controller/admin.question.controller");

const router = express.Router();

router.post("/", addQuestion);
router.get("/:testId", getQuestionsByTest);
module.exports = router;
