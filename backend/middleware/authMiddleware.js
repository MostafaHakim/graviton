const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Student = require("../model/student.model");
const BlackListToken = require("../model/blackListTokenModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted)
      return res.status(401).json({ message: "Token expired" });

    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.error("JWT verify error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    let user = await User.findById(decoded.id).select("-password");
    if (!user) user = await Student.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authUser;
