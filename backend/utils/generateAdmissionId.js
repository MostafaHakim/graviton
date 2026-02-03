const Admission = require("../model/admission.model");

const generateAdmissionId = async () => {
  const year = new Date().getFullYear();

  const last = await Admission.findOne({
    admissionId: { $regex: `GA-${year}` },
  }).sort({ createdAt: -1 });

  let number = "00001";

  if (last) {
    const lastNumber = last.admissionId.split("-")[2];
    number = (parseInt(lastNumber) + 1).toString().padStart(5, "0");
  }

  return `GA-${year}-${number}`;
};

module.exports = { generateAdmissionId };
