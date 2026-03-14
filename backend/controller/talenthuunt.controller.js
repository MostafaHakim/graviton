const Talents = require("../model/talenthunt.model");

// Create Talent Hunt
const createTalent = async (req, res) => {
  try {
    const {
      title,
      bannerUrl,
      public_id,
      feilds,
      examDetails,
      contacts,
      rules,
    } = req.body;

    const talent = await Talents.create({
      title,
      bannerUrl,
      public_id,
      feilds,
      examDetails,
      contacts,
      rules,
    });

    res.status(201).json({
      success: true,
      message: "Talent Hunt Created Successfully",
      data: talent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Talent Hunts
const getTalents = async (req, res) => {
  try {
    const talents = await Talents.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: talents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get Single Talent Hunt
const getSingleTalent = async (req, res) => {
  try {
    const talent = await Talents.findById(req.params.id);

    if (!talent) {
      return res.status(404).json({
        message: "Talent Hunt Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: talent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update Talent Hunt
const updateTalent = async (req, res) => {
  try {
    const talent = await Talents.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Talent Hunt Updated",
      data: talent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete Talent Hunt
const deleteTalent = async (req, res) => {
  try {
    await Talents.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Talent Hunt Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createTalent,
  getTalents,
  getSingleTalent,
  updateTalent,
  deleteTalent,
};
