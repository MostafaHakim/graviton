const User = require("../model/user.model");
const Student = require("../model/student.model");
const BlackListToken = require("../model/blackListTokenModel");

// ====================================================================================================
// =======================================Login User=============================================
// ====================================================================================================

const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    let user = await User.findOne({ userId });

    if (!user) {
      user = await Student.findOne({ studentId: userId });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        message: "আপনার একাউন্টটি ব্লক করা হয়েছে।",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginUser,
};
