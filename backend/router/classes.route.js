const express = require("express");
const router = express.Router();

const {
  getAllClasses,
  createClass,
  getClassById,
  deleteClass,
} = require("../controller/classes.controller");

// Get all classes
router.get("/", getAllClasses);

// Create a new class
router.post("/", createClass);

// Get class by ID
router.get("/:id", getClassById);

// Delete class by ID (optional, not implemented in controller yet)
router.delete("/:id", deleteClass);

module.exports = router;
