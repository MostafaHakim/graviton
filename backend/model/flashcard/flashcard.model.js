const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlashDeck",
      required: true,
    },

    word: {
      type: String,
      required: true,
    },

    meaning: {
      type: String,
      required: true,
    },

    example: String,

    synonyms: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Flashcard", flashcardSchema);
