import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPaperById } from "../../store/features/auth/paperSlice";
import { submitExam } from "../../store/features/auth/attemptSlice";

const Exam = () => {
  const { paperId } = useParams();
  const dispatch = useDispatch();
  const { paper } = useSelector((state) => state.papers);
  const { user } = useSelector((state) => state.auth);
  const { result, loading } = useSelector((state) => state.attempt);

  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Fetch Paper
  useEffect(() => {
    if (paperId) dispatch(getPaperById(paperId));
  }, [paperId, dispatch]);

  // Timer
  useEffect(() => {
    if (!paper?.duration) return;

    setTimeLeft(paper.duration * 60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paper]);

  if (!paper) return <p>Loading Paper...</p>;

  const question = paper.questions[currentIndex];
  const total = paper.questions.length;
  const answeredCount = Object.keys(checkedQuestions).length;

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Option Select
  const handleSelect = (label) => {
    if (checkedQuestions[question._id]) return;
    setAnswers({ ...answers, [question._id]: label });
  };

  // Check Button
  const handleCheck = () => {
    if (!answers[question._id]) return alert("একটি অপশন সিলেক্ট করুন");
    setCheckedQuestions({ ...checkedQuestions, [question._id]: true });
  };

  // Final Submit → Backend
  const handleFinalSubmit = () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedOption: answers[questionId],
    }));

    dispatch(
      submitExam({
        paperId: paper._id,
        studentId: user._id,
        answers: formattedAnswers,
      }),
    );

    setExamFinished(true);
  };

  // Result Page
  if (examFinished && !reviewMode) {
    if (loading) return <p>Submitting...</p>;
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
        {result && (
          <>
            <p className="text-lg mb-2">
              Marks: {result.obtainedMarks} / {result.totalMarks}
            </p>
            <p className="mb-6">Percentage: {result.percentage}%</p>
          </>
        )}
        <button
          onClick={() => setReviewMode(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Review Answers
        </button>
      </div>
    );
  }

  // Review Mode
  if (reviewMode) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold mb-4">{paper.title} - Review Mode</h2>
        {paper.questions.map((q, index) => (
          <div key={q._id} className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-3">
              {index + 1}. {q.questionText}
            </h3>
            {q.options.map((opt, i) => {
              const label = ["A", "B", "C", "D"][i];
              const isCorrect = q.correctOption === label;
              const isSelected = answers[q._id] === label;

              let style = "border p-2 rounded mb-2";
              if (isCorrect) style += " bg-green-100 border-green-500";
              else if (isSelected && !isCorrect)
                style += " bg-red-100 border-red-500";

              return (
                <div key={opt._id} className={style}>
                  {label}. {opt.option}
                  <div className="text-sm text-gray-600">
                    Explanation: {opt.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // Main Exam UI
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">{paper.title}</h2>
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
          ⏳ {formatTime()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-gray-200 rounded">
          <div
            className="h-3 bg-blue-600 rounded"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
        <p className="text-sm mt-1">
          Answered {answeredCount} / {total}
        </p>
      </div>

      {/* Question */}
      <div className="border p-6 rounded-xl shadow-sm">
        <h3 className="mb-4 font-semibold">
          {currentIndex + 1}. {question.questionText}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {question.options.map((opt, i) => {
            const label = ["A", "B", "C", "D"][i];
            const isSelected = answers[question._id] === label;
            const isCorrect = question.correctOption === label;
            const isChecked = checkedQuestions[question._id];

            let style = "border p-3 rounded cursor-pointer";
            if (isChecked) {
              if (isCorrect) style += " bg-green-100 border-green-500";
              else if (isSelected && !isCorrect)
                style += " bg-red-100 border-red-500";
            }

            return (
              <label key={opt._id} className={style}>
                <input
                  type="radio"
                  name={question._id}
                  checked={isSelected}
                  onChange={() => handleSelect(label)}
                  disabled={isChecked}
                  className="mr-2"
                />
                {label}. {opt.option}
                {isChecked && (
                  <div className="text-sm text-gray-600 mt-1 border rounded p-2">
                    Explanation: {opt.explanation}
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleCheck}
              disabled={checkedQuestions[question._id]}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Check
            </button>

            {currentIndex === total - 1 ? (
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Final Submit
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
