const mongoose = require("mongoose");

const clubNoticeSchema = mongoose.Schema(
  {
    title: String,
    subtitle: String,
    imageUrl: String,
    videoUrl: String,
    public_id: String,
    discription: String,
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clubs",
    },
  },
  {
    timestamps: true,
  },
);

const ClubNotices = mongoose.model("ClubNotice", clubNoticeSchema);

module.exports = ClubNotices;
