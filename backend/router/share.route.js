const express = require("express");
const {
  getAllShare,
  createShareholder,
} = require("../controller/shareholder.controller");

const router = express.Router();

// routes/paperRoutes.js
router.get("/", getAllShare);
router.post("/", createShareholder);

module.exports = router;
