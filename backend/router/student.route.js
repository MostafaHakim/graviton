const express = require("express");
const { getAllStudents } = require("../controller/student.controller");
const router = express.Router();

router.get("/:classId", getAllStudents);

module.exports = router;
