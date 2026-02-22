// AdminTestQuestions.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteQuestion,
  getQuestionsByTest,
  getTestById,
} from "../../store/features/auth/testSlice";

export default function TestDetails() {
  const { testId } = useParams();
  const { tests, questions, loading } = useSelector((state) => state.tests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!testId) return;
    dispatch(getTestById(testId));
    dispatch(getQuestionsByTest(testId));
  }, [testId, dispatch]);

  const handelDelete = async (id) => {
    await dispatch(deleteQuestion(id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* --- Questions Table --- */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl">{tests.title}</h2>
        <p className="text-xl">{tests.description}</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">প্রশ্নের তালিকা</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Question</th>
                <th className="border px-2 py-1">Options</th>
                <th className="border px-2 py-1">Correct</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {questions &&
                questions.length > 0 &&
                questions?.map((q, idx) => (
                  <tr key={q._id} className="text-sm">
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{q.questionText}</td>
                    <td className="border px-2 py-1">
                      {q.options.join(" | ")}
                    </td>
                    <td className="border px-2 py-1">{q.correctOption}</td>
                    <td className="border px-2 py-1 space-x-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handelDelete(q._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
