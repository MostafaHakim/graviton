const {
  createAdmission,
  deleteAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
  approveAsStudent,
  getAdmissionById,
  getAdmissionByIdForPrint,
} = require("../controller/admission.controller");

const express = require("express");

const router = express.Router();

router.post("/", createAdmission);
router.get("/", getAllAdmissions);
router.get("/new/:admissionId", getAdmissionById);
router.get("/print/:admissionId", getAdmissionByIdForPrint);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteAdmission);
router.patch("/:id/approve", approveAsStudent);

module.exports = router;
