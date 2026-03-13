const ClubNotice = require("../model/club/clubnotice.model");

// Create a new Club Notice
const createClubNotice = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      imageUrl,
      videoUrl,
      discription,
      clubId,
      public_id,
    } = req.body;

    // Create the notice
    const newNotice = new ClubNotice({
      title,
      subtitle,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      public_id,
      discription,
      club: clubId,
    });

    const savedNotice = await newNotice.save();

    return res.status(201).json({
      message: "Club Notice created successfully",
      data: savedNotice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all club notices
const getAllClubNotices = async (req, res) => {
  try {
    const notices = await ClubNotice.find()
      .populate("club", "name tech") // Populate club name & tech
      .sort({ createdAt: -1 });

    res.status(200).json({ data: notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Notice
const getNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notices = await ClubNotice.find({ club: id });

    if (!notices) {
      return res.status(404).json({
        message: "notices Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Notice
const getNoticeById = async (req, res) => {
  try {
    const { noticeId } = req.params;

    const notice = await ClubNotice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({
        message: "notices Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update club notice
const updateClubNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl, videoUrl, discription, clubIds } =
      req.body;

    if (!imageUrl && !videoUrl) {
      return res.status(400).json({
        message: "Either imageUrl or videoUrl must be provided",
      });
    }

    const updatedNotice = await ClubNotice.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        discription,
        club: clubIds || [],
      },
      { new: true },
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: "Club Notice not found" });
    }

    res
      .status(200)
      .json({ message: "Updated successfully", data: updatedNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete club notice
const deleteClubNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await ClubNotice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Club Notice not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createClubNotice,
  getAllClubNotices,
  getNotice,
  updateClubNotice,
  deleteClubNotice,
  getNoticeById,
};
