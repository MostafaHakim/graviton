const Student = require("../model/student.model");
const cloudinary = require("../config/cloudinary");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students) {
      res.status(404).json({
        message: "Students Not Found",
      });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { classId } = req.params;

    const students = await Student.find({ class: classId });
    if (!students) {
      res.status(404).json({
        message: "Students Not Found",
      });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate(
      "afterPayment.receivedBy",
    );

    if (!student) {
      res.status(404).json({
        message: "Students Not Found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const afterPaymentUpdate = async (req, res) => {
  try {
    const { id, paymentAmount, paymentType, receivedBy, date } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount",
      });
    }

    if (amount > student.duePayment) {
      return res.status(400).json({
        message: "Payment exceeds due amount",
      });
    }

    const newPayment = {
      paymentAmount: amount,
      paymentType,
      receivedBy,
      date: date || new Date(),
    };

    student.afterPayment.push(newPayment);

    student.duePayment -= amount;

    await student.save();

    return res.status(200).json({
      message: "Payment Added Successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const student = await Student.findByIdAndUpdate(id, { status });
    console.log(status, id);
    if (!student) {
      res.status(404).json({
        message: "Students Not Found",
      });
    }

    res.status(200).json({
      message: "Status Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    // check current password
    const isMatch = await student.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // set new password
    student.password = newPassword;

    await student.save();

    res.status(200).json({
      message: "Password Updated Successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({
        message: "Students Not Found",
      });
    }

    // Delete image from Cloudinary
    if (student.public_id) {
      await cloudinary.uploader.destroy(student.public_id);
    }

    res.status(200).json({
      message: "Status Updated Successfully",
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  getStudents,
  afterPaymentUpdate,
  updateStudentStatus,
  deleteStudent,
  updatePassword,
};
