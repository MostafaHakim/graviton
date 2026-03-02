const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isSkill: {
    type: Boolean,
    default: false,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
