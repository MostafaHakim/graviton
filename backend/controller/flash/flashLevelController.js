const FlashCardLevel = require("../../model/flashcard/flashcardlevel.model");

// Create Level
const createLevel = async (req, res) => {
  try {
    const level = await FlashCardLevel.create(req.body);
    res.status(201).json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Levels
const getLevels = async (req, res) => {
  try {
    const levels = await FlashCardLevel.find().populate("card");
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Levels By Category
const getLevelsByCategory = async (req, res) => {
  try {
    console.log(req.params);
    const levels = await FlashCardLevel.find({
      category: req.params.categoryId,
    });

    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLevel, getLevels, getLevelsByCategory };
