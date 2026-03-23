const Shareholder = require("../model/shareholder.model");
const cloudinary = require("../config/cloudinary");
// ============Create ===============

const createShareholder = async (req, res) => {
  try {
    const share = new Shareholder(req.body);

    await share.save();

    res.status(201).json({
      message: "Shareholder Added Successfully",
      data: share,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// ============Get All ===============

const getAllShare = async (req, res) => {
  try {
    const share = await Shareholder.find();
    res.status(200).json({ data: share });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
// ============Update All ===============

const updateShareholder = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;

    const share = await Shareholder.findById(id);

    if (!share) {
      return res.status(404).json({
        message: "Shareholder Not Found",
      });
    }

    await cloudinary.uploader.destroy(share.publicUrl);

    Object.assign(share, formData);

    await share.save();

    res.status(200).json({
      message: "Update Successfully",
      data: share,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
// ============Get All ===============

const deleteShareholder = async (req, res) => {
  try {
    const share = await Shareholder.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(share.publicUrl);
    res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

module.exports = {
  createShareholder,
  getAllShare,
  deleteShareholder,
  updateShareholder,
};
