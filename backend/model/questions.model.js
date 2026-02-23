const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  questionText: { type: String, required: true },
  options: [
    {
      option: String,
      explanation: String,
    },
  ], // e.g. ["A", "B", "C", "D"]
  correctOption: { type: String, required: true }, // "A" বা "B" etc.
});

module.exports = mongoose.model("Question", questionSchema);
