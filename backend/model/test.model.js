const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  title: String, // Listening, Reading, Math
  type: {
    type: String,
    enum: ["mcq", "writing", "audio", "file"],
  },
  totalMarks: Number,
  timeLimit: Number, // minutes
  isActive: Boolean,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }], // add this
});

module.exports = mongoose.model("tests", testSchema);
