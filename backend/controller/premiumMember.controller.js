const PremiumMember = require("../model/premiumMember.model");

// ✅ 1️⃣ Create Premium Member
const createPremiumMember = async (req, res) => {
  try {
    const member = await PremiumMember.create(req.body);

    res.status(201).json({
      success: true,
      message: "Premium member created successfully",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 2️⃣ Get All Premium Members
const getAllPremiumMembers = async (req, res) => {
  try {
    const members = await PremiumMember.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 3️⃣ Get Single Premium Member
const getSinglePremiumMember = async (req, res) => {
  try {
    const member = await PremiumMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Premium member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 4️⃣ Update Premium Member
const updatePremiumMember = async (req, res) => {
  try {
    const member = await PremiumMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Premium member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Premium member updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 5️⃣ Delete Premium Member
const deletePremiumMember = async (req, res) => {
  try {
    const member = await PremiumMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Premium member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Premium member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 6️⃣ Auto Check & Update Expiry Status
const checkAndUpdateExpiry = async () => {
  const now = new Date();

  await PremiumMember.updateMany(
    { "subscription.expiryDate": { $lt: now } },
    { $set: { "subscription.status": "expired" } },
  );
};

module.exports = {
  createPremiumMember,
  getAllPremiumMembers,
  getSinglePremiumMember,
  updatePremiumMember,
  deletePremiumMember,
  checkAndUpdateExpiry,
};
