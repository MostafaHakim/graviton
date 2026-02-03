const Admission = require("../model/admission.model");
const { generateAdmissionId } = require("../utils/generateAdmissionId");

const createAdmission = async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      class: className,
      address,
      schoolCollege,
      mobileNumber,
      courses,
      paymentMethod,
      transactionId,
      totalFee,
      discount,
      cashPayment,
      membershipCard,
      photo,
      public_id,
    } = req.body;
    if (!photo) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const duePayment =
      Number(totalFee) - Number(discount || 0) - Number(cashPayment);
    const admissionId = await generateAdmissionId();
    const admission = await Admission.create({
      studentName,
      fatherName,
      motherName,
      class: className,
      address,
      schoolCollege,
      mobileNumber,
      courses,
      paymentMethod,
      transactionId,
      totalFee,
      discount,
      cashPayment,
      duePayment,
      membershipCard,
      photo,
      admissionId,
      public_id,
    });

    res.status(201).json({
      success: true,
      message: "Admission Submitted Successfully",
      data: admission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmissions = async (req, res) => {
  const data = await Admission.find().sort({ createdAt: -1 });
  res.json(data);
};

const getSingleAdmission = async (req, res) => {
  const data = await Admission.findById(req.params.id);
  res.json(data);
};

const updateStatus = async (req, res) => {
  const { status } = req.body;

  const data = await Admission.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  res.json(data);
};

const deleteAdmission = async (req, res) => {
  await Admission.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
  deleteAdmission,
};
