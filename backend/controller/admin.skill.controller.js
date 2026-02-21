const Skill = require("../model/skill.model");
const Exam = require("../model/exam.model");

const createSkill = async (req, res) => {
  try {
    const { examId, name, slug, description } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const exists = await Skill.findOne({ exam: examId, slug });
    if (exists) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    const skill = await Skill.create({
      exam: examId,
      name,
      slug,
      description,
    });

    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createSkill;
