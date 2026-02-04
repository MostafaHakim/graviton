const express = require("express");
const { loginUser } = require("../controller/login.controller");

const router = express.Router();

router.post("/", loginUser);

module.exports = router;
