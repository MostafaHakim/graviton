const mongoose = require("mongoose");

/* ===== Chapter Schema ===== */
const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: [
    {
      titel: String,
      subtitle: String,
      image: String,
      public_id: String,
      details: String,
      pdf: String,
    },
  ],
});

/* ===== Paper Schema ===== */
const paperSchema = new mongoose.Schema({
  paperId: {
    type: String,
    required: true, // "paper-1", "grammar" etc
  },
  name: {
    type: String,
    required: true,
  },
  hasPaper: {
    type: Boolean,
    default: true,
  },
  chapters: [chapterSchema],
});

/* ===== Class Schema ===== */
const classSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true, // "class-9", "class-10"
  },
  name: {
    type: String,
    required: true,
  },
  hasPaper: {
    type: Boolean,
    default: true,
  },
  papers: [paperSchema],

  // for Science type subjects
  chapters: [chapterSchema],
});

/* ===== Subject Schema ===== */
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    color: String,
    icon: String, // "BookOpen", "Globe" etc (React will map this)

    classes: [classSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subject", subjectSchema);
