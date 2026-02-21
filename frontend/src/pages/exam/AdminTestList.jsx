import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTestList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/tests?examSlug=ielts&skillSlug=reading`,
      )
      .then((res) => setTests(res.data));
  }, []);

  const deleteTest = async (id) => {
    await axios.delete(`/api/admin/test/${id}`);
    setTests(tests.filter((t) => t._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tests</h2>

      {tests.map((test) => (
        <div key={test._id} className="border p-3 flex justify-between">
          <span>{test.title}</span>
          <button onClick={() => deleteTest(test._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
