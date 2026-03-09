const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    discountAmount: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    expireAt: {
      type: Date,
    },

    usageLimit: {
      type: Number,
      default: 0, // 0 = unlimited
    },

    usedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Promo", promoSchema);
