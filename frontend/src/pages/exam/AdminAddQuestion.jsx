import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAddQuestion() {
  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/tests?examSlug=ielts&skillSlug=reading`,
      )
      .then((res) => setTests(res.data));
  }, []);

  const handleOption = (i, value) => {
    const newOps = [...options];
    newOps[i] = value;
    setOptions(newOps);
  };

  const submit = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions`, {
      testId,
      questionText,
      options,
      correctAnswer,
      type: "mcq",
    });
    alert("Question Added");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2>Add Question</h2>

      <select onChange={(e) => setTestId(e.target.value)}>
        <option>Select Test</option>
        {tests.map((t) => (
          <option key={t._id} value={t._id}>
            {t.title}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Question"
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {options.map((op, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          onChange={(e) => handleOption(i, e.target.value)}
        />
      ))}

      <input
        placeholder="Correct Answer"
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />

      <button onClick={submit}>Add Question</button>
    </div>
  );
}
