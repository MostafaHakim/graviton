import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse"; // CSV Parser
import { useParams } from "react-router-dom";
import { getTestByChapterId } from "../store/features/auth/testSlice";

export default function AdminTestManagement() {
  const { chapterId } = useParams();

  const { tests } = useSelector((state) => state.tests);

  const dispatch = useDispatch();

  const [selectedTest, setSelectedTest] = useState(null);

  // Test Creation
  const [testTitle, setTestTitle] = useState("");
  const [testDesc, setTestDesc] = useState("");

  // Single Question
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("A");

  // CSV File
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    if (!chapterId) return;
    dispatch(getTestByChapterId(chapterId));
  }, [chapterId, dispatch]);

  // --- Create Test ---
  const createTest = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: testTitle,
        description: testDesc,
        chapter: chapterId,
      }),
    });
    await res.json();

    setTestTitle("");
    setTestDesc("");
  };

  // --- Add Single Question ---
  const addQuestion = async (e) => {
    e.preventDefault();
    if (!selectedTest) return alert("Select a test first!");
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/tests/questions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: selectedTest._id,
          questionText,
          options,
          correctOption,
        }),
      },
    );
    await res.json();
    alert("Question added!");
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption("A");
  };

  // --- CSV Bulk Upload ---
  const handleCSVUpload = () => {
    if (!csvFile) return alert("Select a CSV file first!");
    if (!selectedTest) return alert("Select a test first!");

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        // CSV Columns: questionText, optionA, optionB, optionC, optionD, correctOption
        const questionsData = results.data.map((row) => ({
          testId: selectedTest._id,
          questionText: row.questionText,
          options: [row.optionA, row.optionB, row.optionC, row.optionD],
          correctOption: row.correctOption,
        }));
        console.log(questionsData);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/tests/questions/bulk/${selectedTest._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questions: questionsData }),
          },
        );
        const data = await res.json();
        alert(`${data.length} questions uploaded!`);
        setCsvFile(null);
      },
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* --- Test Selection & Creation --- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Create Test</h2>
        <form className="flex flex-col gap-2" onSubmit={createTest}>
          <input
            type="text"
            placeholder="Test Title"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={testDesc}
            onChange={(e) => setTestDesc(e.target.value)}
            className="border p-2 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Create Test
          </button>
        </form>

        <h3 className="mt-4 font-semibold">Select Test</h3>
        <select
          value={selectedTest?._id || ""}
          onChange={(e) =>
            setSelectedTest(tests.find((t) => t._id === e.target.value))
          }
          className="border p-2 rounded w-full mt-1"
        >
          <option value="">-- Select Test --</option>
          {tests.map((t) => (
            <option key={t._id} value={t._id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* --- Single Question --- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Add Single Question</h2>
        <form className="flex flex-col gap-2" onSubmit={addQuestion}>
          <textarea
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
              className="border p-2 rounded"
              required
            />
          ))}
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="border p-2 rounded"
          >
            {["A", "B", "C", "D"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Add Question
          </button>
        </form>
      </div>

      {/* --- CSV Bulk Upload --- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">
          Bulk Upload Questions (CSV)
        </h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
          className="border p-2 rounded mb-2"
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleCSVUpload}
        >
          Upload CSV
        </button>
        <p className="text-sm mt-2 text-gray-500">
          CSV Columns: questionText, optionA, optionB, optionC, optionD,
          correctOption
        </p>
      </div>
    </div>
  );
}
