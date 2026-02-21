const Skill = require("../model/skill.model");
const Exam = require("../model/exam.model");

exports.getSkillsByExam = async (req, res) => {
  try {
    const { name } = req.params;

    const exam = await Exam.findOne({ name });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const skills = await Skill.find({ exam: exam._id, isActive: true });

    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
