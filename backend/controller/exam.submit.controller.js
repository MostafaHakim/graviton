const Test = require("../model/test.model");
const Question = require("../model/questions.model");
const ExamAttempt = require("../model/examattempt.model");

// const submitExam = async (req, res) => {
//   try {
//     const { testId, answers } = req.body;
//     /**
//      * answers = [
//      *  { questionId: "xxxx", answer: "A" },
//      *  ...
//      * ]
//      */
//     console.log("submitetdddd");
//     if (!testId || !answers) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const test = await Test.findById(testId);
//     if (!test) return res.status(404).json({ message: "Test not found" });

//     const questions = await Question.find({ test: testId });

//     let totalScore = 0;
//     let detailedResults = [];

//     questions.forEach((q) => {
//       const userAnswer = answers.find((a) => a.questionId === q._id.toString());
//       const isCorrect = userAnswer?.answer === q.correctAnswer;
//       if (isCorrect) totalScore += q.marks;

//       detailedResults.push({
//         questionId: q._id,
//         questionText: q.questionText,
//         correctAnswer: q.correctAnswer,
//         yourAnswer: userAnswer?.answer || null,
//         isCorrect,
//         marks: q.marks,
//       });
//     });

//     res.json({
//       test: test.title,
//       totalScore,
//       totalMarks: questions.reduce((acc, q) => acc + q.marks, 0),
//       results: detailedResults,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const submitExam = async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: selectedOption }

    const attempt = await ExamAttempt.findById(req.params.attemptId);

    let score = 0;

    attempt.questions.forEach((q) => {
      if (answers[q.questionId] === q.correctAnswer) score++;
    });

    attempt.score = score;
    attempt.completedAt = new Date();
    await attempt.save();
    console.log(attempt);
    res.json({
      total: attempt.questions.length,
      correct: score,
      wrong: attempt.questions.length - score,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const startExam = async (req, res) => {
  try {
    const { testId } = req.params;
    const userId = req.user._id;

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    // Random  questions
    const questions = await Question.aggregate([
      { $match: { test: test._id } },
      // { $sample: { size: test.totalQuestions } },
    ]);

    // Shuffle options
    const shuffled = questions.map((q) => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5),
    }));

    const attempt = await ExamAttempt.create({
      student: userId,
      test: testId,
      startedAt: new Date(),
      questions: shuffled.map((q) => ({
        questionId: q._id,
        correctAnswer: q.correctAnswer,
      })),
    });

    res.json({
      attemptId: attempt._id,
      duration: test.duration,
      questions: shuffled.map((q) => ({
        _id: q._id,
        title: q.title,
        options: q.options,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { startExam, submitExam };
