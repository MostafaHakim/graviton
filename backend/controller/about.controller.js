const About = require("../model/about.model");

// CREATE About
const createAbout = async (req, res) => {
  try {
    const { name, valus } = req.body;

    const about = await About.create({
      name,
      valus,
    });

    res.status(201).json({
      success: true,
      message: "About created successfully",
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All About
const getAbout = async (req, res) => {
  console.log("Helo Aboute");
  try {
    const about = await About.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE About
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE About
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    await About.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "About deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
};
