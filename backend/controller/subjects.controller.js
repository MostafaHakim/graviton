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
    console.log(req.body);
    const newSubject = new Subjets({ name, description, classId });
    console.log("subject", newSubject);
    const savedSubject = await newSubject.save();
    console.log("save subject", savedSubject);
    const cls = await Class.findById(classId);
    console.log(cls, "class");
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
exports.getSubjectByClassName = async (req, res) => {
  try {
    const { name } = req.params;

    const cls = await Class.findOne({ name }).populate("subjects");

    if (!cls) {
      return res.status(404).json({ message: "Class Not Found" });
    }

    const subjects = await Subjets.find({ classId: cls._id });

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json(subjects);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch subject",
      error: error.message,
    });
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
