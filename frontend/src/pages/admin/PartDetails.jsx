// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import DeleteModal from "../../components/DeleteModal";
// import {
//   deleteQuestion,
//   getQuestionsByTest,
//   getTestById,
// } from "../../store/features/auth/testSlice";

// export default function PartDetails() {
//   const { testId } = useParams();

//   const navigate = useNavigate();
//   const { tests, questions, loading } = useSelector((state) => state.tests);
//   const dispatch = useDispatch();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   useEffect(() => {
//     if (!testId) return;
//     dispatch(getTestById(testId));
//     dispatch(getQuestionsByTest(testId));
//   }, [testId, dispatch]);

//   const handelDelete = async (id) => {
//     await dispatch(deleteQuestion(id));
//     await dispatch(getQuestionsByTest(testId));
//     setShowDeleteModal(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* --- Questions Table --- */}
//       <div className="flex flex-col items-center justify-center">
//         <h2 className="text-2xl">{tests.title}</h2>
//         <p className="text-xl">{tests.description}</p>
//       </div>
//       <div className="flex flex-row items-center justify-start space-x-4">
//         {" "}
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => navigate(`create-paper`)}
//         >
//           Create Paper
//         </button>
//         <button
//           className="bg-orange-500 text-white px-4 py-2 rounded"
//           onClick={() => navigate(`/admin/abord/paper`)}
//         >
//           Paper List
//         </button>
//       </div>
//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-xl font-semibold mb-2">প্রশ্নের তালিকা</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1">#</th>
//                 <th className="border px-2 py-1">Question</th>
//                 <th className="border px-2 py-1">Options</th>
//                 <th className="border px-2 py-1">Correct</th>
//                 <th className="border px-2 py-1">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {questions &&
//                 questions.length > 0 &&
//                 questions?.map((q, idx) => (
//                   <tr key={q._id} className="text-sm">
//                     <td className="border px-2 py-1">{idx + 1}</td>
//                     <td className="border px-2 py-1">{q.questionText}</td>
//                     <td className="border px-2 py-1 text-left">
//                       {q.options?.map((opt, i) => (
//                         <div key={i}>
//                           <strong>{String.fromCharCode(65 + i)}.</strong>{" "}
//                           {opt.option}
//                           {opt.explanation && (
//                             <p className="text-xs text-gray-500">
//                               Explanation: {opt.explanation}
//                             </p>
//                           )}
//                         </div>
//                       ))}
//                     </td>
//                     <td className="border px-2 py-1">{q.correctOption}</td>
//                     <td className="border px-2 py-1 space-x-2">
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => setShowDeleteModal(true)}
//                       >
//                         Delete
//                       </button>
//                       {showDeleteModal && (
//                         <DeleteModal
//                           title={q.questionText}
//                           onDelete={handelDelete}
//                           onClose={() => setShowDeleteModal(false)}
//                           id={q._id}
//                         />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import {
  deleteQuestion,
  getQuestionsByTest,
  getTestById,
} from "../../store/features/auth/testSlice";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Trash2,
  Plus,
  List,
  Loader2,
  ChevronRight,
  HelpCircle,
  Award,
} from "lucide-react";

export default function PartDetails() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { tests, questions, loading } = useSelector((state) => state.tests);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    if (!testId) return;
    dispatch(getTestById(testId));
    dispatch(getQuestionsByTest(testId));
  }, [testId, dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteQuestion(id));
    await dispatch(getQuestionsByTest(testId));
    setShowDeleteModal(false);
    setSelectedQuestionId(null);
  };

  const handleDeleteClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading test details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Part Test Details</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <HelpCircle className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              {tests?.title || "Test Details"}
            </h1>
            {tests?.description && (
              <p className="text-gray-500 text-sm max-w-2xl">
                {tests.description}
              </p>
            )}

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <CheckCircle size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {questions?.length || 0} Questions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => navigate(`create-paper`)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Create Paper
          </button>
          <button
            onClick={() => navigate(`/admin/abord/paper`)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <List size={18} />
            Paper List
          </button>
        </div>

        {/* Questions Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-medium text-gray-900">
              প্রশ্নের তালিকা
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              এই টেস্টের সমস্ত প্রশ্ন এবং তাদের বিবরণ
            </p>
          </div>

          {questions && questions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Options
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correct
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {questions.map((q, idx) => (
                    <tr
                      key={q._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        <p className="line-clamp-2">{q.questionText}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-2">
                          {q.options?.map((opt, i) => (
                            <div
                              key={i}
                              className="bg-gray-50 p-2 rounded border border-gray-100"
                            >
                              <div className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full text-xs font-medium text-gray-700 flex-shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <div className="flex-1">
                                  <p className="text-gray-800">{opt.option}</p>
                                  {opt.explanation && (
                                    <p className="text-xs text-gray-500 mt-1 italic">
                                      ব্যাখ্যা: {opt.explanation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-xs font-medium text-green-700">
                            Option {q.correctOption}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteClick(q._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো প্রশ্ন নেই
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                এই টেস্টের জন্য এখনও কোনো প্রশ্ন যোগ করা হয়নি
              </p>
              <button
                onClick={() => navigate(`create-paper`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                প্রশ্ন যোগ করুন
              </button>
            </div>
          )}
        </div>

        {/* Summary Card */}
        {questions && questions.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">মোট প্রশ্ন:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">সঠিক উত্তর:</span>
                  <span className="text-sm font-medium text-gray-900">A-D</span>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                প্রিন্ট প্রিভিউ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedQuestionId && (
        <DeleteModal
          title="Delete Question"
          message="Are you sure you want to delete this question? This action cannot be undone."
          onDelete={() => handleDelete(selectedQuestionId)}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedQuestionId(null);
          }}
        />
      )}
    </div>
  );
}
