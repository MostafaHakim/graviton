// import React, { useEffect, useState, forwardRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { getChapterById } from "../../store/features/auth/chapterSlice";
// import HTMLFlipBook from "react-pageflip";
// import {
//   ArrowLeft,
//   Download,
//   ExternalLink,
//   FileText,
//   BookOpen,
//   Layers,
//   Maximize2,
// } from "lucide-react";
// import { getPaperByChapterId } from "../../store/features/auth/paperSlice";

// const getCloudinaryPageUrl = (pdfUrl, pageNumber, format = "jpg") => {
//   if (!pdfUrl) return "";
//   return pdfUrl
//     .replace("/upload/", `/upload/pg_${pageNumber}/`)
//     .replace(/\.pdf$/, `.${format}`);
// };

// const CloudinaryPage = forwardRef(({ url, pageNumber }, ref) => (
//   <div
//     ref={ref}
//     className="bg-white shadow-xl flex justify-center items-center overflow-hidden border border-gray-200"
//   >
//     <img
//       src={url}
//       alt={`Page ${pageNumber}`}
//       className="w-full h-full object-contain pointer-events-none select-none"
//       loading="lazy"
//       onError={(e) => {
//         e.target.src =
//           "https://via.placeholder.com/450x650?text=Page+Not+Available";
//       }}
//     />
//   </div>
// ));

// const Chapter = () => {
//   const { chapterId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { chapter, loading } = useSelector((state) => state.chapters);
//   const { papers } = useSelector((state) => state.papers);

//   const [viewMode, setViewMode] = useState("flip");

//   useEffect(() => {
//     if (chapterId) {
//       dispatch(getChapterById(chapterId));
//       dispatch(getPaperByChapterId(chapterId));
//     }
//   }, [chapterId, dispatch]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-xl font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (!chapter) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Chapter not found</p>
//       </div>
//     );
//   }

//   const pageCount = chapter?.content?.pageCount || 1;

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 font-kalpurush">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
//       >
//         <ArrowLeft size={20} />
//         Back
//       </button>

//       <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
//           <h1 className="text-4xl font-black">{chapter.title}</h1>
//           {chapter.content?.name && (
//             <p className="text-blue-100 text-lg mt-2">{chapter.content.name}</p>
//           )}

//           {chapter.content?.pdfUrl && (
//             <div className="flex gap-4 mt-6">
//               <a
//                 href={chapter.content.pdfUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2"
//               >
//                 <ExternalLink size={18} />
//                 View Original
//               </a>
//               <a
//                 href={chapter.content.pdfUrl}
//                 download
//                 className="bg-white text-blue-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold"
//               >
//                 <Download size={18} />
//                 Download
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="p-8 space-y-12">
//           {/* Description */}
//           {chapter.content?.description && (
//             <div>
//               <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
//                 <FileText className="text-blue-600" />
//                 Chapter Overview
//               </h3>
//               <p className="bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500">
//                 {chapter.content.description}
//               </p>
//             </div>
//           )}

//           {/* Image */}
//           {chapter.content?.imageUrl && (
//             <div>
//               <h4 className="text-xl font-bold flex items-center gap-2 mb-4">
//                 <Maximize2 size={20} className="text-blue-600" />
//                 Visual Material
//               </h4>
//               <img
//                 src={chapter.content.imageUrl}
//                 alt={chapter.title}
//                 className="rounded-2xl shadow-lg"
//               />
//             </div>
//           )}

//           {/* PDF Section */}
//           {chapter.content?.pdfUrl && (
//             <div className="space-y-8">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-3xl font-black flex items-center gap-3">
//                   <BookOpen size={32} className="text-blue-600" />
//                   Study Material
//                 </h2>

//                 <div className="flex bg-gray-100 p-1 rounded-xl">
//                   <button
//                     onClick={() => setViewMode("flip")}
//                     className={`px-4 py-2 rounded-lg ${
//                       viewMode === "flip" ? "bg-white shadow text-blue-600" : ""
//                     }`}
//                   >
//                     <Layers size={16} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("scroll")}
//                     className={`px-4 py-2 rounded-lg ${
//                       viewMode === "scroll"
//                         ? "bg-white shadow text-blue-600"
//                         : ""
//                     }`}
//                   >
//                     <FileText size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-center bg-gray-100 p-8 rounded-3xl">
//                 {viewMode === "flip" ? (
//                   <HTMLFlipBook
//                     key={chapter?._id}
//                     width={450}
//                     height={650}
//                     size="stretch"
//                     minWidth={315}
//                     maxWidth={500}
//                     minHeight={400}
//                     maxHeight={750}
//                     showCover
//                   >
//                     {Array.from({ length: pageCount }).map((_, index) => (
//                       <CloudinaryPage
//                         key={index}
//                         pageNumber={index + 1}
//                         url={getCloudinaryPageUrl(
//                           chapter.content.pdfUrl,
//                           index + 1,
//                         )}
//                       />
//                     ))}
//                   </HTMLFlipBook>
//                 ) : (
//                   <div className="space-y-6 w-full max-w-4xl">
//                     {Array.from({ length: pageCount }).map((_, index) => (
//                       <img
//                         key={index}
//                         src={getCloudinaryPageUrl(
//                           chapter.content.pdfUrl,
//                           index + 1,
//                         )}
//                         alt={`Page ${index + 1}`}
//                         className="rounded-2xl shadow-lg w-full"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="p-8 flex flex-col space-y-4">
//           <h2 className="text-2xl">
//             এই অধ্যায়ের জন্য পরিক্ষা সমূহ, অংশগ্রহন করতে পরিক্ষা নির্বাচন
//             করুন...
//           </h2>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//             {papers &&
//               papers.length > 0 &&
//               papers.map((paper) => (
//                 <Link
//                   to={`${paper._id}/guidline`}
//                   key={paper._id}
//                   className="px-4 py-2 rounded-full bg-linear-to-bl from-green-300 to-green-700 text-white text-center"
//                 >
//                   <h2>{paper.title}</h2>
//                 </Link>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chapter;

import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getChapterById } from "../../store/features/auth/chapterSlice";
import HTMLFlipBook from "react-pageflip";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  BookOpen,
  Layers,
  Maximize2,
  ChevronLeft,
  BookMarked,
  Clock,
  Award,
  HelpCircle,
  PlayCircle,
  Grid3x3,
  List,
  Eye,
  EyeOff,
} from "lucide-react";
import { getPaperByChapterId } from "../../store/features/auth/paperSlice";
import { motion, AnimatePresence } from "framer-motion";

const getCloudinaryPageUrl = (pdfUrl, pageNumber, format = "jpg") => {
  if (!pdfUrl) return "";
  return pdfUrl
    .replace("/upload/", `/upload/pg_${pageNumber}/`)
    .replace(/\.pdf$/, `.${format}`);
};

const CloudinaryPage = forwardRef(({ url, pageNumber, isActive }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white shadow-2xl flex justify-center items-center overflow-hidden rounded-2xl border border-gray-200/50 relative group"
  >
    <img
      src={url}
      alt={`Page ${pageNumber}`}
      className="w-full h-full object-contain pointer-events-none select-none"
      loading="lazy"
      onError={(e) => {
        e.target.src =
          "https://via.placeholder.com/450x650?text=Page+Not+Available";
      }}
    />

    {/* Page Number Overlay */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
    >
      Page {pageNumber}
    </motion.div>
  </motion.div>
));

const Chapter = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chapter, loading } = useSelector((state) => state.chapters);
  const { papers } = useSelector((state) => state.papers);

  const [viewMode, setViewMode] = useState("flip");
  const [showOverview, setShowOverview] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterById(chapterId));
      dispatch(getPaperByChapterId(chapterId));
    }
  }, [chapterId, dispatch]);

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#3BD480] blur-xl opacity-50 rounded-full" />
            <BookOpen className="relative w-16 h-16 text-[#3BD480]" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
          >
            <HelpCircle className="w-20 h-20 text-[#3BD480] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Chapter Not Found
            </h2>
            <p className="text-white/70 mb-6">
              The chapter you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#3BD480] text-[#17202F] px-6 py-3 rounded-xl font-bold hover:bg-[#2da866] transition-all"
            >
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const pageCount = chapter?.content?.pageCount || 1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid)" />
        </svg>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3BD480]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Navigation Bar */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white hover:bg-white/20 transition-all border border-white/20"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowOverview(!showOverview)}
                  className="bg-white/10 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-white/20 transition-all border border-white/20"
                >
                  {showOverview ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden"
            >
              {/* Chapter Header */}
              <div className="relative overflow-hidden">
                {/* Decorative Header Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3BD480]/20 to-transparent" />

                <div className="relative z-10 p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="p-3 bg-[#3BD480]/20 rounded-2xl"
                        >
                          <BookMarked className="w-8 h-8 text-[#3BD480]" />
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-kalpurush">
                          {chapter.title}
                        </h1>
                      </div>

                      {chapter.content?.name && (
                        <p className="text-white/80 text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#3BD480]" />
                          {chapter.content.name}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {chapter.content?.pdfUrl && (
                      <div className="flex flex-wrap gap-3">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={chapter.content.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl flex items-center gap-2 text-white hover:bg-white/30 transition-all border border-white/30"
                        >
                          <ExternalLink size={18} />
                          <span>View Original</span>
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={chapter.content.pdfUrl}
                          download
                          className="bg-[#3BD480] text-[#17202F] px-5 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-[#2da866] transition-all shadow-lg shadow-[#3BD480]/30"
                        >
                          <Download size={18} />
                          <span>Download PDF</span>
                        </motion.a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Overview Section - Collapsible */}
              <AnimatePresence>
                {showOverview &&
                  (chapter.content?.description ||
                    chapter.content?.imageUrl) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/20"
                    >
                      <div className="p-8 space-y-6">
                        {/* Description */}
                        {chapter.content?.description && (
                          <motion.div
                            variants={itemVariants}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                          >
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                              <PlayCircle className="text-[#3BD480]" />
                              Chapter Overview
                            </h3>
                            <p className="text-white/80 leading-relaxed">
                              {chapter.content.description}
                            </p>
                          </motion.div>
                        )}

                        {/* Image */}
                        {chapter.content?.imageUrl && (
                          <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                              <Maximize2 className="text-[#3BD480]" />
                              Visual Material
                            </h3>
                            <div className="relative group">
                              <img
                                src={chapter.content.imageUrl}
                                alt={chapter.title}
                                className="rounded-2xl shadow-2xl w-full max-h-96 object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

              {/* PDF Section */}
              {chapter.content?.pdfUrl && (
                <motion.div
                  variants={itemVariants}
                  className="border-t border-white/20"
                >
                  <div className="p-8 space-y-6">
                    {/* Section Header with Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <BookOpen className="text-[#3BD480]" />
                        Study Material
                      </h2>

                      <div className="flex bg-white/10 backdrop-blur-sm p-1 rounded-xl border border-white/20">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setViewMode("flip")}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                            viewMode === "flip"
                              ? "bg-[#3BD480] text-[#17202F] shadow-lg"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <Layers size={16} />
                          <span className="hidden sm:inline">Flip Book</span>
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setViewMode("scroll")}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                            viewMode === "scroll"
                              ? "bg-[#3BD480] text-[#17202F] shadow-lg"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <Grid3x3 size={16} />
                          <span className="hidden sm:inline">Grid View</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* PDF Viewer */}
                    <motion.div
                      layout
                      className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
                    >
                      {viewMode === "flip" ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-center overflow-x-auto"
                        >
                          <HTMLFlipBook
                            key={chapter?._id}
                            width={450}
                            height={650}
                            size="stretch"
                            minWidth={315}
                            maxWidth={500}
                            minHeight={400}
                            maxHeight={750}
                            showCover
                            onFlip={(e) => setCurrentPage(e.data)}
                            className="flip-book"
                          >
                            {Array.from({ length: pageCount }).map(
                              (_, index) => (
                                <CloudinaryPage
                                  key={index}
                                  pageNumber={index + 1}
                                  isActive={currentPage === index + 1}
                                  url={getCloudinaryPageUrl(
                                    chapter.content.pdfUrl,
                                    index + 1,
                                  )}
                                />
                              ),
                            )}
                          </HTMLFlipBook>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto custom-scrollbar p-2"
                        >
                          {Array.from({ length: pageCount }).map((_, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                              className="relative group"
                            >
                              <img
                                src={getCloudinaryPageUrl(
                                  chapter.content.pdfUrl,
                                  index + 1,
                                )}
                                alt={`Page ${index + 1}`}
                                className="rounded-xl shadow-lg w-full border border-white/20"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                                Page {index + 1}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Page Navigation Info */}
                    {viewMode === "flip" && (
                      <div className="flex justify-center">
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/20">
                          Page{" "}
                          <span className="font-bold text-[#3BD480]">
                            {currentPage}
                          </span>{" "}
                          of {pageCount}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Exams Section */}
              <motion.div
                variants={itemVariants}
                className="border-t border-white/20 p-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#3BD480]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      অধ্যায় ভিত্তিক পরীক্ষা
                    </h2>
                  </div>

                  <p className="text-white/80 text-lg">
                    এই অধ্যায়ের জন্য পরীক্ষা সমূহ, অংশগ্রহন করতে পরীক্ষা
                    নির্বাচন করুন...
                  </p>

                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {papers && papers.length > 0 ? (
                      papers.map((paper, index) => (
                        <motion.div
                          key={paper._id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link to={`${paper._id}/guidline`} className="block">
                            <div className="relative group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all overflow-hidden">
                              {/* Hover Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#3BD480]/0 to-[#3BD480]/0 group-hover:from-[#3BD480]/20 group-hover:to-transparent"
                                transition={{ duration: 0.3 }}
                              />

                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-[#3BD480]/20 rounded-lg">
                                    <Award className="w-5 h-5 text-[#3BD480]" />
                                  </div>
                                  <span className="text-white/50 text-sm">
                                    Exam {index + 1}
                                  </span>
                                </div>

                                <h3 className="text-white font-bold text-lg mb-2">
                                  {paper.title}
                                </h3>

                                <div className="flex items-center justify-between mt-4">
                                  <span className="text-white/60 text-sm">
                                    Click to start
                                  </span>
                                  <Clock className="w-4 h-4 text-[#3BD480]" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        variants={itemVariants}
                        className="col-span-full text-center py-12"
                      >
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                          <HelpCircle className="w-16 h-16 text-[#3BD480] mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">
                            কোনো পরীক্ষা পাওয়া যায়নি
                          </h3>
                          <p className="text-white/70">
                            এই অধ্যায়ের জন্য এখনও কোনো পরীক্ষা যোগ করা হয়নি।
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 212, 128, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 212, 128, 0.5);
        }

        .flip-book {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Chapter;
