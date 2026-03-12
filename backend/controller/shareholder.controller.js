const Shareholder = require("../model/shareholder.model");

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

module.exports = { createShareholder, getAllShare };
