const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "BDT",
  },
  startDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  durationInDays: {
    type: Number,
    required: true,
  },
  autoRenew: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },
});

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["bkash", "nagad", "stripe", "paypal", "cash"],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

const premiumMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,

    role: {
      type: String,
      default: "premium",
    },

    subscription: subscriptionSchema,
    paymentInfo: paymentSchema,

    benefits: [
      {
        type: String,
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PremiumMember", premiumMemberSchema);
