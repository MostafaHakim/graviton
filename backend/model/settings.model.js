const mongoose = require("mongoose");

const settingSchema = mongoose.Schema(
  {
    name: String,
    mobile: String,
    email: String,
    address: String,
    facebook: String,
    youtube: String,
    instagram: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Settings", settingSchema);
