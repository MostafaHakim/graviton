const Student = require("../model/student.model");

const getAllStudents = async (req, res) => {
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

module.exports = { getAllStudents };
