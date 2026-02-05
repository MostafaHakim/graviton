const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "tests" },

  question: String,

  options: [String], // MCQ
  correctAnswer: String,

  marks: Number,
});
module.exports = mongoose.model("questions", questionSchema);
