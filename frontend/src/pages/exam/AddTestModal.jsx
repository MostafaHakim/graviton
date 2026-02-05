import { useState } from "react";
import axios from "axios";

export default function AddTestModal({ examId, close, reload }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [marks, setMarks] = useState(10);
  const [time, setTime] = useState(30);
  const [audio, setAudio] = useState(null);

  const save = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("totalMarks", marks);
    formData.append("timeLimit", time);
    if (audio) {
      formData.append("audio", audio);
    }

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/user/exams/${examId}/tests`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
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

        {type === "audio" && (
          <input
            type="file"
            accept="audio/*"
            className="border p-2 w-full mb-2"
            onChange={(e) => setAudio(e.target.files[0])}
          />
        )}

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
