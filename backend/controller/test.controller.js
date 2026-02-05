const Test = require("../model/test.model");

const createTest = async (req, res) => {
  console.log("hello");
  try {
    console.log("body", req.body);
    console.log("file", req.file);
    const { examId } = req.params;
    const { title, type, totalMarks, timeLimit } = req.body;

    let audio = {};
    if (req.file) {
      audio = {
        public_id: req.file.filename,
        secure_url: req.file.path,
      };
    }

    const test = await Test.create({
      exam: examId,
      title,
      type,
      totalMarks,
      timeLimit,
      audio,
      isActive: true,
    });

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getTestsById = async (req, res) => {
  try {
    const id = req.params.id;

    const test = await Test.findOne({ _id: id }).populate({
      path: "questions",
    });

    if (!test) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTest, getTestsById };
