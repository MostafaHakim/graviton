const Exam = require("../model/exam.model");
const Test = require("../model/test.model");

const createExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      name: req.body.name,
      description: req.body.description,
      // createdBy: req.body,
      isActive: false,
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const publishExam = async (req, res) => {
  await Exam.findByIdAndUpdate(req.params.id, { isActive: true });
  res.json({ message: "Exam Published" });
};

const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;

    // only published exams
    const exam = await Exam.findOne({
      _id: examId,
      // isActive: true
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const tests = await Test.find({
      exam: examId,
      isActive: true,
    }).select("title type totalMarks timeLimit");

    res.json({
      exam,
      tests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createExam, publishExam, getExamById };
