const express = require("express");
const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/course.controller");
const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getSingleCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
