const Question = require("../model/questions.model");
const Test = require("../model/test.model");

const addQuestion = async (req, res) => {
  try {
    const { testId, questionText, options, correctAnswer, marks, type } =
      req.body;

    if (!testId || !questionText || !correctAnswer) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const question = await Question.create({
      test: testId,
      questionText,
      options,
      correctAnswer,
      marks,
      type,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuestionsByTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await Question.find({ test: testId }).select(
      "-correctAnswer",
    );

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addQuestion, getQuestionsByTest };
