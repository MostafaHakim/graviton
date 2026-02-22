const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    chapter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subject", subjectSchema);
