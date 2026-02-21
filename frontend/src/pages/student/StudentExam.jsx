// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function StudentExam() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0); // seconds
//   const [submitted, setSubmitted] = useState(false);
//   const [result, setResult] = useState(null);

//   const { testId } = useParams();
//   useEffect(() => {
//     // Load Questions + Test Duration
//     const loadTest = async () => {
//       const qRes = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/questions/${testId}`,
//       );
//       setQuestions(qRes.data);

//       const tRes = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/tests/${testId}`,
//       );
//       console.log(tRes, "not found");
//       setTimeLeft(tRes.data.duration * 60); // duration in minutes → seconds
//     };

//     loadTest();
//   }, [testId]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft <= 0 && questions.length && !submitted) handleSubmit();
//     const timer = setInterval(
//       () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
//       1000,
//     );
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted, questions]);

//   const handleAnswer = (qId, val) => setAnswers({ ...answers, [qId]: val });

//   const handleSubmit = async () => {
//     setSubmitted(true);

//     const answerArray = Object.keys(answers).map((qId) => ({
//       questionId: qId,
//       answer: answers[qId],
//     }));

//     const res = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/api/exams/submit`,
//       {
//         testId,
//         answers: answerArray,
//       },
//     );

//     setResult(res.data);
//   };

//   if (submitted && result)
//     return (
//       <div>
//         <h2>
//           Result: {result.totalScore}/{result.totalMarks}
//         </h2>
//         <ul>
//           {result.results.map((r) => (
//             <li key={r.questionId}>
//               {r.questionText} <br />
//               Your Answer: {r.yourAnswer} | Correct: {r.correctAnswer} |{" "}
//               {r.isCorrect ? "✅" : "❌"}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );

//   return (
//     <div>
//       <h2>
//         Time Left: {Math.floor(timeLeft / 60)}:
//         {("0" + (timeLeft % 60)).slice(-2)}
//       </h2>
//       {questions.map((q, i) => (
//         <div key={q._id} style={{ marginBottom: "20px" }}>
//           <p>
//             {i + 1}. {q.questionText}
//           </p>
//           {q.options.map((opt, idx) => (
//             <label key={idx}>
//               <input
//                 type="radio"
//                 name={q._id}
//                 value={opt}
//                 checked={answers[q._id] === opt}
//                 onChange={() => handleAnswer(q._id, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function StudentExam() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [attemptId, setAttemptId] = useState(null);
  const { testId } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/exams/start/${testId}`,
        {}, // body (POST বলে খালি object দিতে হবে)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setQuestions(res.data.questions);
        setTime(res.data.duration * 60);
        setAttemptId(res.data.attemptId);
      })
      .catch((err) => {
        console.log("Exam start error:", err.response?.data || err.message);
      });
  }, [testId]);

  useEffect(() => {
    if (time <= 0) submitExam();
    const t = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [time <= 0]);

  const submitExam = async () => {
    console.log(attemptId);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/exams/submit/${attemptId}`,
      { answers },
    );
    alert(`Score: ${res.data.correct}/${res.data.total}`);
  };

  return (
    <div>
      <h2>⏱️ Time Left: {time}s</h2>

      {questions.map((q, i) => (
        <div key={q._id}>
          <h4>
            {i + 1}. {q.title}
          </h4>
          {q.options.map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name={q._id}
                onChange={() => setAnswers({ ...answers, [q._id]: opt })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitExam}>Submit</button>
    </div>
  );
}
