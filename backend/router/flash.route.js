const express = require("express");
const {
  getFlashcardsByLevel,
  getFlashcards,
  createFlashcard,
  getFlashcardsByDeck,
} = require("../controller/flash/flashcardController");
const {
  deleteDeck,
  updateDeck,
  getDecksByLevel,
  getDecks,
  createDeck,
} = require("../controller/flash/flashDeckController");
const {
  getLevelsByCategory,
  getLevels,
  createLevel,
} = require("../controller/flash/flashLevelController");
const {
  getCategories,
  createCategory,
} = require("../controller/flash/flashCategoryController");

const router = express.Router();

// Category
router.post("/category", createCategory);
router.get("/category", getCategories);

// Level
router.post("/level", createLevel);
router.get("/level", getLevels);
router.get("/level/:categoryId", getLevelsByCategory);

// Dake
router.post("/deck", createDeck);
router.get("/deck", getDecks);
router.get("/deck/:levelId", getDecksByLevel);
router.put("/deck/:id", updateDeck);
router.delete("/deck/:id", deleteDeck);

// Flashcards
router.post("/flashcard", createFlashcard);
router.get("/flashcard", getFlashcards);
router.get("/flashcard/:deckId", getFlashcardsByDeck);
router.get("/flashcard/level/:levelId", getFlashcardsByLevel);

module.exports = router;
