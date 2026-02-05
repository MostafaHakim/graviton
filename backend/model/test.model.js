const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  title: String, // Listening, Reading, Math
  type: {
    type: String,
    enum: ["mcq", "writing", "audio", "file"],
  },
  totalMarks: Number,
  timeLimit: Number, // minutes
  isActive: Boolean,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }], // add this
  audio: {
    public_id: String,
    secure_url: String,
  },
});

module.exports = mongoose.model("tests", testSchema);
