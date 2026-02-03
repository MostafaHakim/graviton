const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    // Personal Info
    studentName: {
      type: String,
      required: true,
      trim: true,
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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    admissionId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Admission =
  mongoose.models.Admission || mongoose.model("Admission", admissionSchema);

module.exports = Admission;
