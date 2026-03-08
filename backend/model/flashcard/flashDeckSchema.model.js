const mongoose = require("mongoose");

const flashDeckSchema = new mongoose.Schema({
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlashCardLevel",
  },
  deckNumber: Number,
  title: String,
});

module.exports = mongoose.model("FlashDeck", flashDeckSchema);
