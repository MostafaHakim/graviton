import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddTestModal from "./AddTestModal";

export default function ExamDetail() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/user/exams/${id}`,
    );
    setExam(data.exam);
    setTests(data.tests);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h2>Exam</h2>
      {exam && (
        <>
          <h1 className="text-3xl font-bold">{exam.name}</h1>
          <p className="text-gray-500">{exam.description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Test
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {tests.map((t) => (
              <div key={t._id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{t.title}</h3>
                <p>{t.type}</p>

                <a
                  href={`/admin/tests/${t._id}`}
                  className="text-blue-600 underline"
                >
                  Add Questions
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <AddTestModal
          examId={id}
          close={() => setShowModal(false)}
          reload={load}
        />
      )}
    </div>
  );
}
