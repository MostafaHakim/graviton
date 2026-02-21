const express = require("express");
const {
  getTestsByExamAndSkill,
  getTestById,
} = require("../controller/test.controller");

const createTest = require("../controller/admin.test.controller");

const router = express.Router();

router.get("/", getTestsByExamAndSkill);
router.get("/:testId", getTestById);

// post by admin==============================

router.post("/create", createTest);
module.exports = router;
