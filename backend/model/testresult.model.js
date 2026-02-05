const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema(
  {
    attempt: { type: mongoose.Schema.Types.ObjectId, ref: "ExamAttempt" },
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        answer: String,
      },
    ],
    score: { type: Number, default: 0 },
    checked: { type: Boolean, default: false }, // Writing / Speaking
  },
  { timestamps: true },
);

module.exports = mongoose.model("TestResult", testResultSchema);
