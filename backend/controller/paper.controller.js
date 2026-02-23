const Paper = require("../model/paper.model");
const Question = require("../model/questions.model");

const createPaper = async (req, res) => {
  try {
    const {
      guidline,
      chapterId,
      testId,
      title,
      duration,
      totalMarks,
      questionIds,
    } = req.body;

    // Validate question existence
    const questions = await Question.find({
      _id: { $in: questionIds },
      testId,
    });

    if (questions.length !== questionIds.length) {
      return res.status(400).json({
        message: "Some questions are invalid for this test",
      });
    }

    const paper = await Paper.create({
      chapter: chapterId,
      test: testId,
      title,
      duration,
      totalMarks,
      guidline,
      questions: questionIds,
    });

    res.status(201).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPaper = async (req, res) => {
  try {
    const paper = await Paper.find().populate("questions").populate("test");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id)
      .populate("questions")
      .populate("test");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPaperByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const paper = await Paper.find({ chapter: chapterId })
      .populate("questions")
      .populate("test");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaper,
  getPaperById,
  getAllPaper,
  getPaperByChapterId,
};
