const TalentReg = require("../model/talentreg.model");

// Create Talent Registration
const createTalentReg = async (req, res) => {
  try {
    // last registration বের করা
    const lastReg = await TalentReg.findOne().sort({ createdAt: -1 });

    let regId;

    if (lastReg && lastReg.regId) {
      const lastNumber = parseInt(lastReg.regId.replace("REG", ""));
      regId = "REG" + (lastNumber + 1);
    } else {
      regId = "REG20260001";
    }

    const reg = await TalentReg.create({
      ...req.body,
      regId,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: reg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Get All Registrations
const getTalentRegs = async (req, res) => {
  try {
    const regs = await TalentReg.find().populate("talent");

    res.status(200).json({
      success: true,
      data: regs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

// Get Single Registration
const getSingleTalentRegTelId = async (req, res) => {
  try {
    const { talentId } = req.params;
    console.log(talentId);
    const reg = await TalentReg.find({ talent: talentId }).populate("talent");

    if (!reg) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registration",
      error: error.message,
    });
  }
};
// Get Single Registration REGID
const getSingleTalentRegId = async (req, res) => {
  try {
    const { regId } = req.params;
    console.log(regId);
    const reg = await TalentReg.findOne({ regId }).populate("talent");

    if (!reg) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registration",
      error: error.message,
    });
  }
};

// Update Registration
const updateTalentReg = async (req, res) => {
  try {
    const reg = await TalentReg.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Registration updated",
      data: reg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

// Delete Registration
const deleteTalentReg = async (req, res) => {
  try {
    await TalentReg.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Registration deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  createTalentReg,
  getTalentRegs,
  getSingleTalentRegTelId,
  updateTalentReg,
  deleteTalentReg,
  getSingleTalentRegId,
};
