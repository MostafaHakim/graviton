const mongoose = require("mongoose");

const clubSchema = mongoose.Schema({
  name: String,
  tech: String,
  activity: String,
});

const Clubs = mongoose.model("clubs", clubSchema);

module.exports = Clubs;
