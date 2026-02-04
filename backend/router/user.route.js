const express = require("express");
const {
  createUser,
  getAllUsers,
  loginUser,
  userProfile,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controller/user.controller");

const authUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);

router.get("/", getAllUsers);

// router.post("/login", loginUser);

router.get("/profile", authUser, userProfile);

router.put("/:id", updateUser);

router.post("/logout", authUser, logoutUser);

router.delete("/:id", deleteUser);

module.exports = router;
