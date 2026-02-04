const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    // Personal Info
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      default: "student",
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      required: true,
      enum: ["six", "seven", "eight", "nine-ten", "11th-12th", "others"],
    },

    // Contact Info
    address: {
      type: String,
      required: true,
    },
    schoolCollege: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },

    // Courses
    courses: [
      {
        type: String,
        required: true,
      },
    ],

    // Payment
    paymentMethod: {
      type: String,
      enum: ["cash", "bkash", "nagad"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },

    totalFee: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    cashPayment: {
      type: Number,
      required: true,
    },
    duePayment: {
      type: Number,
      default: 0,
    },

    // Extra
    membershipCard: {
      type: Boolean,
      default: false,
    },

    // Photo
    photo: {
      type: String, // Cloudinary or uploaded file URL
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
  },
  { timestamps: true },
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.studentName, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" },
  );
  return token;
};

const Students =
  mongoose.models.Students || mongoose.model("Students", studentSchema);

module.exports = Students;
