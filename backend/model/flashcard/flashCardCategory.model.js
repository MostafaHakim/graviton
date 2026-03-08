const mongoose = require("mongoose");

const flashCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: String,
});

module.exports = mongoose.model("FlashCategory", flashCategorySchema);
