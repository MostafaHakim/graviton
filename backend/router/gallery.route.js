const express = require("express");

const {
  getAllGallery,
  createGallery,
  deleteGallery,
} = require("../controller/gallery.controller");

const router = express.Router();

router.get("/", getAllGallery);

router.post("/", createGallery);
router.delete("/:id", deleteGallery);

module.exports = router;
