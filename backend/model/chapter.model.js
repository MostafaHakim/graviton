const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      name: String,
      description: String,
      imageUrl: String,
      publicUrl: String,
      videoUrl: String,
      pdfUrl: String,
      pageCount: { type: Number, default: 1 },
    },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  { timestamps: true },
);

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
