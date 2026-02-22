const Subjets = require("../model/subjects.model");
const Class = require("../model/classes.model");
// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subjets.find();
    res.status(200).json(subjects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch subjects", error: error.message });
  }
};

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { name, description, classId } = req.body;
    const newSubject = new Subjets({ name, description, classId });
    const savedSubject = await newSubject.save();
    const cls = await Class.findById(classId);
    if (cls) {
      cls.subjects.push(savedSubject._id);
      await cls.save();
    }
    res.status(201).json(savedSubject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create subject", error: error.message });
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subjets.findById(req.params.id).populate("chapter");
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch subject", error: error.message });
  }
};

// Delete subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subjets.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete subject", error: error.message });
  }
};
