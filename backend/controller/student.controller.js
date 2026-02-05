const Exam = require("../model/exam.model");
const Test = require("../model/test.model");
const Question = require("../model/questions.model");
const ExamAttempt = require("../model/examattempt.model");

const startExam = async (req, res) => {
  try {
    const examId = req.params.id;

    // 1. Check if attempt exists
    let attempt = await ExamAttempt.findOne({
      student: req.user._id,
      exam: examId,
    });

    if (!attempt) {
      attempt = await ExamAttempt.create({
        student: req.user._id,
        exam: examId,
        status: "running",
        startedAt: new Date(),
      });
    } else {
      attempt.status = "running";
      attempt.startedAt = new Date();
      await attempt.save();
    }

    // 2. Fetch tests + populate questions
    const tests = await Test.find({ exam: examId, isActive: true })
      .populate({
        path: "questions",
        select: "question options marks audio correctAnswer",
      })
      .lean();

    res.json({ attemptId: attempt._id, tests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const submitExam = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;

    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    let totalScore = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.question);
      let score = 0;
      if (question.correctAnswer === ans.answer) score = question.marks;

      totalScore += score;

      await TestResult.create({
        attempt: attemptId,
        test: question.test,
        answers: [{ question: question._id, answer: ans.answer }],
        score,
        checked: question.type !== "mcq", // writing / speaking
      });
    }

    attempt.status = "completed";
    attempt.submittedAt = new Date();
    attempt.totalScore = totalScore;
    await attempt.save();

    res.json({ message: "Exam Submitted", totalScore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { startExam, submitExam };
