const {
  createAdmission,
  deleteAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
} = require("../controller/admission.controller");

const express = require("express");

const router = express.Router();

router.post("/api/student", createAdmission);
router.get("/api/student", getAllAdmissions);
router.get("/api/student/:id", getSingleAdmission);
router.put("/api/student/:id/status", updateStatus);
router.delete("/api/student/:id", deleteAdmission);

module.exports = router;
