const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: String,
    about: String,
    fee: Number,
    totalClass: String,
    classDuration: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
