// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { createPaper } from "../store/features/auth/paperSlice";
// import { getQuestionsByTest } from "../store/features/auth/testSlice";

// export default function CreatePaperForPart() {
//   const { testId, chapterId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { questions } = useSelector((state) => state.tests);

//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [guidline, setGuidline] = useState("");

//   useEffect(() => {
//     dispatch(getQuestionsByTest(testId));
//   }, [dispatch, testId]);

//   const handleCheckbox = (id) => {
//     setSelectedQuestions((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
//     );
//   };

//   const handleSubmit = async () => {
//     if (selectedQuestions.length === 0) {
//       alert("Please select at least one question");
//       return;
//     }
//     console.log(selectedQuestions);
//     await dispatch(
//       createPaper({
//         chapterId,
//         testId,
//         title,
//         duration,
//         totalMarks,
//         guidline,
//         isSkill: true,
//         questionIds: selectedQuestions,
//       }),
//     );

//     navigate("/admin/abord/papers");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Create Paper</h2>

//       <div className="space-y-4 mb-6">
//         <input
//           type="text"
//           placeholder="Paper Title"
//           className="border p-2 w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Duration (minutes)"
//           className="border p-2 w-full"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Total Marks"
//           className="border p-2 w-full"
//           value={totalMarks}
//           onChange={(e) => setTotalMarks(e.target.value)}
//         />
//         <textarea
//           type="text"
//           placeholder="write your exam guidline here"
//           className="border p-2 w-full"
//           value={guidline}
//           onChange={(e) => setGuidline(e.target.value)}
//         />
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Select</th>
//             <th className="border p-2">Question</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions?.map((q) => (
//             <tr key={q._id}>
//               <td className="border p-2 text-center">
//                 <input
//                   type="checkbox"
//                   checked={selectedQuestions.includes(q._id)}
//                   onChange={() => handleCheckbox(q._id)}
//                 />
//               </td>
//               <td className="border p-2">{q.questionText}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={handleSubmit}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Create Paper
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createPaper } from "../store/features/auth/paperSlice";
import { getQuestionsByTest } from "../store/features/auth/testSlice";
import {
  ArrowLeft,
  FileText,
  Clock,
  Award,
  FileCheck,
  CheckSquare,
  Square,
  AlertCircle,
  Loader2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function CreatePaperForPart() {
  const { testId, chapterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, loading } = useSelector((state) => state.tests);

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [guidline, setGuidline] = useState("");

  useEffect(() => {
    dispatch(getQuestionsByTest(testId));
  }, [dispatch, testId]);

  const handleCheckbox = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === questions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map((q) => q._id));
    }
  };

  const handleSubmit = async () => {
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question");
      return;
    }

    await dispatch(
      createPaper({
        chapterId,
        testId,
        title,
        duration: parseInt(duration),
        totalMarks: parseInt(totalMarks),
        guidline,
        isSkill: true,
        questionIds: selectedQuestions,
      }),
    );

    navigate("/admin/abord/papers");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link
              to={`/abord-test/part/${chapterId}`}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Part
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Create Paper</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <HelpCircle className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Create New Paper
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl">
              Select questions and configure paper settings for this part test
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Paper Settings Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                <FileCheck size={20} className="text-gray-600" />
                Paper Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Part 1: Listening Test"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      Duration (minutes)
                    </div>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-gray-400" />
                      Total Marks
                    </div>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Guidelines
                  </label>
                  <textarea
                    placeholder="Write instructions for students..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    value={guidline}
                    onChange={(e) => setGuidline(e.target.value)}
                  />
                </div>

                {/* Summary Card */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Selected Questions:
                        </span>
                        <span className="font-medium text-gray-900">
                          {selectedQuestions.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Marks:</span>
                        <span className="font-medium text-gray-900">
                          {totalMarks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-900">
                          {duration || 0} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={
                    selectedQuestions.length === 0 ||
                    !title ||
                    !duration ||
                    !totalMarks
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                    selectedQuestions.length > 0 &&
                    title &&
                    duration &&
                    totalMarks
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FileCheck size={18} />
                  Create Paper
                </button>
              </div>
            </div>
          </div>

          {/* Questions Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Select Questions
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose questions for this paper
                    </p>
                  </div>
                  <button
                    onClick={handleSelectAll}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {selectedQuestions.length === questions?.length ? (
                      <>Deselect All</>
                    ) : (
                      <>Select All</>
                    )}
                  </button>
                </div>
              </div>

              {questions && questions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {questions.map((q, index) => (
                    <div
                      key={q._id}
                      className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedQuestions.includes(q._id) ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handleCheckbox(q._id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-0.5">
                          <div
                            className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                              selectedQuestions.includes(q._id)
                                ? "bg-gray-900 border-gray-900"
                                : "border-gray-300 hover:border-gray-900"
                            }`}
                          >
                            {selectedQuestions.includes(q._id) && (
                              <CheckSquare size={14} className="text-white" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-500">
                              Question {index + 1}
                            </span>
                          </div>

                          <p className="text-gray-900 mb-3">{q.questionText}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options?.map((opt, i) => (
                              <div
                                key={i}
                                className={`text-sm p-2 rounded border ${
                                  q.correctOption ===
                                  String.fromCharCode(65 + i)
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + i)}.
                                </span>
                                {opt.option}
                              </div>
                            ))}
                          </div>

                          {q.correctOption && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Correct: Option {q.correctOption}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    This test doesn't have any questions yet
                  </p>
                  <Link
                    to={`/abord-test/part/${chapterId}/test/${testId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add Questions
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
