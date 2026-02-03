const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const BlackListToken = require("../model/blackListTokenModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token expired" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ username: decoded.username }).select(
      "-password",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authUser;
