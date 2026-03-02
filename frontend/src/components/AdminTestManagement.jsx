// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Papa from "papaparse";
// import { useParams } from "react-router-dom";
// import { getTestByChapterId } from "../store/features/auth/testSlice";

// export default function AdminTestManagement() {
//   const { chapterId } = useParams();
//   const dispatch = useDispatch();
//   const { tests } = useSelector((state) => state.tests);

//   const [selectedTest, setSelectedTest] = useState(null);

//   // Test Creation
//   const [testTitle, setTestTitle] = useState("");
//   const [testDesc, setTestDesc] = useState("");

//   // Single Question
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState([
//     { option: "", explanation: "" },
//     { option: "", explanation: "" },
//     { option: "", explanation: "" },
//     { option: "", explanation: "" },
//   ]);
//   const [correctOption, setCorrectOption] = useState("A");

//   // CSV
//   const [csvFile, setCsvFile] = useState(null);

//   useEffect(() => {
//     if (!chapterId) return;
//     dispatch(getTestByChapterId(chapterId));
//   }, [chapterId, dispatch]);

//   // --- Create Test ---
//   const createTest = async (e) => {
//     e.preventDefault();

//     await fetch(`${import.meta.env.VITE_BASE_URL}/api/tests`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: testTitle,
//         description: testDesc,
//         chapter: chapterId,
//       }),
//     });

//     setTestTitle("");
//     setTestDesc("");
//     alert("Test Created!");
//   };

//   // --- Add Single Question ---
//   const addQuestion = async (e) => {
//     e.preventDefault();
//     if (!selectedTest) return alert("Select a test first!");

//     const res = await fetch(
//       `${import.meta.env.VITE_BASE_URL}/api/tests/questions`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           testId: selectedTest._id,
//           questionText,
//           options,
//           correctOption,
//         }),
//       },
//     );

//     await res.json();

//     alert("Question Added!");

//     setQuestionText("");
//     setOptions([
//       { option: "", explanation: "" },
//       { option: "", explanation: "" },
//       { option: "", explanation: "" },
//       { option: "", explanation: "" },
//     ]);
//     setCorrectOption("A");
//   };

//   // --- CSV Bulk Upload ---
//   const handleCSVUpload = () => {
//     if (!csvFile) return alert("Select CSV file!");
//     if (!selectedTest) return alert("Select a test!");

//     Papa.parse(csvFile, {
//       header: true,
//       skipEmptyLines: true,
//       complete: async (results) => {
//         const questionsData = results.data.map((row) => ({
//           questionText: row.questionText,
//           options: [
//             { option: row.optionA, explanation: row.explanationA || "" },
//             { option: row.optionB, explanation: row.explanationB || "" },
//             { option: row.optionC, explanation: row.explanationC || "" },
//             { option: row.optionD, explanation: row.explanationD || "" },
//           ],
//           correctOption: row.correctOption,
//         }));

//         const res = await fetch(
//           `${import.meta.env.VITE_BASE_URL}/api/tests/questions/bulk/${selectedTest._id}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ questions: questionsData }),
//           },
//         );

//         const data = await res.json();
//         alert(`${data.length} Questions Uploaded!`);
//         setCsvFile(null);
//       },
//     });
//   };

//   return (
//     <div className="p-6 space-y-8">
//       {/* Test Creation */}
//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-xl font-semibold mb-2">Create Test</h2>
//         <form onSubmit={createTest} className="flex flex-col gap-2">
//           <input
//             type="text"
//             placeholder="Test Title"
//             value={testTitle}
//             onChange={(e) => setTestTitle(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={testDesc}
//             onChange={(e) => setTestDesc(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">
//             Create Test
//           </button>
//         </form>

//         <select
//           value={selectedTest?._id || ""}
//           onChange={(e) =>
//             setSelectedTest(tests.find((t) => t._id === e.target.value))
//           }
//           className="border p-2 rounded w-full mt-4"
//         >
//           <option value="">Select Test</option>
//           {tests.map((t) => (
//             <option key={t._id} value={t._id}>
//               {t.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Single Question */}
//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-xl font-semibold mb-2">Add Question</h2>

//         <form onSubmit={addQuestion} className="flex flex-col gap-2">
//           <textarea
//             placeholder="Question"
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />

//           {options.map((opt, i) => (
//             <div key={i} className="space-y-1">
//               <input
//                 type="text"
//                 placeholder={`Option ${String.fromCharCode(65 + i)}`}
//                 value={opt.option}
//                 onChange={(e) => {
//                   const newOptions = [...options];
//                   newOptions[i].option = e.target.value;
//                   setOptions(newOptions);
//                 }}
//                 className="border p-2 rounded w-full"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Explanation (optional)"
//                 value={opt.explanation}
//                 onChange={(e) => {
//                   const newOptions = [...options];
//                   newOptions[i].explanation = e.target.value;
//                   setOptions(newOptions);
//                 }}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//           ))}

//           <select
//             value={correctOption}
//             onChange={(e) => setCorrectOption(e.target.value)}
//             className="border p-2 rounded"
//           >
//             {["A", "B", "C", "D"].map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <button className="bg-green-500 text-white px-4 py-2 rounded">
//             Add Question
//           </button>
//         </form>
//       </div>

//       {/* CSV Upload */}
//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-xl font-semibold mb-2">Bulk Upload CSV</h2>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setCsvFile(e.target.files[0])}
//           className="border p-2 rounded mb-2"
//         />
//         <button
//           onClick={handleCSVUpload}
//           className="bg-purple-500 text-white px-4 py-2 rounded"
//         >
//           Upload CSV
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import { getTestByChapterId } from "../store/features/auth/testSlice";
import {
  FileText,
  Upload,
  Plus,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Download,
  X,
} from "lucide-react";

export default function AdminTestManagement() {
  const { chapterId } = useParams();
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.tests);

  const [selectedTest, setSelectedTest] = useState(null);
  const [activeTab, setActiveTab] = useState("create"); // "create", "single", "bulk"

  // Test Creation
  const [testTitle, setTestTitle] = useState("");
  const [testDesc, setTestDesc] = useState("");

  // Single Question
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { option: "", explanation: "" },
    { option: "", explanation: "" },
    { option: "", explanation: "" },
    { option: "", explanation: "" },
  ]);
  const [correctOption, setCorrectOption] = useState("A");

  // CSV
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);

  useEffect(() => {
    if (!chapterId) return;
    dispatch(getTestByChapterId(chapterId));
  }, [chapterId, dispatch]);

  // --- Create Test ---
  const createTest = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_BASE_URL}/api/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: testTitle,
        description: testDesc,
        chapter: chapterId,
      }),
    });

    setTestTitle("");
    setTestDesc("");
    dispatch(getTestByChapterId(chapterId));
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

    setQuestionText("");
    setOptions([
      { option: "", explanation: "" },
      { option: "", explanation: "" },
      { option: "", explanation: "" },
      { option: "", explanation: "" },
    ]);
    setCorrectOption("A");
  };

  // --- CSV Preview ---
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        preview: 3,
        complete: (results) => {
          setCsvPreview(results.data);
        },
      });
    }
  };

  // --- CSV Bulk Upload ---
  const handleCSVUpload = () => {
    if (!csvFile) return alert("Select CSV file!");
    if (!selectedTest) return alert("Select a test!");

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const questionsData = results.data.map((row) => ({
          questionText: row.questionText,
          options: [
            { option: row.optionA, explanation: row.explanationA || "" },
            { option: row.optionB, explanation: row.explanationB || "" },
            { option: row.optionC, explanation: row.explanationC || "" },
            { option: row.optionD, explanation: row.explanationD || "" },
          ],
          correctOption: row.correctOption,
        }));

        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/tests/questions/bulk/${selectedTest._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questions: questionsData }),
          },
        );

        const data = await res.json();
        alert(`${data.length} Questions Uploaded!`);
        setCsvFile(null);
        setCsvPreview([]);
      },
    });
  };

  // Sample CSV Template
  const downloadSampleCSV = () => {
    const sample = [
      {
        questionText: "Sample Question 1?",
        optionA: "Option A",
        optionB: "Option B",
        optionC: "Option C",
        optionD: "Option D",
        explanationA: "Explanation for A",
        explanationB: "Explanation for B",
        explanationC: "Explanation for C",
        explanationD: "Explanation for D",
        correctOption: "A",
      },
    ];

    const csv = Papa.unparse(sample);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_questions.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <FileText className="w-8 h-8 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Test Management
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl">
              Create and manage tests for your chapter
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Test
          </label>
          <div className="relative">
            <select
              value={selectedTest?._id || ""}
              onChange={(e) =>
                setSelectedTest(tests.find((t) => t._id === e.target.value))
              }
              className="appearance-none w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            >
              <option value="">Choose a test...</option>
              {tests.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === "create"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Create Test
          </button>
          <button
            onClick={() => setActiveTab("single")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === "single"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Add Question
          </button>
          <button
            onClick={() => setActiveTab("bulk")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === "bulk"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Bulk Upload
          </button>
        </div>

        {/* Tab Panels */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {/* Create Test Panel */}
          {activeTab === "create" && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Create New Test
              </h2>
              <form onSubmit={createTest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chapter 1: Basic Concepts"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of the test..."
                    value={testDesc}
                    onChange={(e) => setTestDesc(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus size={18} />
                  Create Test
                </button>
              </form>
            </div>
          )}

          {/* Single Question Panel */}
          {activeTab === "single" && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Add Single Question
              </h2>

              {!selectedTest && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <p className="text-sm text-yellow-700">
                    Please select a test first
                  </p>
                </div>
              )}

              <form onSubmit={addQuestion} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <textarea
                    placeholder="Enter your question here..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  {options.map((opt, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                          value={opt.option}
                          onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[i].option = e.target.value;
                            setOptions(newOptions);
                          }}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Explanation (optional)"
                        value={opt.explanation}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[i].explanation = e.target.value;
                          setOptions(newOptions);
                        }}
                        className="w-full ml-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correct Option
                  </label>
                  <div className="flex gap-4">
                    {["A", "B", "C", "D"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOption"
                          value={opt}
                          checked={correctOption === opt}
                          onChange={(e) => setCorrectOption(e.target.value)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-700">
                          Option {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedTest}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    selectedTest
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle size={18} />
                  Add Question
                </button>
              </form>
            </div>
          )}

          {/* Bulk Upload Panel */}
          {activeTab === "bulk" && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Bulk Upload Questions
              </h2>

              {!selectedTest && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <p className="text-sm text-yellow-700">
                    Please select a test first
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Sample CSV Download */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        Sample CSV Format
                      </h3>
                      <p className="text-xs text-gray-500">
                        Download a sample template to see the required format
                      </p>
                    </div>
                    <button
                      onClick={downloadSampleCSV}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download size={16} />
                      Sample CSV
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        {csvFile
                          ? csvFile.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400">CSV files only</p>
                    </label>
                  </div>
                </div>

                {/* CSV Preview */}
                {csvPreview.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Preview (first 3 rows)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-200">
                            {Object.keys(csvPreview[0]).map((key) => (
                              <th
                                key={key}
                                className="px-3 py-2 text-left font-medium text-gray-600"
                              >
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvPreview.map((row, i) => (
                            <tr key={i} className="border-b border-gray-100">
                              {Object.values(row).map((val, j) => (
                                <td key={j} className="px-3 py-2 text-gray-700">
                                  {val || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={handleCSVUpload}
                  disabled={!selectedTest || !csvFile}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    selectedTest && csvFile
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Upload size={18} />
                  Upload Questions
                </button>

                {csvFile && (
                  <button
                    onClick={() => {
                      setCsvFile(null);
                      setCsvPreview([]);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors ml-2"
                  >
                    <X size={16} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Test List */}
        {tests.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Available Tests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((test) => (
                <div
                  key={test._id}
                  className={`bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTest?._id === test._id
                      ? "ring-2 ring-gray-900 border-transparent"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTest(test)}
                >
                  <h4 className="font-medium text-gray-900 mb-1">
                    {test.title}
                  </h4>
                  {test.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {test.description}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-gray-400">
                    {/* Add question count if available */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
