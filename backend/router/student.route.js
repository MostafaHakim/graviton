const express = require("express");
const {
  getAllStudents,
  getStudentById,
  getStudents,
  afterPaymentUpdate,
} = require("../controller/student.controller");
const router = express.Router();

router.get("/", getAllStudents);
router.get("/:classId", getStudents);
router.get("/student/:studentId", getStudentById);

router.post("/payment", afterPaymentUpdate);
module.exports = router;
