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
} from "lucide-react";
import { getPaperByChapterId } from "../../store/features/auth/paperSlice";

const getCloudinaryPageUrl = (pdfUrl, pageNumber, format = "jpg") => {
  if (!pdfUrl) return "";
  return pdfUrl
    .replace("/upload/", `/upload/pg_${pageNumber}/`)
    .replace(/\.pdf$/, `.${format}`);
};

const CloudinaryPage = forwardRef(({ url, pageNumber }, ref) => (
  <div
    ref={ref}
    className="bg-white shadow-xl flex justify-center items-center overflow-hidden border border-gray-200"
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

const Chapter = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chapter, loading } = useSelector((state) => state.chapters);
  const { papers } = useSelector((state) => state.papers);

  const [viewMode, setViewMode] = useState("flip");

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterById(chapterId));
      dispatch(getPaperByChapterId(chapterId));
    }
  }, [chapterId, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chapter not found</p>
      </div>
    );
  }

  const pageCount = chapter?.content?.pageCount || 1;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 font-kalpurush">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
          <h1 className="text-4xl font-black">{chapter.title}</h1>
          {chapter.content?.name && (
            <p className="text-blue-100 text-lg mt-2">{chapter.content.name}</p>
          )}

          {chapter.content?.pdfUrl && (
            <div className="flex gap-4 mt-6">
              <a
                href={chapter.content.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <ExternalLink size={18} />
                View Original
              </a>
              <a
                href={chapter.content.pdfUrl}
                download
                className="bg-white text-blue-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          )}
        </div>

        <div className="p-8 space-y-12">
          {/* Description */}
          {chapter.content?.description && (
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <FileText className="text-blue-600" />
                Chapter Overview
              </h3>
              <p className="bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500">
                {chapter.content.description}
              </p>
            </div>
          )}

          {/* Image */}
          {chapter.content?.imageUrl && (
            <div>
              <h4 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Maximize2 size={20} className="text-blue-600" />
                Visual Material
              </h4>
              <img
                src={chapter.content.imageUrl}
                alt={chapter.title}
                className="rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* PDF Section */}
          {chapter.content?.pdfUrl && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <BookOpen size={32} className="text-blue-600" />
                  Study Material
                </h2>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("flip")}
                    className={`px-4 py-2 rounded-lg ${
                      viewMode === "flip" ? "bg-white shadow text-blue-600" : ""
                    }`}
                  >
                    <Layers size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("scroll")}
                    className={`px-4 py-2 rounded-lg ${
                      viewMode === "scroll"
                        ? "bg-white shadow text-blue-600"
                        : ""
                    }`}
                  >
                    <FileText size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center bg-gray-100 p-8 rounded-3xl">
                {viewMode === "flip" ? (
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
                ) : (
                  <div className="space-y-6 w-full max-w-4xl">
                    {Array.from({ length: pageCount }).map((_, index) => (
                      <img
                        key={index}
                        src={getCloudinaryPageUrl(
                          chapter.content.pdfUrl,
                          index + 1,
                        )}
                        alt={`Page ${index + 1}`}
                        className="rounded-2xl shadow-lg w-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col space-y-4">
          <h2 className="text-2xl">
            এই অধ্যায়ের জন্য পরিক্ষা সমূহ, অংশগ্রহন করতে পরিক্ষা নির্বাচন
            করুন...
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {papers &&
              papers.length > 0 &&
              papers.map((paper) => (
                <Link
                  to={`${paper._id}/guidline`}
                  key={paper._id}
                  className="px-4 py-2 rounded-full bg-linear-to-bl from-green-300 to-green-700 text-white text-center"
                >
                  <h2>{paper.title}</h2>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
