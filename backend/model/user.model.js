const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Photo
    photo: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher",
    },
    status: {
      type: String,
      enum: ["active", "block", "pending"],
      default: "pending",
    },
    designation: String,
    experience: String,
    qualification: String,
    specialization: [String],
    achievements: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    SECRET_KEY,
    {
      expiresIn: "24h",
    },
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
