import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAddSkill() {
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/exams`)
      .then((res) => setExams(res.data));
  }, []);
  console.log(exams);
  const submit = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/skills/create`, {
      examId,
      name,
      slug,
      description,
    });
    alert("Skill Created");
    setName("");
    setSlug("");
    setDescription("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Skill</h2>

      <select onChange={(e) => setExamId(e.target.value)} className="input">
        <option>Select Exam</option>
        {exams.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Skill Name"
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        placeholder="Slug (reading)"
        onChange={(e) => setSlug(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="input"
      />

      <button onClick={submit} className="btn">
        Create Skill
      </button>
    </div>
  );
}
