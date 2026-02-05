import { useState } from "react";
import axios from "axios";

export default function AddTestModal({ examId, close, reload }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [marks, setMarks] = useState(10);
  const [time, setTime] = useState(30);

  const save = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/user/exams/${examId}/tests`,
      {
        title,
        type,
        totalMarks: marks,
        timeLimit: time,
      },
    );
    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold text-lg mb-4">Add Test</h2>

        <input
          placeholder="Test Name"
          className="border p-2 w-full mb-2"
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="mcq">MCQ</option>
          <option value="audio">Listening</option>
          <option value="writing">Writing</option>
          <option value="file">File</option>
        </select>

        <input
          type="number"
          placeholder="Total Marks"
          className="border p-2 w-full mb-2"
          onChange={(e) => setMarks(e.target.value)}
        />

        <input
          type="number"
          placeholder="Time Limit"
          className="border p-2 w-full mb-4"
          onChange={(e) => setTime(e.target.value)}
        />

        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}
