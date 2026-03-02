const express = require("express");
const {
  getAllStudents,
  getStudentById,
  getStudents,
} = require("../controller/student.controller");
const router = express.Router();

router.get("/", getAllStudents);
router.get("/:classId", getStudents);
router.get("/student/:studentId", getStudentById);

module.exports = router;
