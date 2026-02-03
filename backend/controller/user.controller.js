const User = require("../model/user.model");
const BlackListToken = require("../model/blackListTokenModel");
// ====================================================================================================
// =======================================Create User=============================================
// ====================================================================================================
const createUser = async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;

    if (!username || !email || !password || !phone || !role) {
      return res.status(400).send("Missing required fields");
    }

    const isExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isExistingUser) {
      return res.status(409).send("User already exists");
    }

    const rolePrefix = {
      admin: "A",
      teacher: "T",
      student: "S",
    };

    const lastUser = await User.findOne({ role }).sort({ createdAt: -1 });

    let nextNumber = 3565;

    if (lastUser) {
      const lastId = lastUser.userId; // e.g. A0004
      const numberPart = parseInt(lastId.slice(1));
      nextNumber = numberPart + 1;
    }

    let paddedNumber;
    if (role === "student") paddedNumber = String(nextNumber).padStart(6, "0");
    else paddedNumber = String(nextNumber).padStart(4, "0");

    const userId = rolePrefix[role] + paddedNumber;

    const newUser = new User({
      userId,
      username,
      email,
      password,
      phone,
      role,
    });

    const user = await newUser.save();
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
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
// =======================================Login User=============================================
// ====================================================================================================

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = user.generateAuthToken();

    res.status(200).json({ user, token });
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
// =======================================Logout============================================
// ====================================================================================================

const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  await BlackListToken.create({ token });
  res.status(200).json({ message: "Logout" });
};

// ====================================================================================================
// =======================================Delete============================================
// ====================================================================================================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ====================================================================================================
// =======================================Exports============================================
// ====================================================================================================

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  userProfile,
  updateUser,
  logoutUser,
  deleteUser,
};
