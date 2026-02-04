import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Download,
  Eye,
  Search,
  Filter,
  Layers,
  File,
  ChevronRight,
  ChevronDown,
  Copy,
  Globe,
  Calendar,
  User,
  FileText,
  Image as ImageIcon,
  Link,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE = import.meta.env.VITE_BASE_URL + "/api/subjects";

const ChapterDetails = () => {
  const { subjectId, classId, paperId, chapterIndex } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentPaper, setCurrentPaper] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const [contentList, setContentList] = useState([]);
  const [expandedContent, setExpandedContent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("content");

  // Load chapter data
  useEffect(() => {
    const loadChapterData = async () => {
      try {
        setLoading(true);

        // Load subject
        const subjectRes = await fetch(`${BASE}/${subjectId}`);
        const subjectData = await subjectRes.json();

        if (!subjectData) {
          toast.error("বিষয় পাওয়া যায়নি");
          setLoading(false);
          return;
        }

        setSubject(subjectData);

        // Find the class
        const classData = subjectData.classes?.find(
          (c) => c.classId === classId,
        );
        if (!classData) {
          toast.error("শ্রেণী পাওয়া যায়নি");
          setLoading(false);
          return;
        }

        setCurrentClass(classData);

        // Find the paper
        const paperData = classData.papers?.find((p) => p.paperId === paperId);
        if (!paperData) {
          toast.error("পেপার পাওয়া যায়নি");
          setLoading(false);
          return;
        }

        setCurrentPaper(paperData);

        // Find the chapter
        const chapterIndexInt = parseInt(chapterIndex);
        const chapter = paperData.chapters?.[chapterIndexInt];

        if (!chapter) {
          toast.info("এই অধ্যায়ে এখনও কোন কন্টেন্ট নেই।");
          setCurrentChapter({
            name: `অধ্যায় ${chapterIndexInt + 1}`,
            content: [],
          });
          setContentList([]);
        } else {
          setCurrentChapter(chapter);
          setContentList(chapter.content || []);
        }
      } catch (error) {
        console.error("Failed to load chapter data:", error);
        toast.error("ডেটা লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    if (subjectId && classId && paperId && chapterIndex !== undefined) {
      loadChapterData();
    } else {
      toast.error("আপনার লিংকটি সঠিক নয়");
      navigate("/student/madeeasy");
    }
  }, [subjectId, classId, paperId, chapterIndex, navigate]);

  // Filter content based on search
  const filteredContent = contentList.filter(
    (content) =>
      content.titel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.details?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Toggle content expansion
  const toggleContentExpand = (index) => {
    setExpandedContent((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Copy content to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("কপি করা হয়েছে!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3BD480]/30 border-t-[#3BD480] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] rounded-2xl">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto p-4 md:p-6"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/student/madeeasy")}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#3BD480]/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#3BD480]" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {currentChapter?.name ||
                        `অধ্যায় ${parseInt(chapterIndex) + 1}`}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {subject && (
                        <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                          {subject.name}
                        </span>
                      )}
                      {currentClass && (
                        <>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                            {currentClass.name}
                          </span>
                        </>
                      )}
                      {currentPaper && (
                        <>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                            {currentPaper.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">
                    মোট কন্টেন্ট: {contentList.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                <Download className="w-4 h-4" />
                PDF ডাউনলোড
              </button>
            </div>
          </div>

          {/* Info Banner - Show when chapter is empty */}
          {(!currentChapter || currentChapter.content?.length === 0) && (
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-500">
                    কোন কন্টেন্ট নেই
                  </h4>
                  <p className="text-blue-400 text-sm mt-1">
                    এই অধ্যায়ে এখনও কোন কন্টেন্ট যোগ করা হয়নি। অ্যাডমিন শীঘ্রই
                    কন্টেন্ট যোগ করবেন।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs - Simplified for students */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            <div className="flex space-x-1">
              {[
                { id: "content", label: "সমস্ত কন্টেন্ট", icon: Layers },
                { id: "resources", label: "রিসোর্স", icon: File },
                { id: "notes", label: "নোটস", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 flex-1 justify-center ${
                      isActive
                        ? "bg-[#3BD480] text-[#17202F] font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Content List */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    কন্টেন্ট তালিকা ({contentList.length})
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="কন্টেন্ট খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                    >
                      <Filter className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence>
                  {filteredContent.length > 0 ? (
                    <div className="space-y-4">
                      {filteredContent.map((content, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-colors duration-300"
                        >
                          {/* Content Header */}
                          <div className="p-4 border-b border-white/10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => toggleContentExpand(index)}
                                  className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                >
                                  {expandedContent[index] ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                  <FileText className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white">
                                    {content.titel || "শিরোনামহীন"}
                                  </h4>
                                  {content.subtitle && (
                                    <p className="text-sm text-gray-400 mt-1">
                                      {content.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => copyToClipboard(content.titel)}
                                  className="p-2 hover:bg-[#3BD480]/20 rounded-lg transition-colors duration-300"
                                  title="কপি করুন"
                                >
                                  <Copy className="w-4 h-4 text-[#3BD480]" />
                                </button>
                                <a
                                  href={content.image || content.pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-300"
                                  title="ওপেন করুন"
                                >
                                  <Eye className="w-4 h-4 text-blue-500" />
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Content Details - Expanded */}
                          {expandedContent[index] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 border-t border-white/10"
                            >
                              <div className="space-y-4">
                                {content.details && (
                                  <div>
                                    <h5 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                      <FileText className="w-4 h-4" />
                                      বিস্তারিত
                                    </h5>
                                    <p className="text-white bg-white/5 p-4 rounded-lg border border-white/10 whitespace-pre-line">
                                      {content.details}
                                    </p>
                                  </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {content.image && (
                                    <div>
                                      <h5 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4" />
                                        ছবি
                                      </h5>
                                      <div className="relative group">
                                        <img
                                          src={content.image}
                                          alt={content.titel}
                                          className="w-full h-48 object-cover rounded-lg border border-white/20 group-hover:border-[#3BD480] transition-colors duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                                            <span className="text-white text-sm">
                                              ক্লিক করে বড় দেখুন
                                            </span>
                                            <a
                                              href={content.image}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-2 bg-[#3BD480] text-[#17202F] rounded-lg hover:bg-[#2da866] transition-colors duration-300"
                                            >
                                              <Eye className="w-4 h-4" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {content.pdf && (
                                    <div>
                                      <h5 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                        <File className="w-4 h-4" />
                                        PDF ফাইল
                                      </h5>
                                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#3BD480] transition-colors duration-300">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <File className="w-8 h-8 text-red-500" />
                                            <div>
                                              <div className="text-white font-medium">
                                                PDF ডকুমেন্ট
                                              </div>
                                              <div className="text-xs text-gray-400">
                                                ডাউনলোড করুন
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <a
                                              href={content.pdf}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                                              title="প্রিভিউ"
                                            >
                                              <Eye className="w-4 h-4" />
                                            </a>
                                            <a
                                              href={content.pdf}
                                              download
                                              className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                                              title="ডাউনলোড"
                                            >
                                              <Download className="w-4 h-4" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {(content.image || content.pdf) && (
                                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          content.image || content.pdf,
                                        )
                                      }
                                      className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300 text-sm"
                                    >
                                      <Copy className="w-3 h-3" />
                                      লিঙ্ক কপি
                                    </button>
                                    <a
                                      href={content.image || content.pdf}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300 text-sm"
                                    >
                                      <Globe className="w-3 h-3" />
                                      ওপেন লিঙ্ক
                                    </a>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // Empty State
                    <div className="text-center py-12">
                      <div className="inline-block p-6 bg-white/5 rounded-2xl mb-6">
                        <Layers className="w-12 h-12 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {searchTerm ? "কোন রেজাল্ট নেই" : "কোন কন্টেন্ট নেই"}
                      </h4>
                      <p className="text-gray-400 mb-6">
                        {searchTerm
                          ? `"${searchTerm}" এর জন্য কোন কন্টেন্ট পাওয়া যায়নি`
                          : "এই অধ্যায়ে এখনও কোন কন্টেন্ট যোগ করা হয়নি।"}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="px-6 py-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                        >
                          সার্চ ক্লিয়ার করুন
                        </button>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              অতিরিক্ত রিসোর্স
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentList
                .filter((content) => content.pdf || content.image)
                .map((content, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10 p-4 hover:border-[#3BD480] transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        {content.pdf ? (
                          <File className="w-5 h-5 text-blue-500" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">
                          {content.titel}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {content.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <a
                            href={content.pdf || content.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                          >
                            ওপেন করুন
                          </a>
                          <a
                            href={content.pdf || content.image}
                            download
                            className="text-xs px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300"
                          >
                            ডাউনলোড
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              গুরুত্বপূর্ণ নোটস
            </h3>
            <div className="space-y-4">
              {contentList
                .filter((content) => content.details)
                .map((content, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10 p-4"
                  >
                    <h4 className="font-semibold text-white mb-2">
                      {content.titel}
                    </h4>
                    {content.subtitle && (
                      <p className="text-gray-400 text-sm mb-3">
                        {content.subtitle}
                      </p>
                    )}
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <p className="text-white text-sm whitespace-pre-line">
                        {content.details.length > 200
                          ? `${content.details.substring(0, 200)}...`
                          : content.details}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleContentExpand(index)}
                      className="text-[#3BD480] text-sm mt-3 hover:text-[#2da866] transition-colors duration-300"
                    >
                      {expandedContent[index] ? "কম দেখুন" : "আরও দেখুন"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChapterDetails;
