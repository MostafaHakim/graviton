import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createPaper } from "../store/features/auth/paperSlice";
import { getQuestionsByTest } from "../store/features/auth/testSlice";

export default function CreatePaper() {
  const { testId, chapterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions } = useSelector((state) => state.tests);

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

  const handleSubmit = async () => {
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question");
      return;
    }
    console.log(selectedQuestions);
    await dispatch(
      createPaper({
        chapterId,
        testId,
        title,
        duration,
        totalMarks,
        guidline,
        questionIds: selectedQuestions,
      }),
    );

    navigate("/admin/madeeasy/papers");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Paper</h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Paper Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          className="border p-2 w-full"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Marks"
          className="border p-2 w-full"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="write your exam guidline here"
          className="border p-2 w-full"
          value={guidline}
          onChange={(e) => setGuidline(e.target.value)}
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Select</th>
            <th className="border p-2">Question</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((q) => (
            <tr key={q._id}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(q._id)}
                  onChange={() => handleCheckbox(q._id)}
                />
              </td>
              <td className="border p-2">{q.questionText}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Paper
      </button>
    </div>
  );
}
