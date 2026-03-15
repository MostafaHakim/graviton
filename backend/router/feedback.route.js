const express = require("express");
const {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controller/feedback.controller");
const router = express.Router();

router.post("/", createFeedback);
router.get("/", getAllFeedback);
router.get("/:id", getSingleFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
