const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  title: String,
  guidline: String,
  duration: Number,
  totalMarks: Number,
  isSkill: {
    type: Boolean,
    default: false,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const Paper = mongoose.model("Papers", paperSchema);
module.exports = Paper;
