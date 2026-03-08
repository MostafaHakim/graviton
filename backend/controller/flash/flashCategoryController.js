const FlashCategory = require("../../model/flashcard/flashCardCategory.model");

// Create Category
const createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const category = await FlashCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await FlashCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Category
const getCategory = async (req, res) => {
  try {
    const category = await FlashCategory.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const category = await FlashCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    await FlashCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
