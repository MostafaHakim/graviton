const User = require("../model/user.model");
const BlackListToken = require("../model/blackListTokenModel");
const cloudinary = require("../config/cloudinary");

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      photo,
      public_id,
      designation,
      experience,
      qualification,
      specialization,
      achievements,
    } = req.body;

    if (!username || !email || !password || !phone || !photo) {
      return res.status(400).send("Missing required fields");
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(409).send("User already exists");
    }

    const lastUser = await User.findOne().sort({ createdAt: -1 });

    let nextNumber = 3565;

    if (lastUser) {
      const lastId = lastUser.userId;
      const numberPart = parseInt(lastId.slice(1));
      nextNumber = numberPart + 1;
    }

    const paddedNumber = String(nextNumber).padStart(4, "0");
    const userId = "T" + paddedNumber;

    const newUser = new User({
      userId,
      username,
      email,
      password,
      phone,
      photo,
      public_id,
      designation,
      experience,
      qualification,
      specialization,
      achievements,
    });

    const user = await newUser.save();
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ====================================================================================================
// =======================================All User Get=============================================
// ====================================================================================================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// ====================================================================================================
// =======================================Teacher User Get=============================================
// ====================================================================================================
const getTeacherUsers = async (req, res) => {
  try {
    console.log("hello");
    const users = await User.find({ role: "teacher" }).select("-password");
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ====================================================================================================
// =======================================Profile User=============================================
// ====================================================================================================

const userProfile = (req, res, next) => {
  res.status(201).json(req.user);
};

// ====================================================================================================
// =======================================Update User=============================================
// ====================================================================================================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// ====================================================================================================
// =======================================Update User Role=============================================
// ====================================================================================================

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).send("User not found");

    const newRole = user.role === "teacher" ? "admin" : "teacher";
    const numberPart = user.userId.substring(1);
    const prefix = newRole === "admin" ? "A" : "T";

    user.role = newRole;
    user.userId = prefix + numberPart;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// ====================================================================================================
// =======================================Update User Status=============================================
// ====================================================================================================

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const { status } = req.query;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).send("User not found");

    user.status = status;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// ====================================================================================================
// =======================================Update User Password=============================================
// ====================================================================================================

const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = req.user;

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// ====================================================================================================
// =======================================Logout============================================
// ====================================================================================================

const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    await BlackListToken.create({ token });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { logoutUser };
// ====================================================================================================
// =======================================Delete============================================
// ====================================================================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete image from Cloudinary
    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    // Delete user from DB
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// ====================================================================================================
// =======================================Exports============================================
// ====================================================================================================

module.exports = {
  createUser,
  getAllUsers,
  userProfile,
  updateUser,
  logoutUser,
  deleteUser,
  updateUserRole,
  updateUserStatus,
  updateUserPassword,
  getTeacherUsers,
};
