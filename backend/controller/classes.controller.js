const Class = require("../model/classes.model");

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

const createClass = async (req, res) => {
  const { name } = req.body;
  try {
    const newClass = new Class({ name });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const cls = await Class.findById(id).populate("subjects");

    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(cls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  getClassById,
  deleteClass,
};
