// import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getClassById } from "../../store/features/auth/classesSlice";
// import AddSubjectModal from "../../components/AddSubjectModal";
// import { createSubject } from "../../store/features/auth/subjectSlice";

// const SkillManagement = () => {
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
//             <h2>Skil Type Management</h2>
//             {selectedClass && <p>Name: {selectedClass.name}</p>}
//           </div>
//           <div className="flex flex-col space-y-4">
//             <div className="flex flex-row items-center justify-between">
//               <h2 className="">Select Subject</h2>
//               <button
//                 onClick={() => setShowAddSubjectModal(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Add Skill Type
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
//               title="Add New Skil Type"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillManagement;

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddSubjectModal from "../../components/AddSubjectModal";
import { createSubject } from "../../store/features/auth/subjectSlice";
import {
  ArrowLeft,
  Layers,
  Plus,
  ChevronRight,
  Loader2,
  Target,
  BookOpen,
} from "lucide-react";

const SkillManagement = () => {
  const { classId } = useParams();
  const { class: selectedClass, loading } = useSelector(
    (state) => state.classes,
  );

  const dispatch = useDispatch();

  const [showAddSubjectModal, setShowAddSubjectModal] = React.useState(false);

  useEffect(() => {
    dispatch(getClassById(classId));
  }, [classId, dispatch]);

  const handleAddSubject = async (subjectData) => {
    const res = await dispatch(createSubject(subjectData));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getClassById(classId));
      setShowAddSubjectModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading skill details...</p>
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
              to="/abord-test"
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Skills
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Skill Management</span>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Skill Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <Target className="w-10 h-10 text-gray-700" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Skill Type Management
            </h1>

            {selectedClass && (
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-lg">Skill Category:</span>
                <span className="text-xl font-medium text-gray-900 capitalize">
                  {selectedClass.name}
                </span>
              </div>
            )}

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <Layers size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {selectedClass?.subjects?.length || 0} Skill Types
              </span>
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
              Select Skill Type
            </h2>
          </div>

          <button
            onClick={() => setShowAddSubjectModal(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Skill Type
          </button>
        </div>

        {/* Skills Grid */}
        {selectedClass?.subjects && selectedClass.subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {selectedClass.subjects.map((subject, index) => (
              <div
                key={subject._id || index}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Skill Type Icon */}
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                    <span className="text-3xl font-light text-gray-700 capitalize">
                      {subject.name?.charAt(0) || "S"}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 mb-3 capitalize">
                    {subject.name}
                  </h3>

                  <div className="w-12 h-0.5 bg-gray-200 rounded-full mb-4"></div>

                  <Link
                    to={subject._id}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full justify-center group/link"
                  >
                    <span>Select Skill Type</span>
                    <ChevronRight
                      size={16}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
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
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No skill types yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Start by adding skill types to {selectedClass?.name}
              </p>
              <button
                onClick={() => setShowAddSubjectModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Add First Skill Type
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        {selectedClass?.subjects && selectedClass.subjects.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {selectedClass.subjects.length}
                </div>
                <div className="text-sm text-gray-500">Total Skill Types</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Active Tests</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Participants</div>
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
                About Skill Types
              </h4>
              <p className="text-sm text-gray-500">
                Skill types help you organize different categories of tests
                within each skill. Add multiple skill types to create
                comprehensive assessment categories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Type Modal */}
      {showAddSubjectModal && (
        <AddSubjectModal
          onClose={() => setShowAddSubjectModal(false)}
          onSave={handleAddSubject}
          classId={classId}
          title="Add New Skill Type"
          placeholder="Enter skill type name (e.g., Reading, Writing, Listening)"
        />
      )}
    </div>
  );
};

export default SkillManagement;
