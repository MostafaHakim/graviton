const express = require("express");

const {
  updateSettings,
  getSettings,
} = require("../controller/settings.controlles");

const router = express.Router();

// routes/paperRoutes.js
router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;
