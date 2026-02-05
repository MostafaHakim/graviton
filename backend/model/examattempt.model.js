const mongoose = require("mongoose");

const examAttemptSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    status: {
      type: String,
      enum: ["pending", "running", "completed"],
      default: "pending",
    },
    totalScore: { type: Number, default: 0 },
    startedAt: Date,
    submittedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("ExamAttempt", examAttemptSchema);
