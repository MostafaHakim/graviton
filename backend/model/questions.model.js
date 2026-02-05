const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },

  question: String,

  options: [String], // MCQ
  correctAnswer: String,

  audio: {
    public_id: String,
    secure_url: String,
  },

  marks: Number,
});
module.exports = mongoose.model("questions", questionSchema);
