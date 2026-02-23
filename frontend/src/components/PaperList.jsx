import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPapers, deletePaper } from "../store/features/auth/paperSlice";

export default function PaperList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { papers, loading } = useSelector((state) => state.papers);

  useEffect(() => {
    dispatch(getAllPapers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      await dispatch(deletePaper(id));
      dispatch(getAllPapers()); // refresh list
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Paper List</h2>

      {papers.length === 0 ? (
        <p>No papers found</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Test</th>
              <th className="border px-2 py-1">Duration (min)</th>
              <th className="border px-2 py-1">Total Marks</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {papers.map((paper, idx) => (
              <tr key={paper._id}>
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{paper.title}</td>
                <td className="border px-2 py-1">
                  {paper.test?.title || "N/A"}
                </td>
                <td className="border px-2 py-1">{paper.duration}</td>
                <td className="border px-2 py-1">{paper.totalMarks}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => navigate(`/admin/papers/${paper._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(paper._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
