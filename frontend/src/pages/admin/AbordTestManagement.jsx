// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import AddModal from "../../components/AddModal";
// import { useDispatch, useSelector } from "react-redux";
// import { createClass, getSkills } from "../../store/features/auth/classesSlice";

// const AbordTestManagement = () => {
//   const [showAddModal, setShowAddModal] = React.useState(false);
//   const { classes } = useSelector((state) => state.classes);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getSkills());
//   }, [dispatch]);
//   console.log(classes);

//   const handleAddSkill = (name) => {
//     console.log(name);
//     dispatch(
//       createClass({
//         name,
//         isSkill: true,
//       }),
//     );

//     setShowAddModal(false);
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-center relative">
//         <div className="flex flex-col items-center justify-center">
//           <h1 className="text-2xl font-bold mb-4">Skill Test Management</h1>
//           <p className="text-gray-600">
//             This is the Skill Test Management page.
//           </p>
//         </div>
//       </div>
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2>স্কিল টেস্ট ম্যানেজমেন্ট</h2>{" "}
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add Skill
//           </button>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
//           {classes.map((cls) => (
//             <div
//               key={cls._id}
//               className="border p-4 mb-2 flex flex-col items-center space-y-2"
//             >
//               <h3 className="font-semibold capitalize">{cls.name}</h3>
//               <Link
//                 to={`${cls._id}`}
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//               >
//                 Enter Your Class
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Modal for Adding Class */}
//       {showAddModal && (
//         <AddModal
//           title="Add Skill"
//           onSave={handleAddSkill}
//           onClose={() => setShowAddModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AbordTestManagement;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddModal from "../../components/AddModal";
import { useDispatch, useSelector } from "react-redux";
import { createClass, getSkills } from "../../store/features/auth/classesSlice";
import { Plus, GraduationCap, ChevronRight, Loader2 } from "lucide-react";

const AbordTestManagement = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const { classes, loading } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleAddSkill = (name) => {
    dispatch(
      createClass({
        name,
        isSkill: true,
      }),
    );
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 font-kalpurush">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <GraduationCap className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Skill Test Management
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl">
              Manage and organize all your skill-based tests
            </p>

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <GraduationCap size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                Total Skills: {classes?.length || 0}
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
              স্কিল টেস্ট ম্যানেজমেন্ট
            </h2>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Skill
          </button>
        </div>

        {/* Skills Grid */}
        {classes && classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {classes.map((skill) => (
              <div
                key={skill._id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Skill Icon */}
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                    <span className="text-2xl font-light text-gray-600 capitalize">
                      {skill.name?.charAt(0)}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize">
                    {skill.name}
                  </h3>

                  <div className="w-12 h-0.5 bg-gray-200 rounded-full mb-4"></div>

                  <Link
                    to={`${skill._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full justify-center group/link"
                  >
                    <span>Enter Skill Test</span>
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
                <GraduationCap className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No skills yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Get started by creating your first skill test
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Create First Skill
              </button>
            </div>
          </div>
        )}

        {/* Quick Tips Section (Optional) */}
        {classes && classes.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">
                      {classes.length}
                    </div>
                    <div className="text-sm text-gray-500">Total Skills</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-xl font-light text-gray-600">📊</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">—</div>
                    <div className="text-sm text-gray-500">Active Tests</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-xl font-light text-gray-600">📝</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">—</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <AddModal
          title="Add New Skill"
          onSave={handleAddSkill}
          onClose={() => setShowAddModal(false)}
          placeholder="Enter skill name (e.g., Mathematics, English)"
        />
      )}
    </div>
  );
};

export default AbordTestManagement;
