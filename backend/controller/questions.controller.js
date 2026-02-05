const Question = require("../model/questions.model");
const Test = require("../model/test.model");

const createQuestion = async (req, res) => {
  const q = await Question.create({
    test: req.params.testId,
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    marks: req.body.marks,
  });

  // also add to test
  const test = await Test.findById(req.params.testId);
  test.questions.push(q._id);
  await test.save();

  res.json(q);
};

const createQuestionsBulk = async (req, res) => {
  try {
    const { testId } = req.params;
    const { questions } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    if (test.questions.length + questions.length > 10) {
      return res.status(400).json({
        message: `Cannot add ${questions.length} questions. A test can have a maximum of 10 questions.`,
      });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        ...q,
        test: testId,
      })),
    );

    test.questions.push(...createdQuestions.map((q) => q._id));
    await test.save();

    res.json(createdQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createQuestion, createQuestionsBulk };
