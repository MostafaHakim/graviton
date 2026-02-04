const Subject = require("../model/subject.model");

/* =============================
   ➕ Create Subject
============================= */
const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =============================
   📥 Get All Subjects
============================= */
const getAllSubject = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============================
   📥 Get Single Subject
============================= */
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* =============================
   ✏️ Update Subject
============================= */
const updateSubject = async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Subject not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   ➕ Add Class
========================= */
const addClass = async (req, res) => {
  const { classId, name, hasPaper } = req.body;

  const subject = await Subject.findById(req.params.sid);
  subject.classes.push({ classId, name, hasPaper });
  await subject.save();
  res.json(subject);
};

/* =========================
   ➕ Add Paper
========================= */

const addPaper = async (req, res) => {
  const { paperId, name } = req.body;
  console.log("called", req.body);
  await Subject.updateOne(
    { _id: req.params.sid, "classes.classId": req.params.classId },
    {
      $push: {
        "classes.$.papers": {
          paperId,
          name,
          hasPaper: true,
          chapters: [],
        },
      },
    },
  );

  res.json({ message: "Paper added" });
};

/* =========================
   ➕ Add Chapter
========================= */
const addchapter = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  await Subject.updateOne(
    {
      _id: req.params.sid,
      "classes.classId": req.params.classId,
      "classes.papers.paperId": req.params.paperId,
    },
    {
      $push: {
        "classes.$[c].papers.$[p].chapters": { name },
      },
    },
    {
      arrayFilters: [
        { "c.classId": req.params.classId },
        { "p.paperId": req.params.paperId },
      ],
    },
  );

  res.json({ message: "Chapter added" });
};

/* =============================
   ❌ Delete Subject (Optional)
============================= */
const deleteSubject = async (req, res) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Subject not found" });
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* =========================
   ❌ Delete Class
========================= */
const deleteClass = async (req, res) => {
  await Subject.updateOne(
    { _id: req.params.sid },
    { $pull: { classes: { classId: req.params.classId } } },
  );
  res.json({ message: "Class deleted" });
};

/* =========================
   ❌ Delete Paper
========================= */

const deletePaper = async (req, res) => {
  await Subject.updateOne(
    { _id: req.params.sid, "classes.classId": req.params.classId },
    { $pull: { "classes.$.papers": { paperId: req.params.paperId } } },
  );

  res.json({ message: "Paper deleted" });
};

/* =========================
   ❌ Delete Chapter
========================= */
const deleteChapter = async (req, res) => {
  const subject = await Subject.findById(req.params.sid);

  const cls = subject.classes.find((c) => c.classId === req.params.classId);
  const paper = cls.papers.find((p) => p.paperId === req.params.paperId);

  paper.chapters.splice(req.params.index, 1);

  await subject.save();
  res.json({ message: "Chapter deleted" });
};

/* =========================
   ➕ Add Chapter Content
========================= */
const addChapterContent = async (req, res) => {
  const { subjectId, classId, paperId, chapterIndex } = req.params;
  const newContent = req.body;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const cls = subject.classes.find((c) => c.classId === classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const paper = cls.papers.find((p) => p.paperId === paperId);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    const chapter = paper.chapters[chapterIndex];
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.content.push(newContent);

    await subject.save();

    res.status(200).json(chapter); // return updated chapter
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   ✏️ Update Chapter Content
========================= */
const updateChapterContent = async (req, res) => {
  const { subjectId, classId, paperId, chapterIndex, contentIndex } =
    req.params;
  const updatedContent = req.body;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const cls = subject.classes.find((c) => c.classId === classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const paper = cls.papers.find((p) => p.paperId === paperId);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    const chapter = paper.chapters[chapterIndex];
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    if (!chapter.content[contentIndex])
      return res.status(404).json({ message: "Content not found" });

    chapter.content[contentIndex] = updatedContent;

    await subject.save();

    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   ❌ Delete Chapter Content
========================= */
const deleteChapterContent = async (req, res) => {
  const { subjectId, classId, paperId, chapterIndex, contentIndex } =
    req.params;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const cls = subject.classes.find((c) => c.classId === classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const paper = cls.papers.find((p) => p.paperId === paperId);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    const chapter = paper.chapters[chapterIndex];
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.content.splice(contentIndex, 1);

    await subject.save();

    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSubject,
  getAllSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
  addClass,
  deleteClass,
  addPaper,
  deletePaper,
  addchapter,
  deleteChapter,
  addChapterContent,
  updateChapterContent,
  deleteChapterContent,
};
