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

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // পাসওয়ার্ড আলাদা এন্ডপয়েন্টে আপডেট হবে, এখানে বাদ দিন
    if (updateData.password) {
      delete updateData.password;
    }

    // Check if photo is being updated
    const isPhotoUpdating =
      updateData.photo && updateData.photo !== req.body.oldPhoto;

    if (isPhotoUpdating) {
      // Find existing student to get old photo public_id
      const existingStudent = await Student.findById(id);

      // Delete old photo from cloudinary if exists
      if (existingStudent && existingStudent.public_id) {
        try {
          await cloudinary.uploader.destroy(existingStudent.public_id);
          console.log(
            "Old photo deleted from Cloudinary:",
            existingStudent.public_id,
          );
        } catch (cloudinaryError) {
          console.error("Cloudinary delete error:", cloudinaryError);
          // Continue with update even if cloudinary delete fails
        }
      }
    }

    // Remove any undefined or null values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
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
  updateStudent,
};
