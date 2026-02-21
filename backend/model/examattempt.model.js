const mongoose = require("mongoose");

const examAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tests",
      required: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },

    score: {
      type: Number,
      default: 0,
    },

    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "questions",
        },
        correctAnswer: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("exam_attempts", examAttemptSchema);
