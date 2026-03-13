// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import {
//   createNotice,
//   getClubById,
//   getClubNotice,
// } from "../../store/features/auth/clubSlice";
// import ClubNoticeForm from "../../components/ClubNoticeForm";

// const SingleClubManagement = () => {
//   const { clubId } = useParams();
//   const { club, notices, loading } = useSelector((state) => state.clubs);
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!clubId) return;
//     dispatch(getClubById(clubId));
//     dispatch(getClubNotice(clubId));
//   }, [clubId, dispatch]);

//   const handeleAddNotice = async (formData) => {
//     const res = await dispatch(createNotice(formData));

//     if (res.meta.requestStatus === "fulfilled") {
//       await dispatch(getClubNotice(clubId));
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       {/* Club Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">{club?.name}</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
//         >
//           Add Event
//         </button>
//       </div>

//       {/* Notices List */}
//       <div className="space-y-4">
//         <h2>All Events</h2>
//         {notices?.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {notices.map((n) => (
//               <Link
//                 to={n._id}
//                 key={n._id}
//                 className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition font-kalpurush"
//               >
//                 {n.imageUrl && (
//                   <img
//                     src={n.imageUrl}
//                     alt={n.title}
//                     className="w-full h-48 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 {n.videoUrl && (
//                   <video
//                     src={n.videoUrl}
//                     controls
//                     className="w-full h-48 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 <h3 className="text-xl font-semibold">{n.title}</h3>
//                 {n.subtitle && <p className="text-gray-500">{n.subtitle}</p>}
//                 <p className="text-gray-700 mt-2 line-clamp-4">
//                   {n.discription}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No notices found.</p>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
//             >
//               ✖
//             </button>
//             <ClubNoticeForm
//               handeleAddNotice={handeleAddNotice}
//               clubId={clubId}
//               loading={loading}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleClubManagement;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  createNotice,
  getClubById,
  getClubNotice,
} from "../../store/features/auth/clubSlice";
import ClubNoticeForm from "../../components/ClubNoticeForm";
import {
  Plus,
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  Edit3,
  Trash2,
  MoreVertical,
  Image as ImageIcon,
  Video,
  FileText,
  Eye,
  ChevronRight,
  Zap,
  Trophy,
} from "lucide-react";

const SingleClubManagement = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { club, notices, loading } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (!clubId) return;
    dispatch(getClubById(clubId));
    dispatch(getClubNotice(clubId));
  }, [clubId, dispatch]);

  const handeleAddNotice = async (formData) => {
    const res = await dispatch(createNotice(formData));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getClubNotice(clubId));
      setShowModal(false);
    }
  };

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

  if (loading && !club) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading club details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/clubs")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </motion.button>

              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {club?.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {notices?.length || 0} Events
                  </span>
                  {club?.tech && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md">
                        {club.tech}
                      </span>
                    </>
                  )}
                </div>
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
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Add Event Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md"
              >
                <Plus size={18} />
                <span className="font-medium">Add Event</span>
              </motion.button>
            </div>
          </div>

          {/* Club Description */}
          {club?.activity && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600">{club.activity}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Events Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            All Events
          </h2>

          {notices?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {notices.map((notice, index) => (
                <motion.div
                  key={notice._id || index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={
                    viewMode === "grid"
                      ? "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      : "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                  }
                  onClick={() =>
                    navigate(`/admin/clubs/${clubId}/${notice._id}`)
                  }
                >
                  {viewMode === "grid" ? (
                    /* Grid View */
                    <div className="relative">
                      {/* Media Preview */}
                      <div className="relative h-48 bg-gray-100">
                        {notice.imageUrl ? (
                          <img
                            src={notice.imageUrl}
                            alt={notice.title}
                            className="w-full h-full object-cover"
                          />
                        ) : notice.videoUrl ? (
                          <video
                            src={notice.videoUrl}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}

                        {/* Media Type Badge */}
                        <div className="absolute top-3 right-3">
                          {notice.imageUrl ? (
                            <div className="p-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                              <ImageIcon size={14} className="text-white" />
                            </div>
                          ) : notice.videoUrl ? (
                            <div className="p-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                              <Video size={14} className="text-white" />
                            </div>
                          ) : null}
                        </div>

                        {/* More Options Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle more options
                          }}
                          className="absolute top-3 left-3 p-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-gray-900 transition-colors"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                          {notice.title}
                        </h3>

                        {notice.subtitle && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                            {notice.subtitle}
                          </p>
                        )}

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {notice.discription}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* List View */
                    <div className="flex items-center gap-4">
                      {/* Media Thumbnail */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {notice.imageUrl ? (
                          <img
                            src={notice.imageUrl}
                            alt={notice.title}
                            className="w-full h-full object-cover"
                          />
                        ) : notice.videoUrl ? (
                          <video
                            src={notice.videoUrl}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {notice.title}
                        </h3>
                        {notice.subtitle && (
                          <p className="text-sm text-gray-500 mb-1 truncate">
                            {notice.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {notice.discription}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {new Date(notice.createdAt).toLocaleDateString()}
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
              className="text-center py-16 bg-white rounded-xl border border-gray-200"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Get started by creating your first event for {club?.name}.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
              >
                <Plus size={20} />
                <span>Create First Event</span>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Stats Section */}
        {notices?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {notices.length}
              </div>
              <div className="text-sm text-gray-500">Total Events</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {notices.filter((n) => n.imageUrl).length}
              </div>
              <div className="text-sm text-gray-500">With Images</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {notices.filter((n) => n.videoUrl).length}
              </div>
              <div className="text-sm text-gray-500">With Videos</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">Last Updated</div>
            </div>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">
                    Add New Event
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <ClubNoticeForm
                    handeleAddNotice={handeleAddNotice}
                    clubId={clubId}
                    loading={loading}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleClubManagement;
