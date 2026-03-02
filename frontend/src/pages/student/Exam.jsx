// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getPaperById } from "../../store/features/auth/paperSlice";
// import { submitExam } from "../../store/features/auth/attemptSlice";

// const Exam = () => {
//   const { paperId } = useParams();
//   const dispatch = useDispatch();
//   const { paper } = useSelector((state) => state.papers);
//   const { user } = useSelector((state) => state.auth);
//   const { result, loading } = useSelector((state) => state.attempt);

//   const [answers, setAnswers] = useState({});
//   const [checkedQuestions, setCheckedQuestions] = useState({});
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [examFinished, setExamFinished] = useState(false);
//   const [reviewMode, setReviewMode] = useState(false);

//   // Fetch Paper
//   useEffect(() => {
//     if (paperId) dispatch(getPaperById(paperId));
//   }, [paperId, dispatch]);

//   // Timer
//   useEffect(() => {
//     if (!paper?.duration) return;

//     setTimeLeft(paper.duration * 60);

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           handleFinalSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [paper]);

//   if (!paper) return <p>Loading Paper...</p>;

//   const question = paper.questions[currentIndex];
//   const total = paper.questions.length;
//   const answeredCount = Object.keys(checkedQuestions).length;

//   const formatTime = () => {
//     const m = Math.floor(timeLeft / 60);
//     const s = timeLeft % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   // Option Select
//   const handleSelect = (label) => {
//     if (checkedQuestions[question._id]) return;
//     setAnswers({ ...answers, [question._id]: label });
//   };

//   // Check Button
//   const handleCheck = () => {
//     if (!answers[question._id]) return alert("একটি অপশন সিলেক্ট করুন");
//     setCheckedQuestions({ ...checkedQuestions, [question._id]: true });
//   };

//   // Final Submit → Backend
//   const handleFinalSubmit = () => {
//     const formattedAnswers = Object.keys(answers).map((questionId) => ({
//       questionId,
//       selectedOption: answers[questionId],
//     }));

//     dispatch(
//       submitExam({
//         paperId: paper._id,
//         studentId: user._id,
//         answers: formattedAnswers,
//       }),
//     );

//     setExamFinished(true);
//   };

//   // Result Page
//   if (examFinished && !reviewMode) {
//     if (loading) return <p>Submitting...</p>;
//     return (
//       <div className="max-w-3xl mx-auto p-6 text-center">
//         <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
//         {result && (
//           <>
//             <p className="text-lg mb-2">
//               Marks: {result.obtainedMarks} / {result.totalMarks}
//             </p>
//             <p className="mb-6">Percentage: {result.percentage}%</p>
//           </>
//         )}
//         <button
//           onClick={() => setReviewMode(true)}
//           className="px-6 py-2 bg-blue-600 text-white rounded"
//         >
//           Review Answers
//         </button>
//       </div>
//     );
//   }

//   // Review Mode
//   if (reviewMode) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 space-y-6">
//         <h2 className="text-xl font-bold mb-4">{paper.title} - Review Mode</h2>
//         {paper.questions.map((q, index) => (
//           <div key={q._id} className="border p-4 rounded-lg">
//             <h3 className="font-semibold mb-3">
//               {index + 1}. {q.questionText}
//             </h3>
//             {q.options.map((opt, i) => {
//               const label = ["A", "B", "C", "D"][i];
//               const isCorrect = q.correctOption === label;
//               const isSelected = answers[q._id] === label;

//               let style = "border p-2 rounded mb-2";
//               if (isCorrect) style += " bg-green-100 border-green-500";
//               else if (isSelected && !isCorrect)
//                 style += " bg-red-100 border-red-500";

//               return (
//                 <div key={opt._id} className={style}>
//                   {label}. {opt.option}
//                   <div className="text-sm text-gray-600">
//                     Explanation: {opt.explanation}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Main Exam UI
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-bold">{paper.title}</h2>
//         <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
//           ⏳ {formatTime()}
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div className="h-3 bg-gray-200 rounded">
//           <div
//             className="h-3 bg-blue-600 rounded"
//             style={{ width: `${(answeredCount / total) * 100}%` }}
//           />
//         </div>
//         <p className="text-sm mt-1">
//           Answered {answeredCount} / {total}
//         </p>
//       </div>

//       {/* Question */}
//       <div className="border p-6 rounded-xl shadow-sm">
//         <h3 className="mb-4 font-semibold">
//           {currentIndex + 1}. {question.questionText}
//         </h3>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {question.options.map((opt, i) => {
//             const label = ["A", "B", "C", "D"][i];
//             const isSelected = answers[question._id] === label;
//             const isCorrect = question.correctOption === label;
//             const isChecked = checkedQuestions[question._id];

//             let style = "border p-3 rounded cursor-pointer";
//             if (isChecked) {
//               if (isCorrect) style += " bg-green-100 border-green-500";
//               else if (isSelected && !isCorrect)
//                 style += " bg-red-100 border-red-500";
//             }

//             return (
//               <label key={opt._id} className={style}>
//                 <input
//                   type="radio"
//                   name={question._id}
//                   checked={isSelected}
//                   onChange={() => handleSelect(label)}
//                   disabled={isChecked}
//                   className="mr-2"
//                 />
//                 {label}. {opt.option}
//                 {isChecked && (
//                   <div className="text-sm text-gray-600 mt-1 border rounded p-2">
//                     Explanation: {opt.explanation}
//                   </div>
//                 )}
//               </label>
//             );
//           })}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             disabled={currentIndex === 0}
//             onClick={() => setCurrentIndex(currentIndex - 1)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Previous
//           </button>

//           <div className="flex gap-3">
//             <button
//               onClick={handleCheck}
//               disabled={checkedQuestions[question._id]}
//               className="px-4 py-2 bg-yellow-500 text-white rounded"
//             >
//               Check
//             </button>

//             {currentIndex === total - 1 ? (
//               <button
//                 onClick={handleFinalSubmit}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Final Submit
//               </button>
//             ) : (
//               <button
//                 onClick={() => setCurrentIndex(currentIndex + 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Exam;

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

  useEffect(() => {
    if (paperId) dispatch(getPaperById(paperId));
  }, [paperId, dispatch]);

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

  if (!paper)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
            Loading Paper...
          </p>
        </div>
      </div>
    );

  const question = paper.questions[currentIndex];
  const total = paper.questions.length;
  const answeredCount = Object.keys(checkedQuestions).length;
  const progressPercent = (answeredCount / total) * 100;

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isUrgent = timeLeft < 60;
  const isWarning = timeLeft < 180;

  const handleSelect = (label) => {
    if (checkedQuestions[question._id]) return;
    setAnswers({ ...answers, [question._id]: label });
  };

  const handleCheck = () => {
    if (!answers[question._id]) return alert("একটি অপশন সিলেক্ট করুন");
    setCheckedQuestions({ ...checkedQuestions, [question._id]: true });
  };

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

  const optionLabels = ["A", "B", "C", "D"];

  // ── RESULT PAGE ──────────────────────────────────────────────────
  if (examFinished && !reviewMode) {
    if (loading)
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
              Submitting...
            </p>
          </div>
        </div>
      );

    const pct = result?.percentage ?? 0;
    const color = pct >= 70 ? "emerald" : pct >= 40 ? "amber" : "rose";
    const colorMap = {
      emerald: {
        ring: "ring-emerald-400",
        text: "text-emerald-400",
        bg: "from-emerald-900/30",
        glow: "shadow-emerald-500/30",
        btn: "bg-emerald-500 hover:bg-emerald-400",
      },
      amber: {
        ring: "ring-amber-400",
        text: "text-amber-400",
        bg: "from-amber-900/30",
        glow: "shadow-amber-500/30",
        btn: "bg-amber-500 hover:bg-amber-400",
      },
      rose: {
        ring: "ring-rose-400",
        text: "text-rose-400",
        bg: "from-rose-900/30",
        glow: "shadow-rose-500/30",
        btn: "bg-rose-500 hover:bg-rose-400",
      },
    }[color];

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-md bg-gradient-to-b ${colorMap.bg} to-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl ${colorMap.glow}`}
        >
          {/* Score Circle */}
          <div
            className={`w-36 h-36 mx-auto rounded-full border-4 ${colorMap.ring} flex flex-col items-center justify-center mb-8 shadow-lg`}
          >
            <span className={`text-4xl font-black ${colorMap.text}`}>
              {result?.obtainedMarks ?? "–"}
            </span>
            <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
              / {result?.totalMarks}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{paper.title}</h2>
          <p className="text-slate-400 text-sm mb-6 font-mono">
            Exam Completed
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/60 rounded-2xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1 font-mono">
                Score
              </p>
              <p className={`text-2xl font-bold ${colorMap.text}`}>
                {result?.obtainedMarks ?? "–"}
              </p>
            </div>
            <div className="bg-slate-800/60 rounded-2xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1 font-mono">
                Percentage
              </p>
              <p className={`text-2xl font-bold ${colorMap.text}`}>{pct}%</p>
            </div>
          </div>

          <button
            onClick={() => setReviewMode(true)}
            className={`w-full py-3 rounded-2xl ${colorMap.btn} text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg`}
          >
            Review Answers →
          </button>
        </div>
      </div>
    );
  }

  // ── REVIEW MODE ───────────────────────────────────────────────────
  if (reviewMode) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-bold text-cyan-400 font-mono">
            {paper.title}
          </h2>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            Review Mode
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-6 space-y-6 pb-20">
          {paper.questions.map((q, index) => {
            const userAnswer = answers[q._id];
            const isCorrect = userAnswer === q.correctOption;
            return (
              <div
                key={q._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 border-b border-slate-800">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-mono text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-white font-medium leading-relaxed">
                    {q.questionText}
                  </p>
                </div>
                <div className="p-4 space-y-2">
                  {q.options.map((opt, i) => {
                    const label = optionLabels[i];
                    const isCor = q.correctOption === label;
                    const isSel = answers[q._id] === label;
                    return (
                      <div
                        key={opt._id}
                        className={`rounded-xl p-3 border transition-all ${
                          isCor
                            ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-300"
                            : isSel && !isCor
                              ? "bg-rose-900/30 border-rose-500/50 text-rose-300"
                              : "bg-slate-800/40 border-slate-700/50 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isCor
                                ? "bg-emerald-500 text-white"
                                : isSel
                                  ? "bg-rose-500 text-white"
                                  : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {label}
                          </span>
                          <span className="text-sm font-medium">
                            {opt.option}
                          </span>
                          {isCor && (
                            <span className="ml-auto text-emerald-400 text-xs">
                              ✓ Correct
                            </span>
                          )}
                          {isSel && !isCor && (
                            <span className="ml-auto text-rose-400 text-xs">
                              ✗ Your answer
                            </span>
                          )}
                        </div>
                        {opt.explanation && (
                          <p className="mt-2 ml-9 text-xs text-slate-400 italic leading-relaxed">
                            {opt.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── MAIN EXAM UI ──────────────────────────────────────────────────
  const isChecked = checkedQuestions[question._id];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-white truncate">{paper.title}</h1>
            <p className="text-slate-400 text-xs font-mono">
              Q{currentIndex + 1}/{total} · {answeredCount} Checked
            </p>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg border transition-all ${
              isUrgent
                ? "bg-rose-950 border-rose-500 text-rose-400 animate-pulse"
                : isWarning
                  ? "bg-amber-950 border-amber-500 text-amber-400"
                  : "bg-slate-800 border-slate-700 text-cyan-400"
            }`}
          >
            <span className="text-sm">{isUrgent ? "🔥" : "⏱"}</span>
            {formatTime()}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Question Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm">
              {currentIndex + 1}
            </span>
            <p className="text-white text-lg font-medium leading-relaxed">
              {question.questionText}
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {question.options.map((opt, i) => {
            const label = optionLabels[i];
            const isSelected = answers[question._id] === label;
            const isCorrect = question.correctOption === label;

            let base =
              "border rounded-xl p-4 cursor-pointer transition-all duration-200 select-none";
            if (isChecked) {
              if (isCorrect)
                base +=
                  " bg-emerald-900/30 border-emerald-500 text-emerald-200";
              else if (isSelected && !isCorrect)
                base += " bg-rose-900/30 border-rose-500 text-rose-200";
              else
                base +=
                  " bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
            } else if (isSelected) {
              base +=
                " bg-cyan-900/30 border-cyan-500 text-cyan-100 shadow-lg shadow-cyan-900/20";
            } else {
              base +=
                " bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800";
            }

            return (
              <label
                key={opt._id}
                className={base}
                onClick={() => handleSelect(label)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                      isChecked && isCorrect
                        ? "bg-emerald-500 border-emerald-400 text-white"
                        : isChecked && isSelected && !isCorrect
                          ? "bg-rose-500 border-rose-400 text-white"
                          : isSelected
                            ? "bg-cyan-500 border-cyan-400 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                  <div className="flex-1">
                    <input
                      type="radio"
                      name={question._id}
                      checked={isSelected}
                      onChange={() => handleSelect(label)}
                      disabled={isChecked}
                      className="hidden"
                    />
                    <span className="text-sm font-medium leading-snug">
                      {opt.option}
                    </span>
                    {isChecked && opt.explanation && (
                      <p className="mt-2 text-xs text-slate-400 italic leading-relaxed border-t border-slate-700 pt-2">
                        {opt.explanation}
                      </p>
                    )}
                  </div>
                  {isChecked && isCorrect && (
                    <span className="flex-shrink-0 text-emerald-400 text-lg">
                      ✓
                    </span>
                  )}
                  {isChecked && isSelected && !isCorrect && (
                    <span className="flex-shrink-0 text-rose-400 text-lg">
                      ✗
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {!isChecked && (
              <button
                onClick={handleCheck}
                className="px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/50 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition-all text-sm font-semibold"
              >
                Check
              </button>
            )}

            {currentIndex === total - 1 ? (
              <button
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30"
              >
                Submit Exam ✓
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-900/30"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator Dots */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {paper.questions.map((q, i) => {
            const done = checkedQuestions[q._id];
            const active = i === currentIndex;
            return (
              <button
                key={q._id}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all border ${
                  active
                    ? "bg-cyan-500 border-cyan-400 text-white scale-110"
                    : done
                      ? "bg-emerald-900/50 border-emerald-500/50 text-emerald-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Exam;
