const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tests",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
        required: true,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      default: 1,
    },

    type: {
      type: String,
      enum: ["mcq", "truefalse"],
      default: "mcq",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("questions", questionSchema);
