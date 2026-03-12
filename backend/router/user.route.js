const express = require("express");

const {
  createUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  logoutUser,
  updateUserRole,
  updateUserStatus,
  updateUserPassword,
} = require("../controller/user.controller");

const authUser = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary");

const router = express.Router();

router.post("/register", createUser);
router.post("/logout", authUser, logoutUser);

router.get("/", getAllUsers);

router.get("/profile", authUser, userProfile);

router.put("/role", updateUserRole);
router.put("/status", updateUserStatus);
router.patch("/password", authUser, updateUserPassword);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
