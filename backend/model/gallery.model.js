// models/Gallery.js
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: String, // "Annual Science Fair 2025"
    description: String, // Description
    category: {
      type: String,
      enum: ["events", "classes", "achievements", "students", "campus"],
      required: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    image: String, // Thumbnail (Cloudinary URL)
    videoUrl: String,

    public_id: String,

    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },

    date: String, // "15 March 2024"

    tags: [String],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gallery", gallerySchema);
