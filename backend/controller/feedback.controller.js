const FeedBack = require("../model/feedback.model");

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const feedback = await FeedBack.create(req.body);

    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create feedback",
      error: error.message,
    });
  }
};

// Get All Feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await FeedBack.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
      error: error.message,
    });
  }
};

// Get Single Feedback
const getSingleFeedback = async (req, res) => {
  try {
    console.log(req.params.id);
    const feedback = await FeedBack.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
      error: error.message,
    });
  }
};

// Update Feedback
const updateFeedback = async (req, res) => {
  try {
    const feedback = await FeedBack.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update feedback",
      error: error.message,
    });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await FeedBack.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
