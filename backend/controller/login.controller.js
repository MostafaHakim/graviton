const User = require("../model/user.model");
const Student = require("../model/student.model");
const BlackListToken = require("../model/blackListTokenModel");

// ====================================================================================================
// =======================================Login User=============================================
// ====================================================================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await Student.findOne({ email });
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

module.exports = {
  loginUser,
};
