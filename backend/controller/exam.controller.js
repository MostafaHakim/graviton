const Exam = require("../model/exam.model");

const createExam = async (req, res) => {
  try {
    const { name, description, examType } = req.body;

    const exam = await Exam.create({
      name,
      description,
      category: examType,
      createdBy: req.user_id,
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
    }).populate({
      path: "tests",
      populate: {
        path: "questions",
      },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // const tests = await Test.find({
    //   exam: examId,
    //   isActive: true,
    // }).select("title type totalMarks timeLimit");

    res.json({
      exam,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllExam = async (req, res) => {
  try {
    console.log("hello");
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createExam, publishExam, getExamById, getAllExam };
