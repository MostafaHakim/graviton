const express = require("express");
const {
  createPremiumMember,
  getAllPremiumMembers,
  getSinglePremiumMember,
  updatePremiumMember,
  deletePremiumMember,
} = require("../controller/premiumMember.controller");
const router = express.Router();

// ✅ Create Premium Member
router.post("/", createPremiumMember);

// ✅ Get All Premium Members
router.get("/", getAllPremiumMembers);

// ✅ Get Single Premium Member
router.get("/:id", getSinglePremiumMember);

// ✅ Update Premium Member
router.put("/:id", updatePremiumMember);

// ✅ Delete Premium Member
router.delete("/:id", deletePremiumMember);

module.exports = router;
