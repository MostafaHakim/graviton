const Test = require("../model/tests.model.js");
const Question = require("../model/questions.model.js");

// --- Create Test ---
const ceateNewTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------get test by Id------------------------------

const getTestById = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------get test by Id------------------------------

const getQuestionsByTestId = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Question.find({ testId });

    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// -------------------get test by chapter------------------------------

const getTestByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const test = await Test.find({ chapter: chapterId });
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Add Single Question ---
const addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Bulk Question Upload (JSON/CSV) ---
const bulkAddQuestions = async (req, res) => {
  try {
    const { questions } = req.body; // [{questionText, options, correctOption}, ...]
    const bulk = questions.map((q) => ({ ...q, testId: req.params.testId }));
    const inserted = await Question.insertMany(bulk);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================================
// ==============Delete=========================
// ==============================================

// --- Delete Single Test ---
const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    await Question.deleteMany({ testId: id });

    const test = await Test.findOneAndDelete(id);
    res.status(201).json({
      massage: "Test Delete Successfully",
      data: test,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Delete Single Question ---
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findOneAndDelete(id);
    res.status(201).json({
      massage: "Question Delete Successfully",
      data: question,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  ceateNewTest,
  addQuestion,
  bulkAddQuestions,
  getTestByChapter,
  getTestById,
  getQuestionsByTestId,
  deleteQuestion,
  deleteTest,
};
