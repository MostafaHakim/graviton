const express = require("express");
const {
  createTalent,
  getTalents,
  getSingleTalent,
  updateTalent,
  deleteTalent,
} = require("../controller/talenthuunt.controller");
const {
  createTalentReg,
  getTalentRegs,
  getSingleTalentReg,
  getSingleTalentRegId,
  getSingleTalentRegTelId,
} = require("../controller/talentreg.controller");
const router = express.Router();

router.post("/", createTalent);

router.post("/registration", createTalentReg);
router.get("/registration", getTalentRegs);
router.get("/registration/:talentId", getSingleTalentRegTelId);
router.get("/registration/single/:regId", getSingleTalentRegId);

router.get("/", getTalents);
router.get("/:id", getSingleTalent);
router.put("/:id", updateTalent);
router.delete("/:id", deleteTalent);

module.exports = router;
