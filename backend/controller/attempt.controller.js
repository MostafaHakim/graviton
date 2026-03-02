// controllers/attemptController.js

const Attempt = require("../model/attempt.model");
const Paper = require("../model/paper.model");
const Question = require("../model/questions.model");

const submitExam = async (req, res) => {
  try {
    const { paperId, studentId, answers } = req.body;

    if (!paperId || !studentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔒 Prevent Multiple Attempt
    const existingAttempt = await Attempt.findOne({
      student: studentId,
      paper: paperId,
    });

    if (existingAttempt) {
      return res.status(400).json({
        message: "You have already attempted this exam",
      });
    }

    const paper = await Paper.findById(paperId).populate("questions");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    let obtainedMarks = 0;
    const marksPerQuestion = paper.totalMarks / paper.questions.length;

    const evaluatedAnswers = [];

    for (const q of paper.questions) {
      const studentAnswer = answers.find(
        (a) => a.questionId === q._id.toString(),
      );

      let isCorrect = false;
      let selectedOption = null;

      if (studentAnswer) {
        selectedOption = studentAnswer.selectedOption;
        isCorrect = q.correctOption === selectedOption;

        if (isCorrect) {
          obtainedMarks += marksPerQuestion;
        }
      }

      evaluatedAnswers.push({
        question: q._id,
        selectedOption,
        isCorrect,
      });
    }

    const attempt = await Attempt.create({
      student: studentId,
      paper: paperId,
      answers: evaluatedAnswers,
      obtainedMarks,
      totalMarks: paper.totalMarks,
    });

    res.status(201).json({
      success: true,
      obtainedMarks,
      totalMarks: paper.totalMarks,
      percentage: ((obtainedMarks / paper.totalMarks) * 100).toFixed(2),
      attempt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      student: req.params.studentId,
    })
      .populate("paper")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttemptById = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate("paper")
      .populate("answers.question");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const checkAttemptById = async (req, res) => {
  try {
    const { paperId } = req.params;
    const { studentId } = req.query;

    const attempt = await Attempt.findOne({
      paper: paperId,
      student: studentId,
    });

    if (!attempt || attempt.length === 0) {
      return res.status(404).json({ message: "Attempt not found" });
    }
    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitExam,
  getStudentAttempts,
  getAttemptById,
  checkAttemptById,
};
