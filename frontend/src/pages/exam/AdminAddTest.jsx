import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAddTest() {
  const [exams, setExams] = useState([]);
  const [skills, setSkills] = useState([]);
  const [examId, setExamId] = useState("");
  const [skillId, setSkillId] = useState("");

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/exams`)
      .then((res) => setExams(res.data));
  }, []);

  const loadSkills = async (examId) => {
    const exam = exams.find((e) => e._id === examId);

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/skills/${exam.name}`,
    );
    setSkills(res.data);
  };

  const submit = async () => {
    console.log(examId, skillId, title, duration, marks);
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/tests/create`, {
      examId,
      skillId,
      title,
      duration,
      totalMarks: marks,
    });
    alert("Test Created");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Test</h2>

      <select
        onChange={(e) => {
          setExamId(e.target.value);
          loadSkills(e.target.value);
        }}
      >
        <option>Select Exam</option>
        {exams.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSkillId(e.target.value)}>
        <option>Select Skill</option>
        {skills.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Test Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Duration (min)"
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        placeholder="Total Marks"
        onChange={(e) => setMarks(e.target.value)}
      />

      <button onClick={submit}>Create Test</button>
    </div>
  );
}
