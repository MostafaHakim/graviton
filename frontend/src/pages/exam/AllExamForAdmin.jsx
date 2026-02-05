import React, { useState, useEffect } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Clock,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  ChevronRight,
  ChevronLeft,
  Eye,
  Edit2,
  Trash2,
  Download,
  Share2,
  Filter,
  Search,
  Calendar,
  Target,
  Trophy,
  Copy,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  RefreshCw,
  GraduationCap,
  Grid,
  List,
  Play,
  Pause,
  Activity,
  Award as AwardIcon,
  Globe as GlobeIcon,
  PieChart,
  ChevronDown,
} from "lucide-react";

const AllExamForAdmin = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    averageTests: 0,
    totalParticipants: 0,
  });
  const navigate = useNavigate();

  const examTypes = [
    {
      id: "IELTS",
      name: "IELTS",
      icon: GlobeIcon,
      color: "#3B82F6",
      bg: "#3B82F620",
    },
    {
      id: "SAT",
      name: "SAT",
      icon: AwardIcon,
      color: "#8B5CF6",
      bg: "#8B5CF620",
    },
    {
      id: "Olympiad",
      name: "অলিম্পিয়াড",
      icon: Trophy,
      color: "#F59E0B",
      bg: "#F59E0B20",
    },
    {
      id: "HSC",
      name: "এইচএসসি",
      icon: GraduationCap,
      color: "#10B981",
      bg: "#10B98120",
    },
    {
      id: "SSC",
      name: "এসএসসি",
      icon: BookOpen,
      color: "#EF4444",
      bg: "#EF444420",
    },
    {
      id: "JSC",
      name: "জেএসসি",
      icon: Target,
      color: "#EC4899",
      bg: "#EC489920",
    },
  ];

  const statusOptions = [
    { id: "active", name: "একটিভ", color: "#10B981", icon: Activity },
    { id: "inactive", name: "ইনএকটিভ", color: "#6B7280", icon: Pause },
  ];

  const sortOptions = [
    { id: "newest", name: "নতুনতম" },
    { id: "oldest", name: "পুরনোতম" },
    { id: "name_asc", name: "নাম (ক-ঙ)" },
    { id: "name_desc", name: "নাম (ঙ-ক)" },
    { id: "popular", name: "জনপ্রিয়" },
  ];

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams`,
      );
      const examsArray = data.exam;
      console.log(examsArray);
      setFilteredExams(examsArray);
      calculateStats(examsArray);
    } catch (err) {
      setError("এক্সাম ডেটা লোড করতে সমস্যা হয়েছে");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (examsData) => {
    const total = examsData?.length;
    const active = examsData?.filter((exam) => exam.isActive).length;
    const inactive = total - active;

    setStats({
      total,
      active,
      inactive,
      averageTests: 0, // You can calculate this from your data
      totalParticipants: 0, // You can calculate this from your data
    });
  };

  useEffect(() => {
    let result = exams;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (exam) =>
          exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exam.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Type filter
    if (selectedType !== "all") {
      result = result.filter((exam) => exam.name === selectedType);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((exam) =>
        statusFilter === "active" ? exam.isActive : !exam.isActive,
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "popular":
          return 0; // Add popularity logic
        default:
          return 0;
      }
    });

    setFilteredExams(result);
  }, [searchTerm, selectedType, statusFilter, sortBy, exams]);

  const handleDeleteExam = async (examId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams/${examId}`,
      );
      fetchExams();
      setDeleteConfirm(null);
    } catch (err) {
      setError("এক্সাম ডিলিট করতে সমস্যা হয়েছে");
    }
  };

  const handleToggleStatus = async (examId, currentStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams/${examId}`,
        { isActive: !currentStatus },
      );
      fetchExams();
    } catch (err) {
      setError("স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে");
    }
  };

  const handleDuplicateExam = async (exam) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams/duplicate`,
        { examId: exam._id },
      );
      fetchExams();
    } catch (err) {
      setError("এক্সাম কপি করতে সমস্যা হয়েছে");
    }
  };

  const getExamType = (examName) => {
    return (
      examTypes.find((type) => examName.includes(type.name)) ||
      examTypes.find((type) => type.id === examName) ||
      examTypes[0]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
        damping: 12,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: "0 20px 40px -15px rgba(59, 212, 128, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3BD480] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">এক্সাম লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]/20 p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                সকল এক্সাম
              </h1>
              <p className="text-gray-300 mt-2">
                সব এক্সামের তালিকা এবং ব্যবস্থাপনা
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin/exams/create"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                নতুন এক্সাম
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchExams}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <RefreshCw className="w-4 h-4" />
                রিফ্রেশ
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">মোট এক্সাম</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.total}
                  </h3>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-[#3BD480]" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3BD480]"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">একটিভ</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.active}
                  </h3>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${stats.total ? (stats.active / stats.total) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">ইনএকটিভ</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.inactive}
                  </h3>
                </div>
                <div className="p-3 bg-gray-500/20 rounded-xl">
                  <Pause className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-500"
                  style={{
                    width: `${stats.total ? (stats.inactive / stats.total) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">গড় টেস্ট</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.averageTests}
                  </h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">অংশগ্রহণকারী</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.totalParticipants}
                  </h3>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </motion.div>
          </div>

          {/* Filters Section */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="এক্সাম খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Exam Type Filter */}
                <div className="relative flex-1">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent appearance-none"
                  >
                    <option value="all" className="bg-[#17202F]">
                      সব ধরণ
                    </option>
                    {examTypes.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}
                        className="bg-[#17202F]"
                      >
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative flex-1">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent appearance-none"
                  >
                    <option value="all" className="bg-[#17202F]">
                      সব স্ট্যাটাস
                    </option>
                    {statusOptions.map((status) => (
                      <option
                        key={status.id}
                        value={status.id}
                        className="bg-[#17202F]"
                      >
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent appearance-none"
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        className="bg-[#17202F]"
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-3 ${viewMode === "grid" ? "bg-white/10" : ""}`}
                  >
                    <Grid className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-3 ${viewMode === "list" ? "bg-white/10" : ""}`}
                  >
                    <List className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  selectedType === "all"
                    ? "bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                সব
              </button>
              {examTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                    selectedType === type.id
                      ? "text-white"
                      : "text-gray-400 hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor:
                      selectedType === type.id ? type.bg : "transparent",
                    border: `1px solid ${selectedType === type.id ? type.color : "transparent"}`,
                  }}
                >
                  <type.icon className="w-3 h-3" />
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Exams List */}
        <motion.div variants={itemVariants}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-300">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredExams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center"
            >
              <div className="inline-block p-6 bg-white/5 rounded-2xl mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                কোন এক্সাম পাওয়া যায়নি
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm || selectedType !== "all" || statusFilter !== "all"
                  ? "আপনার ফিল্টারের সাথে মিলছে এমন কোন এক্সাম নেই।"
                  : "সিস্টেমে এখনও কোন এক্সাম যোগ করা হয়নি।"}
              </p>
              <Link
                to="/admin/exams/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
              >
                <PlusCircle className="w-6 h-6" />
                প্রথম এক্সাম তৈরি করুন
              </Link>
            </motion.div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam, index) => {
                const typeInfo = getExamType(exam.name);
                const totalQuestions = exam?.tests?.reduce((acc, test) => {
                  return acc + (test.questions?.length || 0);
                }, 0);
                return (
                  <motion.div
                    key={exam._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    variants={cardHoverVariants}
                    whileHover="hover"
                    className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div
                      className="h-2"
                      style={{ backgroundColor: typeInfo.color }}
                    ></div>

                    <div className="p-6">
                      {/* Exam Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: typeInfo.bg }}
                          >
                            <typeInfo.icon
                              className="w-6 h-6"
                              style={{ color: typeInfo.color }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white line-clamp-1">
                              {exam.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="text-xs px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: exam.isActive
                                    ? "#10B98120"
                                    : "#6B728020",
                                  color: exam.isActive ? "#10B981" : "#6B7280",
                                }}
                              >
                                {exam.isActive ? "একটিভ" : "ইনএকটিভ"}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDate(exam.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-6 line-clamp-2 min-h-[40px]">
                        {exam.description || "কোন বিবরণ নেই"}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {exam?.tests?.length}
                          </div>
                          <div className="text-xs text-gray-400">টেস্ট</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {totalQuestions}
                          </div>
                          <div className="text-xs text-gray-400">প্রশ্ন</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/admin/exams/${exam._id}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          দেখুন
                        </Link>
                        <button
                          onClick={() =>
                            handleToggleStatus(exam._id, exam.isActive)
                          }
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                          title={exam.isActive ? "ইনএকটিভ করুন" : "একটিভ করুন"}
                        >
                          {exam.isActive ? (
                            <Pause className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDuplicateExam(exam)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                          title="কপি করুন"
                        >
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(exam._id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                          title="ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-6 text-gray-400 font-medium">
                        এক্সাম
                      </th>
                      <th className="text-left p-6 text-gray-400 font-medium">
                        ধরণ
                      </th>
                      <th className="text-left p-6 text-gray-400 font-medium">
                        স্ট্যাটাস
                      </th>
                      <th className="text-left p-6 text-gray-400 font-medium">
                        তৈরি হয়েছে
                      </th>
                      <th className="text-left p-6 text-gray-400 font-medium">
                        একশন
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExams.map((exam, index) => {
                      const typeInfo = getExamType(exam.name);
                      return (
                        <motion.tr
                          key={exam._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div
                                className="p-3 rounded-xl"
                                style={{ backgroundColor: typeInfo.bg }}
                              >
                                <typeInfo.icon
                                  className="w-5 h-5"
                                  style={{ color: typeInfo.color }}
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-white">
                                  {exam.name}
                                </div>
                                <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                                  {exam.description || "কোন বিবরণ নেই"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span
                              className="px-3 py-1.5 rounded-full text-sm"
                              style={{
                                backgroundColor: typeInfo.bg,
                                color: typeInfo.color,
                              }}
                            >
                              {typeInfo.name}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  exam.isActive ? "bg-green-500" : "bg-gray-500"
                                }`}
                              ></div>
                              <span
                                className={
                                  exam.isActive
                                    ? "text-green-400"
                                    : "text-gray-400"
                                }
                              >
                                {exam.isActive ? "একটিভ" : "ইনএকটিভ"}
                              </span>
                            </div>
                          </td>
                          <td className="p-6 text-gray-400">
                            {formatDate(exam.createdAt)}
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/exams/${exam._id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                              >
                                <Eye className="w-4 h-4" />
                                দেখুন
                              </Link>
                              <button
                                onClick={() =>
                                  handleToggleStatus(exam._id, exam.isActive)
                                }
                                className="p-2 hover:bg-white/10 rounded-lg"
                              >
                                {exam.isActive ? (
                                  <Pause className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Play className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(exam._id)}
                                className="p-2 hover:bg-red-500/20 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-red-500/20 rounded-2xl mb-4">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    এক্সাম ডিলিট করুন
                  </h3>
                  <p className="text-gray-400">
                    আপনি কি নিশ্চিত যে আপনি এই এক্সামটি ডিলিট করতে চান? এই কাজটি
                    পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    onClick={() => handleDeleteExam(deleteConfirm)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
                  >
                    ডিলিট করুন
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AllExamForAdmin;
