const express = require("express");

const {
  createUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controller/user.controller");

const authUser = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary");

const router = express.Router();

router.post("/register", createUser);
router.post("/logout", authUser, logoutUser);

router.get("/", getAllUsers);
router.get("/profile", authUser, userProfile);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
