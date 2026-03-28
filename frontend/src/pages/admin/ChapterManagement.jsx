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
                <p className="text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-200 whitespace-pre-wrap">
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
