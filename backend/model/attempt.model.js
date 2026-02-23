const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedOption: {
          type: String, // A B C D
        },
        isCorrect: Boolean,
      },
    ],
    obtainedMarks: {
      type: Number,
      default: 0,
    },
    totalMarks: Number,
  },
  { timestamps: true },
);

const Attempt = mongoose.model("Attempts", attemptSchema);
module.exports = Attempt;
