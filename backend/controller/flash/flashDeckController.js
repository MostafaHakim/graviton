const FlashDeck = require("../../model/flashcard/flashDeckSchema.model");

// Create Deck
const createDeck = async (req, res) => {
  try {
    console.log(req.body);
    const deck = await FlashDeck.create(req.body);
    res.status(201).json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Decks
const getDecks = async (req, res) => {
  try {
    const decks = await FlashDeck.find().populate({
      path: "level",
      populate: { path: "category" },
    });

    res.json(decks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Decks By Level
const getDecksByLevel = async (req, res) => {
  try {
    const decks = await FlashDeck.find({
      level: req.params.levelId,
    }).populate("level");

    res.json(decks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Deck
const getDeck = async (req, res) => {
  try {
    const deck = await FlashDeck.findById(req.params.id).populate("level");
    res.json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Deck
const updateDeck = async (req, res) => {
  try {
    const deck = await FlashDeck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Deck
const deleteDeck = async (req, res) => {
  try {
    await FlashDeck.findByIdAndDelete(req.params.id);
    res.json({ message: "Deck deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDeck,
  getDecks,
  getDecksByLevel,
  getDeck,
  updateDeck,
  deleteDeck,
};
