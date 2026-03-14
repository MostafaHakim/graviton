const mongoose = require("mongoose");
const talentRegSchema = new mongoose.Schema(
  {
    regId: String,
    name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    tshirt_size: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: { type: String, required: true },
    public_id: { type: String, required: true },
    father_name: { type: String, required: true },
    father_profession: { type: String, required: true },
    mother_name: { type: String, required: true },
    mother_profession: { type: String, required: true },
    emergency_contact: { type: String, required: true },
    school_name: { type: String, required: true },
    class: { type: String, required: true },
    principal_info: { type: String, required: true },
    roll: { type: String, default: null },
    password: { type: String, required: true },
    result: { type: String, default: null },
    talent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talents",
    },
  },
  {
    timestamps: true,
  },
);

const TelentReg = mongoose.model("Talentreg", talentRegSchema);

module.exports = TelentReg;
