// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { getSingleNotice } from "../store/features/auth/clubSlice";
// import {
//   Calendar,
//   Clock,
//   User,
//   ArrowLeft,
//   Share2,
//   Download,
//   Eye,
//   Heart,
//   MessageSquare,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Zap,
//   FileText,
//   Image as ImageIcon,
//   Video,
//   ExternalLink,
// } from "lucide-react";

// const SingleEvent = () => {
//   const { noticeId, id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { notice, loading } = useSelector((state) => state.clubs);

//   useEffect(() => {
//     if (noticeId) {
//       dispatch(getSingleNotice(noticeId));
//     }
//   }, [noticeId, dispatch]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading notice...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!notice) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md"
//         >
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
//             <FileText className="w-10 h-10 text-gray-400" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">
//             Notice Not Found
//           </h3>
//           <p className="text-gray-500 mb-6">
//             The notice you're looking for doesn't exist or has been removed.
//           </p>
//           <Link
//             to={`/club/${id}`}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
//           >
//             <ArrowLeft size={18} />
//             <span>Back to Club</span>
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft size={20} className="text-gray-600" />
//               </motion.button>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">
//                   Notice Details
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Viewing notice information
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Share2 size={18} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Download size={18} />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
//         >
//           {/* Hero Section */}
//           <div className="relative h-64 md:h-96 bg-gray-900">
//             {notice.imageUrl || notice.videoUrl ? (
//               <>
//                 {notice.imageUrl && (
//                   <img
//                     src={notice.imageUrl}
//                     alt={notice.title}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//                 {notice.videoUrl && (
//                   <video
//                     src={notice.videoUrl}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//                 {/* Overlay Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <FileText className="w-24 h-24 text-gray-700" />
//               </div>
//             )}

//             {/* Media Type Badge */}
//             {(notice.imageUrl || notice.videoUrl) && (
//               <div className="absolute top-6 right-6">
//                 <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2">
//                   {notice.imageUrl ? (
//                     <>
//                       <ImageIcon size={16} />
//                       <span>Image</span>
//                     </>
//                   ) : (
//                     <>
//                       <Video size={16} />
//                       <span>Video</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Title Overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
//               <div className="flex flex-wrap gap-3 mb-3">
//                 <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
//                   <Calendar size={14} />
//                   {new Date(notice.createdAt).toLocaleDateString("en-US", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </span>
//                 <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
//                   <Clock size={14} />
//                   {new Date(notice.createdAt).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//                 <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
//                   <User size={14} />
//                   Admin
//                 </span>
//               </div>
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//                 {notice.title}
//               </h1>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-6 md:p-8">
//             <motion.div variants={itemVariants} className="space-y-6">
//               {/* Subtitle */}
//               {notice.subtitle && (
//                 <div className="border-l-4 border-gray-900 pl-4">
//                   <p className="text-lg text-gray-600 italic">
//                     {notice.subtitle}
//                   </p>
//                 </div>
//               )}

//               {/* Description */}
//               {notice.discription && (
//                 <div className="prose max-w-none">
//                   <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
//                     {notice.discription}
//                   </p>
//                 </div>
//               )}

//               {/* Metadata Grid */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-gray-900">1</div>
//                   <div className="text-sm text-gray-500">Views</div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-gray-900">0</div>
//                   <div className="text-sm text-gray-500">Likes</div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-gray-900">0</div>
//                   <div className="text-sm text-gray-500">Comments</div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-gray-900">—</div>
//                   <div className="text-sm text-gray-500">Shares</div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-3 pt-4">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <Heart size={18} />
//                   <span>Like</span>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <MessageSquare size={18} />
//                   <span>Comment</span>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <Share2 size={18} />
//                   <span>Share</span>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <Download size={18} />
//                   <span>Download</span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>

//           {/* Footer Navigation */}
//           <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <motion.button
//                 whileHover={{ x: -4 }}
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
//               >
//                 <ChevronLeft size={18} />
//                 <span>Back to Club</span>
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                 className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-md w-full sm:w-auto justify-center"
//               >
//                 <span>Back to Top</span>
//                 <ChevronRight size={18} className="rotate-90" />
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Related Notices Section (Optional) */}
//         {notice.relatedNotices && notice.relatedNotices.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mt-8"
//           >
//             <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <BookOpen size={20} className="text-gray-500" />
//               Related Notices
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {notice.relatedNotices.map((related, index) => (
//                 <Link
//                   key={index}
//                   to={`/club/${id}/${related._id}`}
//                   className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group"
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors">
//                       <FileText className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
//                         {related.title}
//                       </h3>
//                       <p className="text-xs text-gray-500 line-clamp-2">
//                         {related.discription}
//                       </p>
//                     </div>
//                     <ChevronRight size={16} className="text-gray-400" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleEvent;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getSingleNotice } from "../store/features/auth/clubSlice";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Download,
  Eye,
  Heart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

const SingleEvent = () => {
  const { noticeId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notice, loading } = useSelector((state) => state.clubs);

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (noticeId) {
      dispatch(getSingleNotice(noticeId));
    }
  }, [noticeId, dispatch]);

  // Video control functions
  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!progressBarRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    const newTime = (percentage / 100) * duration;

    if (videoRef.current && !isNaN(newTime)) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h3>
          <p className="text-gray-500 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to={`/club/${id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft size={18} />
            <span>Back to Club</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Event Details
                </h1>
                <p className="text-sm text-gray-500">
                  Viewing event information
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Hero Section with Video Player */}
          <div
            ref={videoContainerRef}
            className="relative bg-gray-900 overflow-hidden group"
            style={{ minHeight: notice.videoUrl ? "auto" : "400px" }}
            onMouseMove={showControlsTemporarily}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {notice.imageUrl && !notice.videoUrl && (
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            )}

            {notice.videoUrl && (
              <div className="relative w-full bg-black">
                <video
                  ref={videoRef}
                  src={notice.videoUrl}
                  className="w-full max-h-[500px] object-contain mx-auto"
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={(e) => {
                    console.error("Video error:", e);
                    setVideoError(true);
                  }}
                  playsInline
                />

                {/* Custom Video Controls */}
                {!videoError && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-30 ${
                      showControls || !isPlaying
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Progress Bar */}
                    <div
                      ref={progressBarRef}
                      className="w-full h-1.5 bg-gray-600 rounded-full mb-3 cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-blue-500 rounded-full relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <button
                          onClick={togglePlay}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer z-40"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        {/* Volume Control */}
                        <button
                          onClick={toggleMute}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer z-40"
                        >
                          {isMuted ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </button>

                        {/* Time Display */}
                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Fullscreen Button */}
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer z-40"
                        >
                          {isFullscreen ? (
                            <Minimize size={20} />
                          ) : (
                            <Maximize size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Error Fallback */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                    <div className="text-center p-6">
                      <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-white text-lg mb-2">
                        Video cannot be played
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        URL: {notice.videoUrl}
                      </p>
                      <a
                        href={notice.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Open video in new tab
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Overlay Gradient - This is just visual, not interactive */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none"></div>

            {/* Media Type Badge - Not interactive */}
            {(notice.imageUrl || notice.videoUrl) && (
              <div className="absolute top-6 right-6 pointer-events-none">
                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2">
                  {notice.imageUrl && !notice.videoUrl ? (
                    <>
                      <ImageIcon size={16} />
                      <span>Image</span>
                    </>
                  ) : notice.videoUrl ? (
                    <>
                      <Video size={16} />
                      <span>Video</span>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {/* Title Overlay - Fixed z-index and pointer-events */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(notice.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(notice.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                  <User size={14} />
                  Admin
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {notice.title}
              </h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Subtitle */}
              {notice.subtitle && (
                <div className="border-l-4 border-gray-900 pl-4">
                  <p className="text-lg text-gray-600 italic">
                    {notice.subtitle}
                  </p>
                </div>
              )}

              {/* Description */}
              {notice.discription && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                    {notice.discription}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer Navigation */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
              >
                <ChevronLeft size={18} />
                <span>Back to Club</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-md w-full sm:w-auto justify-center"
              >
                <span>Back to Top</span>
                <ChevronRight size={18} className="rotate-90" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleEvent;
