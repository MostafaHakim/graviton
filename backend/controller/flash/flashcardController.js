const Flashcard = require("../../model/flashcard/flashcard.model");

// Create Flashcard
const createFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.create(req.body);
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Flashcards
const getFlashcards = async (req, res) => {
  try {
    const cards = await Flashcard.find().populate({
      path: "level",
      populate: { path: "card" },
    });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Flashcards By Level
const getFlashcardsByLevel = async (req, res) => {
  try {
    const cards = await Flashcard.find({
      level: req.params.levelId,
    }).populate("level");

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Flashcards By Deck
const getFlashcardsByDeck = async (req, res) => {
  try {
    console.log(req.params);
    const cards = await Flashcard.find({
      deck: req.params.deckId,
    });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Flashcard
const updateFlashcard = async (req, res) => {
  try {
    const card = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Flashcard
const deleteFlashcard = async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFlashcard,
  getFlashcards,
  getFlashcardsByLevel,
  updateFlashcard,
  deleteFlashcard,
  getFlashcardsByDeck,
};
