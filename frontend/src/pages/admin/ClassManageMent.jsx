// import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getClassById } from "../../store/features/auth/classesSlice";
// import AddSubjectModal from "../../components/AddSubjectModal";
// import { createSubject } from "../../store/features/auth/subjectSlice";

// const ClassManageMent = () => {
//   const { classId } = useParams();
//   const { class: selectedClass, loading } = useSelector(
//     (state) => state.classes,
//   );

//   const dispatch = useDispatch();

//   const [showAddSubjectModal, setShowAddSubjectModal] = React.useState(false);

//   useEffect(() => {
//     dispatch(getClassById(classId));
//   }, [classId, dispatch]);

//   const handleAddSubject = async (subjectData) => {
//     const res = await dispatch(createSubject(subjectData));

//     if (res.meta.requestStatus === "fulfilled") {
//       dispatch(getClassById(classId)); // 🔥 refresh class
//       setShowAddSubjectModal(false);
//     }
//   };

//   return (
//     <div>
//       {loading && <p>Loading class details...</p>}
//       {!loading && (
//         <div>
//           <div className="flex flex-col items-center justify-center">
//             <h2>Class Management</h2>
//             {selectedClass && <p>Name: {selectedClass.name}</p>}
//           </div>
//           <div className="flex flex-col space-y-4">
//             <div className="flex flex-row items-center justify-between">
//               <h2 className="">Select Subject</h2>
//               <button
//                 onClick={() => setShowAddSubjectModal(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Add Subject
//               </button>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
//               {selectedClass?.subjects?.map((subject, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center justify-between border p-4 rounded space-y-2"
//                 >
//                   <p className="text-2xl">{subject.name}</p>
//                   <Link
//                     to={subject._id}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                   >
//                     Select
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Add Modal */}
//           {showAddSubjectModal && (
//             <AddSubjectModal
//               onClose={() => setShowAddSubjectModal(false)}
//               onSave={handleAddSubject}
//               classId={classId}
//               title="Add New Subject"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClassManageMent;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddSubjectModal from "../../components/AddSubjectModal";
import {
  createSubject,
  deleteSubjects,
} from "../../store/features/auth/subjectSlice";
import { Trash2 } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

const ClassManageMent = () => {
  const { classId } = useParams();
  const { class: selectedClass, loading } = useSelector(
    (state) => state.classes,
  );

  const dispatch = useDispatch();

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    dispatch(getClassById(classId));
  }, [classId, dispatch]);

  const handleAddSubject = async (subjectData) => {
    const res = await dispatch(createSubject(subjectData));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getClassById(classId));
      setShowAddSubjectModal(false);
    }
  };

  const handelDeleteSubject = async (id) => {
    const res = await dispatch(deleteSubjects(id));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getClassById(classId));
      setDeleteModal(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center ">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm">Loading class details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link
              to="/made-easy"
              className="hover:text-gray-900 transition-colors"
            >
              Made Easy
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 font-medium">Class Management</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full border border-gray-200 mb-4">
              <span className="text-3xl font-light text-gray-700">
                {selectedClass?.name?.charAt(0).toUpperCase() || "C"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Class Management
            </h1>
            {selectedClass && (
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-lg">ক্লাসের নামঃ</span>
                <span className="text-xl font-medium text-gray-900 capitalize">
                  {selectedClass.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subjects Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
            <h2 className="text-2xl font-medium text-gray-800">
              Select Subject
            </h2>
            <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">
              {selectedClass?.subjects?.length || 0} subjects
            </span>
          </div>

          <button
            onClick={() => setShowAddSubjectModal(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Subject
          </button>
        </div>

        {/* Subjects Grid */}
        {selectedClass?.subjects && selectedClass.subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {selectedClass.subjects.map((subject, index) => (
              <div
                key={subject._id || index}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 "
              >
                <button
                  onClick={() => setDeleteModal(subject._id)}
                  className="absolute top-0 right-0 p-4 cursor-pointer"
                >
                  <Trash2 color="red" size={16} />
                </button>
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Subject Icon */}
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                    <span className="text-3xl font-light text-gray-700">
                      {subject.name?.charAt(0).toUpperCase() || "S"}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {subject.name}
                  </h3>

                  <div className="w-12 h-0.5 bg-gray-200 rounded-full mb-4"></div>

                  <Link
                    to={subject._id}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full justify-center"
                  >
                    <span>Select Subject</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No subjects yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Start by adding subjects to this class
              </p>
              <button
                onClick={() => setShowAddSubjectModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add First Subject
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Section (Optional) */}
        {selectedClass?.subjects && selectedClass.subjects.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {selectedClass.subjects.length}
                </div>
                <div className="text-sm text-gray-500">Total Subjects</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {selectedClass.subjects.filter((s) => s.name).length}
                </div>
                <div className="text-sm text-gray-500">Active Subjects</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Chapters</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Topics</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <AddSubjectModal
          onClose={() => setShowAddSubjectModal(false)}
          onSave={handleAddSubject}
          classId={classId}
          title="Add New Subject"
        />
      )}
      {/* Add Subject Modal */}
      {deleteModal !== null && (
        <DeleteModal
          title={`Are you sure? want to delete subject?`}
          onDelete={handelDeleteSubject}
          onClose={() => setDeleteModal(null)}
          id={deleteModal}
        />
      )}
    </div>
  );
};

export default ClassManageMent;
