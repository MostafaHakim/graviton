const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: String, // IELTS, SAT, Olympiad
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    isActive: Boolean,
  },
  { timestamps: true },
);

examSchema.virtual("tests", {
  ref: "tests",
  localField: "_id",
  foreignField: "exam",
});
examSchema.set("toObject", { virtuals: true });
examSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("exams", examSchema);
