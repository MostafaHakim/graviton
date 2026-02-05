const Question = require("../model/questions.model");

const createQuestion = async (req, res) => {
  const q = await Question.create({
    test: req.params.testId,
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    marks: req.body.marks,
    audio: req.body.audio,
  });

  res.json(q);
};

module.exports = { createQuestion };
