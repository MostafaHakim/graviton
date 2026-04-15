const express = require("express");
const {
  getAllStudents,
  getStudentById,
  getStudents,
  afterPaymentUpdate,
  updateStudentStatus,
  deleteStudent,
  updatePassword,
  updateStudent,
} = require("../controller/student.controller");

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:classId", getStudents);
router.get("/student/:studentId", getStudentById);

router.put("/:id", updateStudent);
router.put("/student/status/:id", updateStudentStatus);

router.patch("/password/:id", updatePassword);

router.post("/payment", afterPaymentUpdate);

router.delete("/:id", deleteStudent);
module.exports = router;
