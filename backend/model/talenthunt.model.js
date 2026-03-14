const mongoose = require("mongoose");
const talenthuntSchema = mongoose.Schema(
  {
    title: String,
    bannerUrl: String,
    public_id: String,
    feilds: [
      {
        lable: String,
        value: String,
      },
    ],
    examDetails: [
      {
        className: String,
        vanue: String,
        date: Date,
        time: String,
        imageUrl: String,
        public_id: String,
      },
    ],
    contacts: [
      {
        name: String,
        dasignation: String,
        mobile: String,
      },
    ],
    rules: [
      {
        name: String,
        rule: String,
      },
    ],
  },
  { timestamps: true },
);

const Talents = mongoose.model("Talents", talenthuntSchema);

module.exports = Talents;
