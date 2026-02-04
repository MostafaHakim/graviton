const {
  createAdmission,
  deleteAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
  approveAsStudent,
} = require("../controller/admission.controller");

const express = require("express");

const router = express.Router();

router.post("/", createAdmission);
router.get("/", getAllAdmissions);
router.get("/:id", getSingleAdmission);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteAdmission);
router.patch("/:id/approve", approveAsStudent);

module.exports = router;
