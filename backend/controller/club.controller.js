const Clubs = require("../model/club/club.model");

// Create Club
const createClub = async (req, res) => {
  try {
    const club = await Clubs.create(req.body);

    res.status(201).json({
      success: true,
      message: "Club Created Successfully",
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Clubs.find();

    res.status(200).json({
      success: true,
      data: clubs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Club
const getSingleClub = async (req, res) => {
  try {
    const club = await Clubs.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        message: "Club Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Notice to Club
const addNotice = async (req, res) => {
  try {
    const { clubId, noticeId } = req.body;

    const club = await Clubs.findByIdAndUpdate(
      clubId,
      { $push: { notice: noticeId } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Notice Added",
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Content to Club
const addContent = async (req, res) => {
  try {
    const { clubId, contentId } = req.body;

    const club = await Clubs.findByIdAndUpdate(
      clubId,
      { $push: { content: contentId } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Content Added",
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Club
const deleteClub = async (req, res) => {
  try {
    await Clubs.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Club Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getSingleClub,
  addNotice,
  addContent,
  deleteClub,
};
