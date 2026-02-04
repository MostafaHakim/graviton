import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  FileText,
  Upload,
  Download,
  Eye,
  Copy,
  MoreVertical,
  Search,
  Filter,
  Layers,
  BookOpen,
  File,
  Type,
  Video,
  Link,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  BookMarked,
  Hash,
  Calendar,
  User,
  Settings,
  RefreshCw,
  CheckCircle,
  Clock,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE = import.meta.env.VITE_BASE_URL + "/api/subjects";

const ChapterContentPage = () => {
  const { subjectId, classId, paperId, chapterIndex } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentPaper, setCurrentPaper] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const [contentList, setContentList] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [newContent, setNewContent] = useState({
    titel: "",
    subtitle: "",
    image: "",
    public_id: "",
    details: "",
    pdf: "",
  });

  const [expandedContent, setExpandedContent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("content");

  // Load chapter data - FIXED VERSION
  useEffect(() => {
    const loadChapterData = async () => {
      try {
        setLoading(true);

        // First load the subject using the correct API route
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
          // Chapter doesn't exist yet
          toast.info(
            "এই অধ্যায়ে এখনও কোন কন্টেন্ট নেই। নতুন কন্টেন্ট যোগ করুন।",
          );
          // Create empty chapter structure
          const emptyChapter = {
            name: `অধ্যায় ${chapterIndexInt + 1}`,
            content: [],
          };
          setCurrentChapter(emptyChapter);
          setContentList([]);
        } else {
          setCurrentChapter(chapter);
          setContentList(chapter.content || []);
        }

        console.log("Loaded data:", {
          subject: subjectData.name,
          class: classData?.name,
          paper: paperData?.name,
          chapter: chapter?.name || "No chapter yet",
          chapterIndex,
          chapterCount: paperData?.chapters?.length || 0,
        });
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
      navigate("/admin/madeeasy");
    }
  }, [subjectId, classId, paperId, chapterIndex, navigate]);

  // Filter content based on search
  const filteredContent = contentList.filter(
    (content) =>
      content.titel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.details?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Add new content
  const handleAddContent = async () => {
    if (!newContent.titel.trim()) {
      toast.warning("শিরোনাম প্রয়োজন");
      return;
    }

    try {
      // First check if chapter exists
      const subjectRes = await fetch(`${BASE}/${subjectId}`);
      const subjectData = await subjectRes.json();

      const classData = subjectData.classes?.find((c) => c.classId === classId);
      const paperData = classData?.papers?.find((p) => p.paperId === paperId);
      const chapterIndexInt = parseInt(chapterIndex);

      // If chapter doesn't exist, create it first
      if (!paperData?.chapters?.[chapterIndexInt]) {
        // Create the chapter first
        const createChapterRes = await fetch(
          `${BASE}/${subjectId}/class/${classId}/paper/${paperId}/chapter`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: `অধ্যায় ${chapterIndexInt + 1}` }),
          },
        );

        if (!createChapterRes.ok) {
          toast.error("অধ্যায় তৈরি করতে সমস্যা হয়েছে");
          return;
        }
      }

      // Now add content to the chapter
      const response = await fetch(
        `${BASE}/${subjectId}/class/${classId}/paper/${paperId}/chapter/${chapterIndex}/content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newContent),
        },
      );

      if (response.ok) {
        const updatedChapter = await response.json();
        setCurrentChapter(updatedChapter);
        setContentList(updatedChapter.content || []);
        setNewContent({
          titel: "",
          subtitle: "",
          image: "",
          public_id: "",
          details: "",
          pdf: "",
        });
        toast.success("কন্টেন্ট যোগ করা হয়েছে");
      } else {
        const errorData = await response.json();
        toast.error(`সমস্যা: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to add content:", error);
      toast.error("কন্টেন্ট যোগ করতে সমস্যা হয়েছে");
    }
  };

  // Update content
  const handleUpdateContent = async (contentIndex) => {
    try {
      const response = await fetch(
        `${BASE}/${subjectId}/class/${classId}/paper/${paperId}/chapter/${chapterIndex}/content/${contentIndex}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingContent),
        },
      );

      if (response.ok) {
        const updatedChapter = await response.json();
        setCurrentChapter(updatedChapter);
        setContentList(updatedChapter.content || []);
        setEditingContent(null);
        toast.success("কন্টেন্ট আপডেট করা হয়েছে");
      } else {
        const errorData = await response.json();
        toast.error(`সমস্যা: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to update content:", error);
      toast.error("আপডেট করতে সমস্যা হয়েছে");
    }
  };

  // Delete content
  const handleDeleteContent = async (contentIndex) => {
    if (window.confirm("আপনি কি এই কন্টেন্ট ডিলিট করতে চান?")) {
      try {
        const response = await fetch(
          `${BASE}/${subjectId}/class/${classId}/paper/${paperId}/chapter/${chapterIndex}/content/${contentIndex}`,
          { method: "DELETE" },
        );

        if (response.ok) {
          const updatedChapter = await response.json();
          setCurrentChapter(updatedChapter);
          setContentList(updatedChapter.content || []);
          toast.success("কন্টেন্ট ডিলিট করা হয়েছে");
        } else {
          const errorData = await response.json();
          toast.error(`সমস্যা: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Failed to delete content:", error);
        toast.error("ডিলিট করতে সমস্যা হয়েছে");
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      toast.info("ছবি আপলোড হচ্ছে...");
      // Note: You need to add an upload endpoint in your backend
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (isEditing && editingContent) {
          setEditingContent({
            ...editingContent,
            image: data.url,
            public_id: data.public_id,
          });
        } else {
          setNewContent({
            ...newContent,
            image: data.url,
            public_id: data.public_id,
          });
        }
        toast.success("ছবি আপলোড সফল");
      } else {
        toast.warning("ছবি আপলোড করা যায়নি, URL ম্যানুয়ালি দিন");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.warning("ছবি আপলোড করা যায়নি, URL ম্যানুয়ালি দিন");
    }
  };

  // Handle PDF upload
  const handlePDFUpload = async (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      toast.info("PDF আপলোড হচ্ছে...");
      // Note: You need to add a PDF upload endpoint in your backend
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/upload/pdf`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (isEditing && editingContent) {
          setEditingContent({ ...editingContent, pdf: data.url });
        } else {
          setNewContent({ ...newContent, pdf: data.url });
        }
        toast.success("PDF আপলোড সফল");
      } else {
        toast.warning("PDF আপলোড করা যায়নি, URL ম্যানুয়ালি দিন");
      }
    } catch (error) {
      console.error("Failed to upload PDF:", error);
      toast.warning("PDF আপলোড করা যায়নি, URL ম্যানুয়ালি দিন");
    }
  };

  // Toggle content expansion
  const toggleContentExpand = (index) => {
    setExpandedContent((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Refresh chapter data
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const subjectRes = await fetch(`${BASE}/${subjectId}`);
      const subjectData = await subjectRes.json();

      const classData = subjectData.classes?.find((c) => c.classId === classId);
      const paperData = classData?.papers?.find((p) => p.paperId === paperId);
      const chapterIndexInt = parseInt(chapterIndex);
      const chapter = paperData?.chapters?.[chapterIndexInt];

      if (chapter) {
        setCurrentChapter(chapter);
        setContentList(chapter.content || []);
        toast.success("ডেটা রিফ্রেশ করা হয়েছে");
      }
    } catch (error) {
      console.error("Failed to refresh:", error);
      toast.error("রিফ্রেশ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // Debug function to check API response
  const debugAPI = async () => {
    console.log("Debugging API calls...");
    console.log("Base URL:", BASE);
    console.log("Subject ID:", subjectId);

    try {
      const res = await fetch(`${BASE}/${subjectId}`);
      const data = await res.json();
      console.log("Subject API Response:", data);

      const classData = data.classes?.find((c) => c.classId === classId);
      console.log("Class found:", classData);

      const paperData = classData?.papers?.find((p) => p.paperId === paperId);
      console.log("Paper found:", paperData);

      console.log("Chapter index:", chapterIndex);
      console.log("Chapters in paper:", paperData?.chapters);
      console.log(
        "Specific chapter:",
        paperData?.chapters?.[parseInt(chapterIndex)],
      );
    } catch (error) {
      console.error("Debug error:", error);
    }
  };

  // Call debug on component mount
  useEffect(() => {
    debugAPI();
  }, [subjectId, classId, paperId, chapterIndex]);

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
        rtl={false}
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
                onClick={() => navigate("/admin/madeeasy")}
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
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    রিফ্রেশ
                  </button>
                  <span className="text-xs text-gray-400">
                    কন্টেন্ট: {contentList.length}
                  </span>
                  <button
                    onClick={debugAPI}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    ডিবাগ
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                <Download className="w-4 h-4" />
                এক্সপোর্ট
              </button>
              <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Info Banner - Show when chapter is empty */}
          {(!currentChapter || currentChapter.content?.length === 0) && (
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-500">নতুন অধ্যায়</h4>
                  <p className="text-amber-400 text-sm mt-1">
                    {currentChapter
                      ? "এই অধ্যায়ে এখনও কোন কন্টেন্ট নেই। প্রথম কন্টেন্ট যোগ করুন।"
                      : "এই অধ্যায়টি এখনও তৈরি করা হয়নি। প্রথম কন্টেন্ট যোগ করলে অধ্যায়টি স্বয়ংক্রিয়ভাবে তৈরি হবে।"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            <div className="flex space-x-1">
              {[
                { id: "content", label: "কন্টেন্ট ম্যানেজমেন্ট", icon: Layers },
                { id: "preview", label: "প্রিভিউ", icon: Eye },
                { id: "settings", label: "সেটিংস", icon: Settings },
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
            {/* Add New Content Form */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                নতুন কন্টেন্ট যোগ করুন
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      শিরোনাম *
                    </label>
                    <input
                      type="text"
                      value={newContent.titel}
                      onChange={(e) =>
                        setNewContent({ ...newContent, titel: e.target.value })
                      }
                      placeholder="শিরোনাম লিখুন"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      সাবটাইটেল
                    </label>
                    <input
                      type="text"
                      value={newContent.subtitle}
                      onChange={(e) =>
                        setNewContent({
                          ...newContent,
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="সাবটাইটেল লিখুন"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      বিস্তারিত বিবরণ
                    </label>
                    <textarea
                      value={newContent.details}
                      onChange={(e) =>
                        setNewContent({
                          ...newContent,
                          details: e.target.value,
                        })
                      }
                      placeholder="বিস্তারিত বিবরণ লিখুন"
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      ছবি
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={newContent.image}
                        onChange={(e) =>
                          setNewContent({
                            ...newContent,
                            image: e.target.value,
                          })
                        }
                        placeholder="ছবির URL"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                      />
                      <label className="px-4 py-3 bg-blue-500/20 text-blue-500 rounded-xl hover:bg-blue-500/30 transition-colors duration-300 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        আপলোড
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {newContent.image && (
                      <div className="mt-2">
                        <img
                          src={newContent.image}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-lg border border-white/20"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      PDF ফাইল
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={newContent.pdf}
                        onChange={(e) =>
                          setNewContent({ ...newContent, pdf: e.target.value })
                        }
                        placeholder="PDF URL"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                      />
                      <label className="px-4 py-3 bg-purple-500/20 text-purple-500 rounded-xl hover:bg-purple-500/30 transition-colors duration-300 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        PDF
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePDFUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleAddContent}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      কন্টেন্ট যোগ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
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
                          className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
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
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                  <FileText className="w-4 h-4 text-amber-500" />
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
                                  onClick={() => {
                                    setEditingContent({
                                      ...content,
                                      _index: index,
                                    });
                                    setExpandedContent((prev) => ({
                                      ...prev,
                                      [index]: true,
                                    }));
                                  }}
                                  className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-300"
                                  title="এডিট করুন"
                                >
                                  <Edit2 className="w-4 h-4 text-blue-500" />
                                </button>
                                <button
                                  onClick={() => handleDeleteContent(index)}
                                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                                  title="ডিলিট করুন"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                                  <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
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
                              {editingContent?._index === index ? (
                                // Edit Form
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-2">
                                        শিরোনাম
                                      </label>
                                      <input
                                        type="text"
                                        value={editingContent.titel}
                                        onChange={(e) =>
                                          setEditingContent({
                                            ...editingContent,
                                            titel: e.target.value,
                                          })
                                        }
                                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-2">
                                        সাবটাইটেল
                                      </label>
                                      <input
                                        type="text"
                                        value={editingContent.subtitle}
                                        onChange={(e) =>
                                          setEditingContent({
                                            ...editingContent,
                                            subtitle: e.target.value,
                                          })
                                        }
                                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                      বিস্তারিত
                                    </label>
                                    <textarea
                                      value={editingContent.details}
                                      onChange={(e) =>
                                        setEditingContent({
                                          ...editingContent,
                                          details: e.target.value,
                                        })
                                      }
                                      rows="4"
                                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent resize-none"
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-2">
                                        ছবি URL
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={editingContent.image}
                                          onChange={(e) =>
                                            setEditingContent({
                                              ...editingContent,
                                              image: e.target.value,
                                            })
                                          }
                                          className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                                        />
                                        <label className="px-3 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 cursor-pointer">
                                          <Upload className="w-4 h-4" />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                              handleImageUpload(e, true)
                                            }
                                            className="hidden"
                                          />
                                        </label>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-2">
                                        PDF URL
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={editingContent.pdf}
                                          onChange={(e) =>
                                            setEditingContent({
                                              ...editingContent,
                                              pdf: e.target.value,
                                            })
                                          }
                                          className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                                        />
                                        <label className="px-3 py-2 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 transition-colors duration-300 cursor-pointer">
                                          <Upload className="w-4 h-4" />
                                          <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) =>
                                              handlePDFUpload(e, true)
                                            }
                                            className="hidden"
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  {editingContent.image && (
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-2">
                                        ছবি প্রিভিউ
                                      </label>
                                      <img
                                        src={editingContent.image}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border border-white/20"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center justify-end gap-3 pt-4">
                                    <button
                                      onClick={() => setEditingContent(null)}
                                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateContent(index)}
                                      className="px-6 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300 flex items-center gap-2"
                                    >
                                      <Save className="w-4 h-4" />
                                      সেভ করুন
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                // View Mode
                                <div className="space-y-4">
                                  {content.details && (
                                    <div>
                                      <h5 className="text-sm text-gray-400 mb-2">
                                        বিস্তারিত
                                      </h5>
                                      <p className="text-white bg-white/5 p-4 rounded-lg border border-white/10">
                                        {content.details}
                                      </p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {content.image && (
                                      <div>
                                        <h5 className="text-sm text-gray-400 mb-2">
                                          ছবি
                                        </h5>
                                        <div className="relative">
                                          <img
                                            src={content.image}
                                            alt={content.titel}
                                            className="w-full h-48 object-cover rounded-lg border border-white/20"
                                          />
                                          <a
                                            href={content.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-300"
                                          >
                                            <Eye className="w-4 h-4 text-white" />
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                    {content.pdf && (
                                      <div>
                                        <h5 className="text-sm text-gray-400 mb-2">
                                          PDF ফাইল
                                        </h5>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              <File className="w-8 h-8 text-red-500" />
                                              <div>
                                                <div className="text-white font-medium">
                                                  PDF ডকুমেন্ট
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                  লিঙ্ক
                                                </div>
                                              </div>
                                            </div>
                                            <a
                                              href={content.pdf}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                                            >
                                              <Download className="w-4 h-4" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
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
                        কোন কন্টেন্ট নেই
                      </h4>
                      <p className="text-gray-400 mb-6">
                        এই অধ্যায়ে এখনও কোন কন্টেন্ট যোগ করা হয়নি। প্রথম
                        কন্টেন্ট যোগ করুন।
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChapterContentPage;
