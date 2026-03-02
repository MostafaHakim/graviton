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
//   Loader2,
//   Maximize2,
//   BookOpen,
//   Layers,
//   Trash2,
// } from "lucide-react";
// import {
//   deleteTest,
//   getTestByChapterId,
// } from "../../store/features/auth/testSlice";
// import DeleteModal from "../../components/DeleteModal";

// // Helper to generate Cloudinary page image URL using paged media transformations
// const getCloudinaryPageUrl = (pdfUrl, pageNumber, format = "jpg") => {
//   if (!pdfUrl) return "";
//   // Insert /pg_X/ transformation and change extension to .jpg
//   return pdfUrl
//     .replace("/upload/", `/upload/pg_${pageNumber}/`)
//     .replace(/\.pdf$/, `.${format}`);
// };

// // Simplified CloudinaryPage component for the flipbook
// const CloudinaryPage = forwardRef(({ url, pageNumber }, ref) => (
//   <div
//     className="bg-white shadow-xl flex justify-center items-center overflow-hidden border border-gray-200"
//     ref={ref}
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

// const ChapterManagement = () => {
//   const { chapterId, classId, subjectId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { tests, loading } = useSelector((state) => state.tests);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   useEffect(() => {
//     if (!chapterId) return;
//     dispatch(getTestByChapterId(chapterId));
//   }, [chapterId, dispatch]);

//   const {
//     chapter,

//     error: reduxError,
//   } = useSelector((state) => state.chapters);
//   const [viewMode, setViewMode] = useState("flip"); // "flip" or "scroll"

//   useEffect(() => {
//     if (chapterId) {
//       dispatch(getChapterById(chapterId));
//     }
//   }, [chapterId, dispatch]);

//   const handleBack = () => {
//     navigate(`/admin/madeeasy/${classId}/${subjectId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
//         <p className="text-xl font-medium text-gray-600">
//           Loading chapter details...
//         </p>
//       </div>
//     );
//   }

//   if (reduxError || (!loading && !chapter)) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//           <p className="text-gray-700 mb-6">
//             {reduxError || "Chapter not found."}
//           </p>
//           <button
//             onClick={handleBack}
//             className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Use stored pageCount or fallback to 1
//   const pageCount = chapter?.content?.pageCount || 1;

//   const handelDeleteTest = async (id) => {
//     await dispatch(deleteTest(id));
//     setShowDeleteModal(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pb-20">
//       {/* Header Navigation */}
//       <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <button
//           onClick={handleBack}
//           className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group w-fit"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform"
//           />
//           Back to Subject
//         </button>
//         <div className="flex items-center gap-3">
//           <span className="text-sm text-gray-500 italic">
//             Cloudinary Paged View
//           </span>
//           <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
//         </div>
//       </div>

//       <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
//         {/* Chapter Info Header */}
//         <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div className="space-y-2">
//               <span className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
//                 Chapter Resource
//               </span>
//               <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
//                 {chapter.title}
//               </h1>
//               {chapter.content?.name && (
//                 <p className="text-blue-100 text-xl font-medium">
//                   {chapter.content.name}
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {chapter.content?.pdfUrl && (
//                 <>
//                   <a
//                     href={chapter.content.pdfUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 border border-white/30"
//                   >
//                     <ExternalLink size={18} />
//                     View Original
//                   </a>
//                   <a
//                     href={chapter.content.pdfUrl}
//                     download={`${chapter.title.replace(/\s+/g, "_")}.pdf`}
//                     className="bg-white text-blue-700 px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-xl hover:scale-105"
//                   >
//                     <Download size={18} />
//                     Download
//                   </a>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="p-8 space-y-12">
//           {/* Description Section */}
//           {chapter.content?.description && (
//             <div className="prose max-w-none">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <FileText className="text-blue-600" />
//                 Chapter Overview
//               </h3>
//               <p className="text-lg text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
//                 {chapter.content.description}
//               </p>
//             </div>
//           )}

//           {/* Visual Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {chapter.content?.imageUrl && (
//               <div className="space-y-4">
//                 <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                   <Maximize2 size={20} className="text-blue-600" />
//                   Visual Material
//                 </h4>
//                 <div className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200">
//                   <img
//                     src={chapter.content.imageUrl}
//                     alt={chapter.title}
//                     className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </div>
//               </div>
//             )}

//             {chapter.content?.videoUrl && (
//               <div className="space-y-4">
//                 <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                   <div className="bg-red-500 h-2 w-2 rounded-full animate-ping"></div>
//                   Video Lecture
//                 </h4>
//                 <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-black aspect-video">
//                   <video
//                     controls
//                     className="w-full h-full"
//                     poster={chapter.content.imageUrl}
//                   >
//                     <source src={chapter.content.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* PDF Section - Cloudinary Paged Version */}
//           {chapter.content?.pdfUrl && (
//             <div className="mt-16 space-y-8">
//               <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-6">
//                 <div>
//                   <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
//                     <BookOpen size={32} className="text-blue-600" />
//                     Interactive Study Material
//                   </h2>
//                   <p className="text-gray-500 font-medium">
//                     Cloudinary-optimized page delivery
//                   </p>
//                 </div>

//                 <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
//                   <button
//                     onClick={() => setViewMode("flip")}
//                     className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
//                       viewMode === "flip"
//                         ? "bg-white text-blue-600 shadow-md"
//                         : "text-gray-500 hover:text-gray-800"
//                     }`}
//                   >
//                     <Layers size={16} />
//                     Flip Book
//                   </button>
//                   <button
//                     onClick={() => setViewMode("scroll")}
//                     className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
//                       viewMode === "scroll"
//                         ? "bg-white text-blue-600 shadow-md"
//                         : "text-gray-500 hover:text-gray-800"
//                     }`}
//                   >
//                     <FileText size={16} />
//                     Scroll View
//                   </button>
//                 </div>
//               </div>

//               <div className="flex flex-col items-center bg-gray-100 rounded-[2.5rem] p-4 md:p-12 shadow-inner border-4 border-white overflow-hidden min-h-[500px] w-full">
//                 {viewMode === "flip" ? (
//                   <div className="relative group perspective-1000 w-full flex flex-col items-center">
//                     <HTMLFlipBook
//                       width={450}
//                       height={650}
//                       size="stretch"
//                       minWidth={315}
//                       maxWidth={500}
//                       minHeight={400}
//                       maxHeight={750}
//                       maxShadowOpacity={0.5}
//                       showCover={true}
//                       mobileScrollSupport={true}
//                       className="mx-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500 rounded-lg overflow-hidden"
//                     >
//                       {Array.from({ length: pageCount }).map((_, index) => (
//                         <CloudinaryPage
//                           key={index}
//                           pageNumber={index + 1}
//                           url={getCloudinaryPageUrl(
//                             chapter.content.pdfUrl,
//                             index + 1,
//                           )}
//                         />
//                       ))}
//                     </HTMLFlipBook>

//                     <div className="mt-12 flex flex-col items-center space-y-4">
//                       <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-2xl shadow-lg border border-gray-100">
//                         <span className="text-gray-900 font-black text-xl">
//                           {pageCount}{" "}
//                           <span className="text-gray-400 font-medium text-sm ml-1 uppercase">
//                             Pages Detected
//                           </span>
//                         </span>
//                       </div>
//                       <p className="text-gray-500 font-bold flex items-center gap-2 animate-bounce">
//                         <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
//                           TIP
//                         </span>
//                         Flip from the edges to turn pages
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-full space-y-8 flex flex-col items-center max-w-4xl mx-auto">
//                     {Array.from({ length: pageCount }).map((_, index) => (
//                       <div
//                         key={index}
//                         className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white transform transition-transform hover:scale-[1.01] w-full"
//                       >
//                         <img
//                           src={getCloudinaryPageUrl(
//                             chapter.content.pdfUrl,
//                             index + 1,
//                           )}
//                           alt={`Page ${index + 1}`}
//                           className="w-full h-auto"
//                           loading="lazy"
//                         />
//                         <div className="bg-gray-50 text-gray-400 text-xs font-bold py-3 text-center border-t border-gray-100 tracking-widest uppercase">
//                           Page {index + 1} of {pageCount}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="p-8">
//           <div className="flex flex-row items-center justify-between ">
//             <h2>এই অধ্যায়ের পরিক্ষা সমুহ</h2>
//             <Link
//               to="newtest"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               নতুন পরিক্ষা যোগ করুন
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-4">
//             {tests &&
//               tests.length > 0 &&
//               tests?.map((test, i) => (
//                 <div className="flex flex-row items-center justify-between border p-6 rounded">
//                   <Link key={i} to={test._id}>
//                     <h2>{test.title}</h2>
//                   </Link>
//                   <button
//                     onClick={() => setShowDeleteModal(true)}
//                     className="text-red"
//                   >
//                     <Trash2 className="text-red-500" />
//                   </button>
//                   {showDeleteModal && (
//                     <DeleteModal
//                       title={test.title}
//                       onDelete={handelDeleteTest}
//                       onClose={() => setShowDeleteModal(false)}
//                       id={test._id}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterManagement;

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
  Loader2,
  Maximize2,
  BookOpen,
  Layers,
  Trash2,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import {
  deleteTest,
  getTestByChapterId,
} from "../../store/features/auth/testSlice";
import DeleteModal from "../../components/DeleteModal";

// Helper to generate Cloudinary page image URL using paged media transformations
const getCloudinaryPageUrl = (pdfUrl, pageNumber, format = "jpg") => {
  if (!pdfUrl) return "";
  return pdfUrl
    .replace("/upload/", `/upload/pg_${pageNumber}/`)
    .replace(/\.pdf$/, `.${format}`);
};

// Simplified CloudinaryPage component for the flipbook
const CloudinaryPage = forwardRef(({ url, pageNumber }, ref) => (
  <div
    className="bg-white shadow-xl flex justify-center items-center overflow-hidden border border-gray-200"
    ref={ref}
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
  </div>
));

const ChapterManagement = () => {
  const { chapterId, classId, subjectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tests, loading } = useSelector((state) => state.tests);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    if (!chapterId) return;
    dispatch(getTestByChapterId(chapterId));
  }, [chapterId, dispatch]);

  const { chapter, error: reduxError } = useSelector((state) => state.chapters);
  const [viewMode, setViewMode] = useState("flip");

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterById(chapterId));
    }
  }, [chapterId, dispatch]);

  const handleBack = () => {
    navigate(`/admin/madeeasy/${classId}/${subjectId}`);
  };

  const handleDeleteClick = (testId) => {
    setSelectedTestId(testId);
    setShowDeleteModal(true);
  };

  const handleDeleteTest = async () => {
    if (selectedTestId) {
      await dispatch(deleteTest(selectedTestId));
      setShowDeleteModal(false);
      setSelectedTestId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading chapter details...</p>
        </div>
      </div>
    );
  }

  if (reduxError || (!loading && !chapter)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md border border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">Error</h2>
          <p className="text-gray-500 mb-6">
            {reduxError || "Chapter not found."}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const pageCount = chapter?.content?.pageCount || 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              to="/made-easy"
              className="hover:text-gray-900 transition-colors"
            >
              Made Easy
            </Link>
            <ChevronRight size={16} />
            <Link
              to={`/made-easy/${classId}`}
              className="hover:text-gray-900 transition-colors"
            >
              Class
            </Link>
            <ChevronRight size={16} />
            <Link
              to={`/made-easy/${classId}/${subjectId}`}
              className="hover:text-gray-900 transition-colors"
            >
              Subject
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Chapter</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm mb-6"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Subject
        </button>

        {/* Main Content Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Chapter Header */}
          <div className="border-b border-gray-200 bg-gray-50/50 p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4">
                {/* Chapter Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                  <BookOpen size={14} />
                  Chapter Resource
                </div>

                <h1 className="text-3xl md:text-4xl font-light text-gray-900">
                  {chapter?.title}
                </h1>

                {chapter?.content?.name && (
                  <p className="text-gray-500">{chapter.content.name}</p>
                )}
              </div>

              {/* Action Buttons */}
              {chapter?.content?.pdfUrl && (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={chapter.content.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Original
                  </a>
                  <a
                    href={chapter.content.pdfUrl}
                    download={`${chapter.title.replace(/\s+/g, "_")}.pdf`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* Description */}
            {chapter?.content?.description && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={20} className="text-gray-500" />
                  Chapter Overview
                </h3>
                <p className="text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  {chapter.content.description}
                </p>
              </div>
            )}

            {/* Media Grid */}
            {(chapter?.content?.imageUrl || chapter?.content?.videoUrl) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {chapter.content.imageUrl && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Cover Image
                    </h4>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={chapter.content.imageUrl}
                        alt={chapter.title}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {chapter.content.videoUrl && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Video Lecture
                    </h4>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-black">
                      <video
                        controls
                        className="w-full"
                        poster={chapter.content.imageUrl}
                      >
                        <source
                          src={chapter.content.videoUrl}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PDF Section */}
            {chapter?.content?.pdfUrl && (
              <div className="space-y-6">
                {/* View Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                      <BookOpen size={24} className="text-gray-700" />
                      Study Material
                    </h2>
                    <p className="text-sm text-gray-500">
                      {pageCount} pages • Cloudinary optimized
                    </p>
                  </div>

                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("flip")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                        viewMode === "flip"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Layers size={16} />
                      Flip Book
                    </button>
                    <button
                      onClick={() => setViewMode("scroll")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                        viewMode === "scroll"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <List size={16} />
                      Scroll View
                    </button>
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="bg-gray-50 rounded-xl p-4 md:p-8 border border-gray-200">
                  {viewMode === "flip" ? (
                    <div className="flex flex-col items-center">
                      <HTMLFlipBook
                        width={450}
                        height={650}
                        size="stretch"
                        minWidth={315}
                        maxWidth={500}
                        minHeight={400}
                        maxHeight={750}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="mx-auto shadow-lg rounded-lg overflow-hidden"
                      >
                        {Array.from({ length: pageCount }).map((_, index) => (
                          <CloudinaryPage
                            key={index}
                            pageNumber={index + 1}
                            url={getCloudinaryPageUrl(
                              chapter.content.pdfUrl,
                              index + 1,
                            )}
                          />
                        ))}
                      </HTMLFlipBook>

                      <div className="mt-6 text-sm text-gray-500">
                        {pageCount} pages • Click and drag corners to flip
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from({ length: pageCount }).map((_, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                          <img
                            src={getCloudinaryPageUrl(
                              chapter.content.pdfUrl,
                              index + 1,
                            )}
                            alt={`Page ${index + 1}`}
                            className="w-full"
                            loading="lazy"
                          />
                          <div className="bg-gray-50 text-gray-500 text-xs py-2 text-center border-t border-gray-200">
                            Page {index + 1} of {pageCount}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tests Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    এই অধ্যায়ের পরীক্ষা সমূহ
                  </h2>
                  <p className="text-sm text-gray-500">
                    {tests?.length || 0} tests available
                  </p>
                </div>

                <Link
                  to="newtest"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  নতুন পরীক্ষা যোগ করুন
                </Link>
              </div>

              {/* Tests Grid */}
              {tests && tests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tests.map((test) => (
                    <div
                      key={test._id}
                      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                            <FileText size={20} className="text-gray-600" />
                          </div>
                          <button
                            onClick={() => handleDeleteClick(test._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <Link
                          to={test._id}
                          className="block group-hover:text-gray-900 transition-colors"
                        >
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {test.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {test.description || "No description available"}
                          </p>
                        </Link>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            to={test._id}
                            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            View Test
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tests yet
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Add your first test for this chapter
                  </p>
                  <Link
                    to="newtest"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Create Test
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          title="Delete Test"
          message="Are you sure you want to delete this test? This action cannot be undone."
          onDelete={handleDeleteTest}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTestId(null);
          }}
        />
      )}
    </div>
  );
};

export default ChapterManagement;
