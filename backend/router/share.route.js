const express = require("express");
const {
  getAllShare,
  createShareholder,
  deleteShareholder,
  updateShareholder,
} = require("../controller/shareholder.controller");

const router = express.Router();

// routes/paperRoutes.js
router.get("/", getAllShare);
router.post("/", createShareholder);
router.delete("/:id", deleteShareholder);
router.put("/update/:id", updateShareholder);

module.exports = router;
