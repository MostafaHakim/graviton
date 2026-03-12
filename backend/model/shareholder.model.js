const mongoose = require("mongoose");
const shareholderSchema = mongoose.Schema({
  name: String,
  father: String,
  email: String,
  mobile: String,
  nid: String,
  imageUrl: String,
  publicUrl: String,
  about: String,
});

const Shareholder = mongoose.model("Shareholder", shareholderSchema);

module.exports = Shareholder;
