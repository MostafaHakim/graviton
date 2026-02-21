const Exam = require("../model/exam.model");
const Skill = require("../model/skill.model");
const Test = require("../model/test.model");

const getTestsByExamAndSkill = async (req, res) => {
  try {
    const { examSlug, skillSlug } = req.query;

    const exam = await Exam.findOne({ name: new RegExp(`^${examSlug}$`, "i") });
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const skill = await Skill.findOne({
      exam: exam._id,
      slug: skillSlug,
    });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    const tests = await Test.find({
      exam: exam._id,
      skill: skill._id,
      isActive: true,
    });

    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTestById = async (req, res) => {
  try {
    console.log("hello");
    const { testId } = req.params;

    if (!testId) return res.status(400).json({ message: "testId required" });

    const test = await Test.findById(testId)
      .populate("exam", "name")
      .populate("skill", "name");

    if (!test) return res.status(404).json({ message: "Test not found" });

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTestsByExamAndSkill, getTestById };
