import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateExam() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/user/exams`,
      {
        name,
        description,
      },
    );
    navigate(`/admin/exams/${data._id}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Exam</h2>

      <input
        placeholder="Exam Name"
        className="border p-2 w-full mb-3"
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-3"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Create Exam
      </button>
    </div>
  );
}
