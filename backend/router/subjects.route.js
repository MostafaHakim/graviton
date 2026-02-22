const express = require("express");
const router = express.Router();

const subjectsController = require("../controller/subjects.controller");

router.get("/", subjectsController.getAllSubjects);
router.post("/", subjectsController.createSubject);
router.get("/:id", subjectsController.getSubjectById);
router.delete("/:id", subjectsController.deleteSubject);

module.exports = router;
