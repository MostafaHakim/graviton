const mongoose = require("mongoose");

const flashCardLevelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlashCategory",
  },
});

module.exports = mongoose.model("FlashCardLevel", flashCardLevelSchema);
