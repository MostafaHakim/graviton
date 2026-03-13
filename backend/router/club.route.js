const express = require("express");
const {
  createClub,
  getAllClubs,
  getSingleClub,
  addNotice,
  addContent,
  deleteClub,
} = require("../controller/club.controller");
const {
  createClubNotice,
  getNotice,
  getNoticeById,
} = require("../controller/clubnotice.controller");
const router = express.Router();

router.post("/create", createClub);
router.get("/", getAllClubs);
router.get("/:id", getSingleClub);

// ===============Notices========================================
router.get("/notice/:id", getNotice);
router.get("/notice/single/:noticeId", getNoticeById);
router.post("/notice/add", createClubNotice);
// ===============Notices========================================
router.post("/add-content", addContent);

router.delete("/:id", deleteClub);

module.exports = router;
