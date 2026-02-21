const Test = require("../model/test.model");
const Skill = require("../model/skill.model");
const Exam = require("../model/exam.model");

const createTest = async (req, res) => {
  try {
    const { examId, skillId, title, description, duration, totalMarks } =
      req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    const test = await Test.create({
      exam: examId,
      skill: skillId,
      title,
      description,
      duration,
      totalMarks,
    });

    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createTest;
