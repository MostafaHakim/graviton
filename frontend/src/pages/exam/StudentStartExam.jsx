// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function StudentStartExam() {
//   const { id } = useParams();
//   const [attemptId, setAttemptId] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);

//   useEffect(() => {
//     const start = async () => {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/student/exams/${id}/start`,
//       );
//       setAttemptId(data.attemptId);
//       setTests(data.tests);
//       setTimeLeft(data.tests.reduce((a, b) => a + b.timeLimit, 0) * 60); // total seconds
//     };
//     start();
//   }, [id]);

//   // Timer
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   const currentTest = tests[currentIndex];

//   const handleAnswer = (qId, ans) => {
//     setAnswers((prev) => ({ ...prev, [qId]: ans }));
//   };

//   const submitExam = async () => {
//     const formatted = Object.keys(answers).map((q) => ({
//       question: q,
//       answer: answers[q],
//     }));
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/api/student/exams/${id}/submit`,
//       {
//         attemptId,
//         answers: formatted,
//       },
//     );
//     alert(`Exam Submitted! Total Score: ${data.totalScore}`);
//   };

//   if (!currentTest) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-2">{currentTest.title}</h2>
//       <p className="text-gray-500">
//         Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
//       </p>

//       {currentTest.questions?.map((q) => (
//         <div key={q._id} className="mb-4">
//           <p className="font-medium">{q.question}</p>
//           {q.options?.map((opt) => (
//             <label key={opt} className="block">
//               <input
//                 type="radio"
//                 name={q._id}
//                 value={opt}
//                 onChange={() => handleAnswer(q._id, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//       <div className="flex justify-between mt-4">
//         <button
//           disabled={currentIndex === 0}
//           onClick={() => setCurrentIndex((i) => i - 1)}
//           className="bg-gray-500 px-4 py-2 text-white rounded"
//         >
//           Prev
//         </button>
//         {currentIndex < tests.length - 1 ? (
//           <button
//             onClick={() => setCurrentIndex((i) => i + 1)}
//             className="bg-blue-600 px-4 py-2 text-white rounded"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={submitExam}
//             className="bg-green-600 px-4 py-2 text-white rounded"
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function StudentStartExam() {
  const { id } = useParams();
  const [attemptId, setAttemptId] = useState(null);
  const [tests, setTests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // JWT token

  // Start Exam
  useEffect(() => {
    const start = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/student/exams/${id}/start`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(data);
        setAttemptId(data.attemptId);
        setTests(data.tests);
        setTimeLeft(data.tests.reduce((a, b) => a + b.timeLimit, 0) * 60); // total seconds
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    start();
  }, [id, token]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Auto submit when time ends
  useEffect(() => {
    if (timeLeft === 0 && attemptId) {
      submitExam();
    }
  }, [timeLeft]);

  const handleAnswer = (qId, ans) => {
    setAnswers((prev) => ({ ...prev, [qId]: ans }));
  };

  const submitExam = async () => {
    if (!attemptId) return;
    try {
      const formatted = Object.keys(answers).map((q) => ({
        question: q,
        answer: answers[q],
      }));

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/student/exams/${id}/submit`,
        { attemptId, answers: formatted },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert(`Exam Submitted! Total Score: ${data.totalScore}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading exam...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!tests.length) return <p>No tests available</p>;

  const currentTest = tests[currentIndex];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-2">{currentTest.title}</h2>
      <p className="text-gray-500">
        Time Left:{" "}
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}
        :{(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {currentTest.audio?.secure_url && (
        <audio controls src={currentTest.audio.secure_url} className="w-full my-4">
          Your browser does not support the audio element.
        </audio>
      )}

      {currentTest.questions?.map((q) => (
        <div key={q._id} className="mb-4">
          <p className="font-medium">{q.question}</p>
          {q.options && q.options.length > 0 ? (
            q.options.map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleAnswer(q._id, opt)}
                />
                {opt}
              </label>
            ))
          ) : (
            <textarea
              className="border p-2 w-full"
              value={answers[q._id] || ""}
              onChange={(e) => handleAnswer(q._id, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="bg-gray-500 px-4 py-2 text-white rounded"
        >
          Prev
        </button>
        {currentIndex < tests.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="bg-blue-600 px-4 py-2 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitExam}
            className="bg-green-600 px-4 py-2 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
