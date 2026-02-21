const express = require("express");
const { getSkillsByExam } = require("../controller/skill.controller");
const createSkill = require("../controller/admin.skill.controller");

const router = express.Router();

router.get("/:name", getSkillsByExam);
router.get("/:examSlug", getSkillsByExam);

router.post("/create", createSkill);

module.exports = router;
