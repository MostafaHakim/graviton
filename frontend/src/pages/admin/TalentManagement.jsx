// import React, { useEffect, useState } from "react";
// import TalentForm from "../../components/TalentForm";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createTalent,
//   getTalents,
// } from "../../store/features/auth/talentSlice";
// import { useNavigate } from "react-router-dom";

// const TalentManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const { talents, loading } = useSelector((state) => state.talents);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTalents());
//   }, [dispatch]);

//   const handleAddTalent = async (formData) => {
//     const res = await dispatch(createTalent(formData));

//     if (res.meta.requestStatus === "fulfilled") {
//       await dispatch(getTalents());
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl relative">
//       {/* Header */}

//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold">Talent Hunt Management</h2>

//         <button
//           className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           onClick={() => setShowModal(true)}
//         >
//           Add Talent Hunt
//         </button>
//       </div>

//       {/* Modal */}

//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl max-h-[90vh] overflow-y-auto w-[900px]">
//             <div className="flex justify-between mb-4">
//               <h3 className="text-xl font-semibold">Create Talent Hunt</h3>

//               <button
//                 className="text-red-500"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>

//             <TalentForm handleAddTalent={handleAddTalent} />
//           </div>
//         </div>
//       )}

//       {/* Loading */}

//       {loading && <p>Loading...</p>}

//       {/* Talent List */}

//       <div className="grid md:grid-cols-2 gap-6 mt-6">
//         {talents?.map((talent) => (
//           <div
//             key={talent._id}
//             className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
//           >
//             {/* Title */}

//             <div className="flex flex-row items-center justify-between p-4">
//               <h3 className="text-lg font-bold mb-3">{talent.title}</h3>
//               <button
//                 className="px-6 py-2 bg-blue-500 text-white rounded cursor-pointer"
//                 onClick={() => navigate(talent._id)}
//               >
//                 See Applied Students
//               </button>
//             </div>
//             {/* Banner */}

//             {talent.bannerUrl && (
//               <img
//                 src={talent.bannerUrl}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//             )}

//             {/* Fields */}

//             <div className="space-y-1 mb-4">
//               {talent.feilds?.slice(0, 3).map((f) => (
//                 <p key={f._id} className="text-sm">
//                   <span className="font-semibold">{f.lable}:</span> {f.value}
//                 </p>
//               ))}
//             </div>

//             {/* Exam */}

//             {talent.examDetails?.map((exam) => (
//               <div key={exam._id} className="text-sm mb-2">
//                 <p>
//                   📚 Class: <b>{exam.className}</b>
//                 </p>

//                 <p>📅 Date: {new Date(exam.date).toLocaleDateString()}</p>

//                 <p>🏫 Venue: {exam.vanue}</p>
//               </div>
//             ))}

//             {/* Contacts */}

//             <div className="mt-3 border-t pt-3">
//               <p className="font-semibold mb-1">Contacts</p>

//               {talent.contacts?.map((c) => (
//                 <p key={c._id} className="text-sm">
//                   {c.name} -{c.dasignation} - {c.mobile}
//                 </p>
//               ))}
//             </div>
//             {/* Rules */}

//             {talent.rules?.length > 0 && (
//               <div className="mt-3 border-t pt-3">
//                 <p className="font-semibold mb-1">Rules</p>

//                 {talent.rules.map((rule) => (
//                   <p key={rule._id} className="text-sm">
//                     <span className="font-semibold">{rule.name}</span>{" "}
//                     {rule.rule}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TalentManagement;

import React, { useEffect, useState } from "react";
import TalentForm from "../../components/TalentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createTalent,
  getTalents,
} from "../../store/features/auth/talentSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  Calendar,
  MapPin,
  Phone,
  BookOpen,
  ChevronRight,
  Trophy,
  Clock,
  Eye,
} from "lucide-react";

const TalentManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { talents, loading } = useSelector((state) => state.talents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTalents());
  }, [dispatch]);

  const handleAddTalent = async (formData) => {
    const res = await dispatch(createTalent(formData));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getTalents());
      setShowModal(false);
    }
  };

  // Filter talents based on search
  const filteredTalents = talents?.filter(
    (talent) =>
      talent.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.feilds?.some((field) =>
        field.value?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="bg-gray-50 p-6 rounded-2xl relative min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Talent Hunt Management
              </h2>
              <p className="text-sm text-gray-500">
                মোট {talents?.length || 0} টি প্রতিযোগিতা
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-64"
              />
            </div>

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <Plus size={18} />
              <span>Add Talent Hunt</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-h-[90vh] overflow-y-auto w-[900px] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create Talent Hunt
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <TalentForm handleAddTalent={handleAddTalent} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Talent List */}
      {!loading && (
        <>
          {filteredTalents?.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTalents.map((talent) => (
                <motion.div
                  key={talent._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Banner Section */}
                  <div className="relative h-48 bg-gray-100">
                    {talent.bannerUrl ? (
                      <img
                        src={talent.bannerUrl}
                        alt={talent.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-16 h-16 text-gray-300" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          new Date(talent.examDetails?.[0]?.date) > new Date()
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {new Date(talent.examDetails?.[0]?.date) > new Date()
                          ? "Active"
                          : "Completed"}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">
                        {talent.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Fields Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {talent.feilds?.slice(0, 4).map((field) => (
                        <div
                          key={field._id}
                          className="bg-gray-50 rounded-lg p-2"
                        >
                          <p className="text-xs text-gray-500">{field.lable}</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {field.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Exam Details */}
                    {talent.examDetails?.map((exam) => (
                      <div
                        key={exam._id}
                        className="bg-gray-50 rounded-lg p-3 mb-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen size={16} className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Exam Details
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-gray-600">
                              {new Date(exam.date).toLocaleDateString("bn-BD", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-gray-600">{exam.vanue}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Contacts */}
                    {talent.contacts?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Contact Persons
                        </p>
                        <div className="space-y-2">
                          {talent.contacts.map((contact) => (
                            <div
                              key={contact._id}
                              className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg"
                            >
                              <Phone
                                size={14}
                                className="text-gray-400 flex-shrink-0"
                              />
                              <span className="text-gray-600 truncate">
                                {contact.name} - {contact.dasignation} -{" "}
                                {contact.mobile}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rules */}
                    {talent.rules?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Rules
                        </p>
                        <div className="space-y-1">
                          {talent.rules.slice(0, 2).map((rule) => (
                            <div
                              key={rule._id}
                              className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                            >
                              <span className="font-semibold">
                                {rule.name}:
                              </span>{" "}
                              {rule.rule}
                            </div>
                          ))}
                          {talent.rules.length > 2 && (
                            <p className="text-xs text-gray-500 mt-1">
                              +{talent.rules.length - 2} more rules
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users size={16} />
                          <span>{talent.applicantsCount || 0} Applicants</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{talent.feilds?.length || 0} Fields</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(talent._id)}
                        className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                      >
                        <Eye size={16} />
                        <span>View Students</span>
                        <ChevronRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
                <Trophy className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "No results found" : "No talent hunts yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? `No matches for "${searchTerm}"`
                  : "Create your first talent hunt competition"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus size={18} />
                  <span>Create Talent Hunt</span>
                </button>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default TalentManagement;
