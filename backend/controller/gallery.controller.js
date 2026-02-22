const Gallery = require("../model/gallery.model");

// Get all gallery
const getAllGallery = async (req, res) => {
  const { category } = req.query;

  const filter = { isPublished: true };
  if (category && category !== "all") {
    filter.category = category;
  }

  const data = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json(data);
};

// Create gallery item (admin)
const createGallery = async (req, res) => {
  const item = await Gallery.create(req.body);
  res.json(item);
};

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    await gallery.deleteOne();

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllGallery, createGallery, deleteGallery };
