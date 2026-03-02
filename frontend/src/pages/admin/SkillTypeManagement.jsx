// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSubjectById } from "../../store/features/auth/subjectSlice";
// import { getClassById } from "../../store/features/auth/classesSlice";
// import AddChapterModal from "../../components/AddChapterModal";
// import { createChapter } from "../../store/features/auth/chapterSlice";
// import { useState } from "react";

// const SkillTypeManagement = () => {
//   const { classId, subjectId } = useParams();
//   const { class: currentClass } = useSelector((state) => state.classes);
//   const { subject, loading } = useSelector((state) => state.subjects);

//   const dispatch = useDispatch();

//   const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);

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
//             <p>Skill : {currentClass?.name}</p>
//             <p>Type: {subject.name}</p>
//             <p>Description: {subject.description}</p>
//           </div>
//         )}
//       </div>
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold mb-4">এই স্কিলের পার্ট সমুহ</h2>
//           <button
//             onClick={() => setIsAddChapterModalOpen(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//           >
//             Add New Part
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
//           headline={`Add New Part For ${subject.name}`}
//         />
//       )}
//     </div>
//   );
// };

// export default SkillTypeManagement;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../../store/features/auth/subjectSlice";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddChapterModal from "../../components/AddChapterModal";
import { createChapter } from "../../store/features/auth/chapterSlice";
import { useState } from "react";
import {
  ArrowLeft,
  Target,
  Layers,
  Plus,
  ChevronRight,
  Loader2,
  BookOpen,
  FileText,
  Grid,
} from "lucide-react";

const SkillTypeManagement = () => {
  const { classId, subjectId } = useParams();
  const { class: currentClass } = useSelector((state) => state.classes);
  const { subject, loading } = useSelector((state) => state.subjects);

  const dispatch = useDispatch();

  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);

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
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading skill type details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link
              to={`/abord-test/${classId}`}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Skill Types
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">
              Skill Part Management
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Skill Type Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <Layers className="w-10 h-10 text-gray-700" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              {subject?.name || "Skill Type"}
            </h1>

            {subject?.description && (
              <p className="text-gray-500 text-sm max-w-2xl mb-4">
                {subject.description}
              </p>
            )}

            {/* Skill Info Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {currentClass && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                  <Target size={14} className="text-gray-600" />
                  <span className="text-sm text-gray-700">
                    Skill: {currentClass.name}
                  </span>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <Grid size={14} className="text-gray-600" />
                <span className="text-sm text-gray-700">
                  {subject?.chapter?.length || 0} Parts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
            <h2 className="text-2xl font-medium text-gray-800">
              এই স্কিলের পার্ট সমূহ
            </h2>
          </div>

          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Part
          </button>
        </div>

        {/* Parts Grid */}
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
                  {/* Part Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                      {index + 1}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-gray-300 group-hover:text-gray-400 transition-colors"
                    />
                  </div>

                  {/* Part Icon */}
                  <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                    <FileText className="w-7 h-7 text-gray-500" />
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {chapter.title}
                  </h3>

                  {chapter.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {chapter.description}
                    </p>
                  )}

                  {/* Part Stats */}
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
                <Layers className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো পার্ট নেই
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {subject?.name} এর জন্য নতুন পার্ট যোগ করুন
              </p>
              <button
                onClick={() => setIsAddChapterModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Add First Part
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
                <div className="text-sm text-gray-500">মোট পার্ট</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">টপিকস</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">কমপ্লিটেড</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">প্রগ্রেস</div>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <BookOpen
              size={20}
              className="text-gray-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                About Skill Parts
              </h4>
              <p className="text-sm text-gray-500">
                Skill parts help you break down each skill type into manageable
                sections. Add parts to organize different aspects of the skill
                assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Part Modal */}
      {isAddChapterModalOpen && (
        <AddChapterModal
          isOpen={isAddChapterModalOpen}
          onClose={() => setIsAddChapterModalOpen(false)}
          onSubmit={handleAddChapter}
          headline={`Add New Part For ${subject?.name || "Skill Type"}`}
          placeholder="Enter part name (e.g., Reading Comprehension, Vocabulary)"
        />
      )}
    </div>
  );
};

export default SkillTypeManagement;
