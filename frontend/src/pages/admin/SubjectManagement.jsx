// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSubjectById } from "../../store/features/auth/subjectSlice";
// import { getClassById } from "../../store/features/auth/classesSlice";
// import AddChapterModal from "../../components/AddChapterModal";
// import { createChapter } from "../../store/features/auth/chapterSlice";

// const SubjectManagement = () => {
//   const { classId, subjectId } = useParams();
//   const { class: currentClass } = useSelector((state) => state.classes);
//   const { subject, loading } = useSelector((state) => state.subjects);

//   const dispatch = useDispatch();

//   const [isAddChapterModalOpen, setIsAddChapterModalOpen] =
//     React.useState(false);

//   useEffect(() => {
//     if (classId) {
//       dispatch(getClassById(classId));
//     }
//   }, [classId, dispatch]);

//   useEffect(() => {
//     if (subjectId) {
//       dispatch(getSubjectById(subjectId));
//     }
//   }, [subjectId, dispatch]);

//   const handleAddChapter = async (formData) => {
//     const res = await dispatch(
//       createChapter({ ...formData, subject: subjectId }),
//     );
//     if (res.meta.requestStatus === "fulfilled") {
//       dispatch(getSubjectById(subjectId));
//       setIsAddChapterModalOpen(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center">
//         <h2>Subject Management</h2>
//         {loading && <p>Loading subject details...</p>}

//         {!loading && subject && (
//           <div className="flex flex-col items-center justify-center">
//             <p>Class : {currentClass?.name}</p>
//             <p>Subject: {subject.name}</p>
//             <p>Description: {subject.description}</p>
//           </div>
//         )}
//       </div>
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold mb-4">Chapters</h2>
//           <button
//             onClick={() => setIsAddChapterModalOpen(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//           >
//             Add Chapter
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {subject?.chapter?.map((chapter, index) => (
//             <Link
//               key={index}
//               to={chapter._id}
//               className="border p-4 rounded shadow hover:shadow-lg transition duration-300"
//             >
//               <h3 className="text-xl font-semibold">{chapter.title}</h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//       {/* ADD CHAPTER MODEL */}
//       {isAddChapterModalOpen && (
//         <AddChapterModal
//           isOpen={isAddChapterModalOpen}
//           onClose={() => setIsAddChapterModalOpen(false)}
//           onSubmit={handleAddChapter}
//           headline={`Add New Chapter For ${subject.name}`}
//         />
//       )}
//     </div>
//   );
// };

// export default SubjectManagement;

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../../store/features/auth/subjectSlice";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddChapterModal from "../../components/AddChapterModal";
import { createChapter } from "../../store/features/auth/chapterSlice";

const SubjectManagement = () => {
  const { classId, subjectId } = useParams();
  const { class: currentClass } = useSelector((state) => state.classes);
  const { subject, loading } = useSelector((state) => state.subjects);

  const dispatch = useDispatch();

  const [isAddChapterModalOpen, setIsAddChapterModalOpen] =
    React.useState(false);

  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    }
  }, [classId, dispatch]);

  useEffect(() => {
    if (subjectId) {
      dispatch(getSubjectById(subjectId));
    }
  }, [subjectId, dispatch]);

  const handleAddChapter = async (formData) => {
    const res = await dispatch(
      createChapter({ ...formData, subject: subjectId }),
    );
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getSubjectById(subjectId));
      setIsAddChapterModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm">Loading subject details...</p>
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
            <Link
              to={`/made-easy/${classId}`}
              className="hover:text-gray-900 transition-colors"
            >
              Class
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
            <span className="text-gray-900 font-medium">
              Subject Management
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Subject Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <span className="text-4xl font-light text-gray-700">
                {subject?.name?.charAt(0).toUpperCase() || "S"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-3">
              {subject?.name || "Subject"}
            </h1>

            {subject?.description && (
              <p className="text-gray-500 text-sm max-w-2xl mb-4">
                {subject.description}
              </p>
            )}

            {/* Class Info Badge */}
            {currentClass && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <span className="text-sm text-gray-600">Class:</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentClass.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapters Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
            <h2 className="text-2xl font-medium text-gray-800">Chapters</h2>
            <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">
              {subject?.chapter?.length || 0} chapters
            </span>
          </div>

          <button
            onClick={() => setIsAddChapterModalOpen(true)}
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
            Add New Chapter
          </button>
        </div>

        {/* Chapters Grid */}
        {subject?.chapter && subject.chapter.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {subject.chapter.map((chapter, index) => (
              <Link
                key={chapter._id || index}
                to={chapter._id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6">
                  {/* Chapter Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-gray-400">
                      Chapter {index + 1}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors"
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
                  </div>

                  {/* Chapter Icon */}
                  <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                    <svg
                      className="w-7 h-7 text-gray-500"
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

                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {chapter.title}
                  </h3>

                  {chapter.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {chapter.description}
                    </p>
                  )}

                  {/* Progress Indicator (Optional) */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Topics</span>
                      <span className="text-gray-600">—</span>
                    </div>
                  </div>
                </div>
              </Link>
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
                No chapters yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Start building your curriculum by adding chapters to{" "}
                {subject?.name}
              </p>
              <button
                onClick={() => setIsAddChapterModalOpen(true)}
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
                Add First Chapter
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        {subject?.chapter && subject.chapter.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {subject.chapter.length}
                </div>
                <div className="text-sm text-gray-500">Total Chapters</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Topics</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Chapter Modal */}
      {isAddChapterModalOpen && (
        <AddChapterModal
          isOpen={isAddChapterModalOpen}
          onClose={() => setIsAddChapterModalOpen(false)}
          onSubmit={handleAddChapter}
          headline={`Add New Chapter For ${subject?.name || "Subject"}`}
        />
      )}
    </div>
  );
};

export default SubjectManagement;
