const Chapter = require("../model/chapter.model");
const Subject = require("../model/subjects.model");
// Create a new chapter
exports.createChapter = async (req, res) => {
  try {
    const newChapter = new Chapter(req.body);
    await newChapter.save();
    const subject = await Subject.findByIdAndUpdate(
      req.body.subject,
      { $push: { chapter: newChapter._id } },
      { new: true },
    );
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chapters for a subject
exports.getChaptersBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const chapters = await Chapter.find({ subject: subjectId });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a chapter by ID
exports.getChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a chapter
exports.deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    if (!deletedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
