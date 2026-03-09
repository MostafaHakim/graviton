const Admission = require("../model/admission.model");
const Student = require("../model/student.model");
const { generateAdmissionId } = require("../utils/generateAdmissionId");

const createAdmission = async (req, res) => {
  try {
    const {
      email,
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
      discountPercent,
      duePayment,
      cashPayment,
      membershipCard,
      promoDiscount,
      appliedPromoCode,
      photo,
      public_id,
    } = req.body;

    if (!photo) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const percentDiscount =
      (Number(totalFee ? totalFee : 0) *
        Number(discountPercent ? discountPercent : 0)) /
      100;
    const totalDiscount =
      percentDiscount + Number(promoDiscount ? promoDiscount : 0);

    const admissionId = await generateAdmissionId();
    const admission = await Admission.create({
      email,
      studentName,
      fatherName,
      motherName,
      class: className,
      address,
      schoolCollege,
      mobileNumber,
      courses,
      paymentMethod: !membershipCard ? paymentMethod : "Membership Card",
      transactionId: !membershipCard ? transactionId : "Not Required",
      totalFee: !membershipCard ? totalFee : 0,
      discount: !membershipCard ? totalDiscount : 0,
      cashPayment: !membershipCard ? cashPayment : 0,
      duePayment: membershipCard ? duePayment : 0,
      membershipCard,
      photo,
      admissionId,
      promo: [
        {
          appliedPromoCode,
          promoDiscount,
        },
      ],
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
  const { admissionId } = req.params;
  console.log(admissionId);
  const data = await Admission.findOne({ admissionId });

  res.json(data);
};

const getAdmissionById = async (req, res) => {
  const { admissionId } = req.params;

  const data = await Admission.findById(admissionId);

  res.json(data);
};
const getAdmissionByIdForPrint = async (req, res) => {
  const { admissionId } = req.params;

  const data = await Admission.findOne({ admissionId });

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

const approveAsStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query; // 🔥 fix

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const findAdmission = await Admission.findById(id);

    if (!findAdmission) {
      return res
        .status(404)
        .json({ message: "Admission Application Not Found" });
    }

    // যদি rejected হয় তাহলে শুধু status update
    if (status === "rejected") {
      findAdmission.status = "rejected";
      await findAdmission.save();
      return res.json({ message: "Admission Rejected" });
    }

    // ====== APPROVED FLOW ======

    const lastUser = await Student.findOne().sort({ createdAt: -1 });

    let nextNumber = 2555;
    if (lastUser) {
      const lastId = lastUser.studentId;
      const numberPart = parseInt(lastId.slice(1));
      nextNumber = numberPart + 1;
    }

    const paddedNumber = String(nextNumber).padStart(6, "0");
    const studentId = "S" + paddedNumber;

    const newStudent = new Student({
      ...findAdmission.toObject(),
      studentId,
      password: "12345",
      status: "active",
    });

    await newStudent.save();

    findAdmission.status = "approved";
    await findAdmission.save();

    res.status(201).json({
      message: "Admission Approved",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateStatus,
  deleteAdmission,
  approveAsStudent,
  getAdmissionById,
  getAdmissionByIdForPrint,
};
