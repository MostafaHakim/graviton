// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   deletePaper,
//   getAllSkillPapers,
// } from "../store/features/auth/paperSlice";
// import { MoveLeft } from "lucide-react";

// export default function PartPaperList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { papers, loading } = useSelector((state) => state.papers);

//   useEffect(() => {
//     dispatch(getAllSkillPapers());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this paper?")) {
//       await dispatch(deletePaper(id));
//       dispatch(getAllSkillPapers());
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className=" bg-white rounded-2xl p-8 min-h-screen">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex flex-row space-x-2 border border-gray-100 rounded py-2 px-4 hover:shadow hover:border-gray-200"
//       >
//         <MoveLeft />
//         <span>Back</span>
//       </button>

//       <h2 className="text-2xl font-bold mb-4">Paper List</h2>

//       {papers.length === 0 ? (
//         <p>No papers found</p>
//       ) : (
//         <table className="w-full border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-2 py-1">#</th>
//               <th className="border px-2 py-1">Title</th>
//               <th className="border px-2 py-1">Test</th>
//               <th className="border px-2 py-1">Duration (min)</th>
//               <th className="border px-2 py-1">Total Marks</th>
//               <th className="border px-2 py-1">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {papers.map((paper, idx) => (
//               <tr key={paper._id}>
//                 <td className="border px-2 py-1">{idx + 1}</td>
//                 <td className="border px-2 py-1">{paper.title}</td>
//                 <td className="border px-2 py-1">
//                   {paper.test?.title || "N/A"}
//                 </td>
//                 <td className="border px-2 py-1">{paper.duration}</td>
//                 <td className="border px-2 py-1">{paper.totalMarks}</td>
//                 <td className="border px-2 py-1 space-x-2">
//                   <button
//                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                     onClick={() => navigate(`/admin/papers/${paper._id}`)}
//                   >
//                     View
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleDelete(paper._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  deletePaper,
  getAllSkillPapers,
} from "../store/features/auth/paperSlice";
import {
  ArrowLeft,
  FileText,
  Clock,
  Award,
  Trash2,
  Eye,
  Loader2,
  Search,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import DeleteModal from "../components/DeleteModal";

export default function PartPaperList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { papers, loading } = useSelector((state) => state.papers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  useEffect(() => {
    dispatch(getAllSkillPapers());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedPaperId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedPaperId) {
      await dispatch(deletePaper(selectedPaperId));
      dispatch(getAllSkillPapers());
      setShowDeleteModal(false);
      setSelectedPaperId(null);
    }
  };

  // Filter papers based on search
  const filteredPapers = papers.filter(
    (paper) =>
      paper.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.test?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading skill papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Skill Papers</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <HelpCircle className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Skill Paper List
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl">
              Manage all skill-based examination papers
            </p>

            {/* Stats */}
            <div className="mt-4 flex gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <FileText size={14} className="text-gray-600" />
                <span className="text-sm text-gray-700">
                  Total Papers: {papers.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search papers by title or test..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Papers Table/Card View */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white border border-gray-200 rounded-xl">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <HelpCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No skill papers found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchTerm
                ? "No papers match your search"
                : "Create your first skill paper to get started"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                Create Paper
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paper Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        Duration
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        Marks
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPapers.map((paper, idx) => (
                    <tr
                      key={paper._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {paper.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {paper.test?.title || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {paper.duration} min
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {paper.totalMarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/abord/paper/${paper._id}`)
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteClick(paper._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredPapers.map((paper, idx) => (
                <div
                  key={paper._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-400">#{idx + 1}</span>
                      <h3 className="font-medium text-gray-900">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {paper.test?.title || "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/abord/paper/${paper._id}`)
                        }
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(paper._id)}
                        className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {paper.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={12} />
                      {paper.totalMarks} marks
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Showing {filteredPapers.length} of {papers.length} skill
                  papers
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          title="Delete Skill Paper"
          message="Are you sure you want to delete this skill paper? This action cannot be undone."
          onDelete={handleDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPaperId(null);
          }}
        />
      )}
    </div>
  );
}
