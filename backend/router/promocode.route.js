const express = require("express");
const {
  validatePromo,
  createPromo,
  getPromos,
} = require("../controller/promocode.controller");
const router = express.Router();

router.post("/validate", validatePromo);
router.post("/create", createPromo);
router.get("/", getPromos);

module.exports = router;
