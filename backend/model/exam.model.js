const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: String, // IELTS, SAT, Olympiad
    description: String,
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
    isActive: Boolean,
  },
  { timestamps: true },
);

module.exports = mongoose.model("exams", examSchema);
