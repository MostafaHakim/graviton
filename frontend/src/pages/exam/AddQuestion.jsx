import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import uploadAudio from "../../utils/uploadAudio";

export default function AddQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("");
  const [marks, setMarks] = useState(1);
  const [audio, setAudio] = useState(null);

  const submit = async () => {
    try {
      let audioData = null;

      if (audio) {
        const uploaded = await uploadAudio(audio);
        audioData = {
          public_id: uploaded.public_id,
          secure_url: uploaded.secure_url,
        };
      }

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/tests/${id}/questions`,
        {
          question,
          options,
          correctAnswer: correct, // 🔥 FIX
          marks, // 🔥 FIX
          audio: audioData,
        },
      );

      alert("✅ Question Added");
    } catch (err) {
      console.log(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>

      <textarea
        placeholder="Question"
        className="border p-2 w-full mb-3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((o, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          className="border p-2 w-full mb-2"
          value={o}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
        />
      ))}

      <input
        placeholder="Correct Answer"
        className="border p-2 w-full mb-2"
        value={correct}
        onChange={(e) => setCorrect(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        placeholder="Marks"
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files[0])}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
      >
        Save Question
      </button>
    </div>
  );
}
