const {
  createAdmission,
  deleteAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
} = require("../controller/admission.controller");

const express = require("express");

const router = express.Router();

router.post("/", createAdmission);
router.get("/", getAllAdmissions);
router.get("/:id", getSingleAdmission);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteAdmission);

module.exports = router;
