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

router.post("/api/user/register", createUser);

router.get("/api/user", getAllUsers);

router.post("/api/user/login", loginUser);

router.get("/api/user/profile", authUser, userProfile);

router.put("/api/user/:id", updateUser);

router.post("/api/user/logout", authUser, logoutUser);

router.delete("/api/user/:id", deleteUser);

module.exports = router;
