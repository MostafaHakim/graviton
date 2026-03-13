// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ClubForm from "../../components/ClubForm";
// import { useDispatch, useSelector } from "react-redux";
// import { createClub, getClubs } from "../../store/features/auth/clubSlice";
// import { Link } from "react-router-dom";

// const ClubManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { clubs, loading, error } = useSelector((state) => state.clubs);
//   const dispatch = useDispatch();

//   // Fetch clubs
//   useEffect(() => {
//     dispatch(getClubs());
//   }, [dispatch]);

//   const handleAddClub = async (formData) => {
//     const res = await dispatch(createClub(formData));
//     console.log(res);
//     if (res.meta.requestStatus === "fulfilled") {
//       await dispatch(getClubs());
//       setShowModal(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading clubs...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-4 ">
//       <div className="flex flex-row items-center justify-between">
//         <h1 className="text-3xl font-bold mb-6 ">All Clubs</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Club
//         </button>
//       </div>

//       {clubs?.length === 0 && (
//         <p className="text-center text-gray-500">No clubs found.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {clubs?.length >= 0 &&
//           clubs.map((club) => (
//             <Link
//               to={club._id}
//               key={club._id}
//               className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
//             >
//               <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
//               <p className="text-gray-600 mb-2">
//                 <strong>Technology:</strong> {club.tech || "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Activity:</strong> {club.activity || "N/A"}
//               </p>

//               <div className="mb-2">
//                 <strong>All Events:</strong>
//                 {club.notice && club.notice.length > 0 ? (
//                   <ul className="list-disc ml-5 mt-1 text-gray-700">
//                     {club.notice.map((n) => (
//                       <li key={n._id}>{n.title || n._id}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-400 ml-1">No Events</p>
//                 )}
//               </div>
//             </Link>
//           ))}
//       </div>
//       {showModal && (
//         <div className="absolute bg-black/50 top-0 left-0 bottom-0 right-0">
//           <ClubForm handleAddClub={handleAddClub} loading={loading} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClubManagement;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { createClub, getClubs } from "../../store/features/auth/clubSlice";
import ClubForm from "../../components/ClubForm";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Grid,
  Layers,
  ChevronRight,
  Users,
  Calendar,
  MapPin,
  MoreVertical,
  Edit3,
  Trash2,
  Trophy,
  Activity,
  Zap,
} from "lucide-react";

const ClubManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { clubs, loading, error } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch clubs
  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  const handleAddClub = async (formData) => {
    const res = await dispatch(createClub(formData));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getClubs());
      setShowModal(false);
    }
  };

  // Filter clubs based on search
  const filteredClubs = clubs?.filter(
    (club) =>
      club.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.tech?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.activity?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clubs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <Zap className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Club Management
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Total {filteredClubs?.length || 0} clubs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Layers size={18} />
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md"
              >
                <Plus size={18} />
                <span className="font-medium">Add Club</span>
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search clubs by name, technology, or activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredClubs?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredClubs.map((club, index) => (
              <motion.div
                key={club._id || index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={
                  viewMode === "grid"
                    ? "bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    : "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                }
                onClick={() => navigate(`/admin/clubs/${club._id}`)}
              >
                {viewMode === "grid" ? (
                  /* Grid View */
                  <div className="p-6">
                    {/* Club Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <Users className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle more options
                        }}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    {/* Club Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {club.name}
                    </h3>

                    {/* Technology & Activity */}
                    <div className="space-y-2 mb-4">
                      {club.tech && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                            {club.tech}
                          </span>
                        </div>
                      )}
                      {club.activity && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          <Activity
                            size={14}
                            className="inline mr-1 text-gray-400"
                          />
                          {club.activity}
                        </p>
                      )}
                    </div>

                    {/* Events Section */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Upcoming Events
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {club.notice?.length || 0} events
                        </span>
                      </div>

                      {club.notice && club.notice.length > 0 ? (
                        <div className="space-y-2">
                          {club.notice.slice(0, 2).map((notice, idx) => (
                            <div
                              key={notice._id || idx}
                              className="text-xs text-gray-500 flex items-start gap-1"
                            >
                              <Calendar
                                size={12}
                                className="mt-0.5 flex-shrink-0"
                              />
                              <span className="line-clamp-1">
                                {notice.title || "Event"}
                              </span>
                            </div>
                          ))}
                          {club.notice.length > 2 && (
                            <p className="text-xs text-gray-400">
                              +{club.notice.length - 2} more events
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400">
                          No events scheduled
                        </p>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{club.notice?.length || 0} events</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {club.tech && (
                          <>
                            <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                              {club.tech}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          </>
                        )}
                        <span className="truncate">
                          {club.activity || "No activity"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {club.notice?.length || 0} events
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-3xl mb-6">
              <Trophy className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm ? "No clubs found" : "No clubs yet"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchTerm
                ? `No clubs match "${searchTerm}". Try a different search term.`
                : "Get started by creating your first club."}
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
              >
                <Plus size={20} />
                <span>Create First Club</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Club Stats */}
        {filteredClubs?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {filteredClubs.length}
              </div>
              <div className="text-sm text-gray-500">Total Clubs</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {filteredClubs.reduce(
                  (acc, club) => acc + (club.notice?.length || 0),
                  0,
                )}
              </div>
              <div className="text-sm text-gray-500">Total Events</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {filteredClubs.filter((club) => club.tech).length}
              </div>
              <div className="text-sm text-gray-500">With Technology</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {filteredClubs.filter((club) => club.activity).length}
              </div>
              <div className="text-sm text-gray-500">Active Clubs</div>
            </div>
          </div>
        )}
      </div>

      {/* Add Club Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl mx-4"
            >
              <ClubForm
                handleAddClub={handleAddClub}
                loading={loading}
                onClose={() => setShowModal(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClubManagement;
