const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    valus: [
      {
        title: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const About = mongoose.model("About", aboutSchema);

module.exports = About;
