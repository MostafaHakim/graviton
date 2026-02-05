import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddTestModal from "./AddTestModal";
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
  Brain,
  Zap,
  Layers,
  Copy,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  RefreshCw,
  BookMarked,
  GraduationCap,
  FilePlus,
  HelpCircle,
  Sparkles,
  Star,
  Award,
  TrendingUp,
  Shield,
  Globe,
  Cpu,
  Database,
  Cloud,
  ArrowRight,
  ArrowLeft,
  Home,
  Grid,
  List,
  Play,
  Pause,
  StopCircle,
  Timer,
} from "lucide-react";

export default function ExamDetail() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tests"); // tests, analytics, settings
  const [expandedTest, setExpandedTest] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams/${id}`,
      );
      console.log(data);
      setExam(data.exam);
      setTests(data.exam?.tests || []);
    } catch (err) {
      setError("এক্সাম ডেটা লোড করতে সমস্যা হয়েছে");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleteTest = async (testId) => {
    if (window.confirm("আপনি কি এই টেস্টটি ডিলিট করতে চান?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/user/tests/${testId}`,
        );
        load();
      } catch (err) {
        setError("টেস্ট ডিলিট করতে সমস্যা হয়েছে");
      }
    }
  };

  const handleDuplicateTest = async (test) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/tests/duplicate`,
        { testId: test._id, examId: id },
      );
      load();
    } catch (err) {
      setError("টেস্ট কপি করতে সমস্যা হয়েছে");
    }
  };

  const getTestTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "quiz":
        return { icon: Brain, color: "#8B5CF6" };
      case "mock":
        return { icon: Target, color: "#F59E0B" };
      case "practice":
        return { icon: Zap, color: "#10B981" };
      case "final":
        return { icon: Trophy, color: "#EF4444" };
      default:
        return { icon: BookOpen, color: "#3BD480" };
    }
  };

  const getTestStatus = (test) => {
    if (test.status === "draft")
      return { text: "খসড়া", color: "#F59E0B", bg: "#F59E0B20" };
    if (test.status === "published")
      return { text: "প্রকাশিত", color: "#10B981", bg: "#10B98120" };
    if (test.status === "archived")
      return { text: "আর্কাইভ", color: "#6B7280", bg: "#6B728020" };
    return { text: "অজানা", color: "#6B7280", bg: "#6B728020" };
  };

  const filteredTests = tests.filter(
    (test) =>
      test.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.type?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]/20 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">ত্রুটি</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={load}
              className="px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]/20 p-4 md:p-6 rounded-2xl">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-0 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/exams")}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                  এক্সাম ডিটেইলস
                </h1>
                <p className="text-gray-300 mt-2">
                  এক্সাম পরিচালনা এবং টেস্ট তৈরি করুন
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={load}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <RefreshCw className="w-4 h-4" />
                রিফ্রেশ
              </motion.button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Exam Overview Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Exam Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-2xl">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {exam?.name}
                        </h2>
                        <span className="px-3 py-1 bg-[#3BD480]/20 text-[#3BD480] text-sm rounded-full">
                          {exam?.examType || "নিয়মিত এক্সাম"}
                        </span>
                      </div>
                      <p className="text-gray-300 text-lg mb-4">
                        {exam?.description || "কোন বিবরণ নেই"}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            তৈরি:{" "}
                            {new Date(exam?.createdAt).toLocaleDateString(
                              "bn-BD",
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Database className="w-4 h-4" />
                          <span className="text-sm">
                            আইডি: {exam?._id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="lg:w-1/3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">টেস্ট</span>
                        <FileText className="w-4 h-4 text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {tests.length}
                      </h3>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">প্রশ্ন</span>
                        <Target className="w-4 h-4 text-purple-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {tests.reduce(
                          (sum, test) => sum + (test.questions?.length || 0),
                          0,
                        )}
                      </h3>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">অংশগ্রহণ</span>
                        <Users className="w-4 h-4 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">0</h3>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">গড় স্কোর</span>
                        <BarChart3 className="w-4 h-4 text-amber-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">--</h3>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-white/10 p-6">
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                >
                  <FilePlus className="w-5 h-5" />
                  নতুন টেস্ট
                </motion.button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <Settings className="w-5 h-5" />
                  সেটিংস
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <Download className="w-5 h-5" />
                  রিপোর্ট
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <Share2 className="w-5 h-5" />
                  শেয়ার
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex flex-wrap gap-2 p-6">
                <button
                  onClick={() => setActiveTab("tests")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "tests"
                      ? "bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    টেস্ট সমূহ ({tests.length})
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "analytics"
                      ? "bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    অ্যানালিটিক্স
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "settings"
                      ? "bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    সেটিংস
                  </div>
                </button>
              </div>
            </div>

            {/* Tests Tab Content */}
            {activeTab === "tests" && (
              <div className="p-6">
                {/* Search and Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="টেস্ট খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent">
                      <option value="all" className="bg-[#17202F]">
                        সব টেস্ট
                      </option>
                      <option value="quiz" className="bg-[#17202F]">
                        কুইজ
                      </option>
                      <option value="mock" className="bg-[#17202F]">
                        মক টেস্ট
                      </option>
                      <option value="practice" className="bg-[#17202F]">
                        প্র্যাকটিস
                      </option>
                    </select>
                    <div className="flex bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-4 py-3 ${viewMode === "grid" ? "bg-white/10" : ""}`}
                      >
                        <Grid className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-4 py-3 ${viewMode === "list" ? "bg-white/10" : ""}`}
                      >
                        <List className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <button className="px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2">
                      <Filter size={20} />
                      ফিল্টার
                    </button>
                  </div>
                </div>

                {/* Tests Grid/List */}
                <AnimatePresence>
                  {filteredTests.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-block p-6 bg-white/5 rounded-2xl mb-6">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        কোন টেস্ট পাওয়া যায়নি
                      </h3>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        এই এক্সামের জন্য এখনও কোন টেস্ট তৈরি করা হয়নি। প্রথম
                        টেস্ট তৈরি করুন।
                      </p>
                      <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                      >
                        <FilePlus className="w-6 h-6" />
                        প্রথম টেস্ট তৈরি করুন
                      </button>
                    </motion.div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTests.map((test, index) => {
                        const typeIcon = getTestTypeIcon(test.type);
                        const status = getTestStatus(test);
                        return (
                          <motion.div
                            key={test._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            variants={cardHoverVariants}
                            whileHover="hover"
                            className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="p-3 rounded-xl"
                                    style={{
                                      backgroundColor: `${typeIcon.color}20`,
                                    }}
                                  >
                                    <typeIcon.icon
                                      className="w-6 h-6"
                                      style={{ color: typeIcon.color }}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white line-clamp-1">
                                      {test.title}
                                    </h4>
                                    <span className="text-xs text-gray-400">
                                      {test.type || "সাধারণ টেস্ট"}
                                    </span>
                                  </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded-lg">
                                  <MoreVertical className="w-5 h-5 text-gray-400" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between mb-4">
                                <span
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: status.bg,
                                    color: status.color,
                                  }}
                                >
                                  {status.text}
                                </span>
                                <div className="flex items-center gap-2 text-gray-400">
                                  <Target className="w-4 h-4" />
                                  <span className="text-sm">
                                    {test.questions?.length || 0} প্রশ্ন
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                                {test.description || "কোন বিবরণ নেই"}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                <Link
                                  to={`/admin/tests/${test._id}`}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                                >
                                  <PlusCircle className="w-4 h-4" />
                                  প্রশ্ন যোগ করুন
                                </Link>
                                <button
                                  onClick={() => handleDuplicateTest(test)}
                                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                  title="কপি করুন"
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTest(test._id)}
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
                    <div className="space-y-3">
                      {filteredTests.map((test, index) => {
                        const typeIcon = getTestTypeIcon(test.type);
                        const status = getTestStatus(test);
                        return (
                          <motion.div
                            key={test._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div
                                  className="p-3 rounded-lg"
                                  style={{
                                    backgroundColor: `${typeIcon.color}20`,
                                  }}
                                >
                                  <typeIcon.icon
                                    className="w-5 h-5"
                                    style={{ color: typeIcon.color }}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white">
                                    {test.title}
                                  </h4>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-sm text-gray-100">
                                      {test.type}
                                    </span>
                                    <span className="text-sm text-gray-100">
                                      •
                                    </span>
                                    <span className="text-sm text-gray-100">
                                      {test.questions?.length || 0} প্রশ্ন
                                    </span>
                                    <span
                                      className="px-2 py-0.5 text-xs rounded-full"
                                      style={{
                                        backgroundColor: status.bg,
                                        color: status.color,
                                      }}
                                    >
                                      {status.text}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/admin/tests/${test._id}`}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                                >
                                  প্রশ্ন যোগ করুন
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleDuplicateTest(test)}
                                  className="p-2 hover:bg-white/10 rounded-lg"
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTest(test._id)}
                                  className="p-2 hover:bg-red-500/20 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Analytics Tab Content */}
            {activeTab === "analytics" && (
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    অ্যানালিটিক্স শীঘ্রই আসছে
                  </h3>
                  <p className="text-gray-400 mb-8">
                    এক্সাম পারফরম্যান্স এবং অংশগ্রহণকারীদের ডিটেইলড
                    অ্যানালিটিক্স শীঘ্রই চালু করা হবে।
                  </p>
                </div>
              </div>
            )}

            {/* Settings Tab Content */}
            {activeTab === "settings" && (
              <div className="p-6">
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#3BD480]" />
                        এক্সাম সেটিংস
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2">
                            এক্সামের নাম
                          </label>
                          <input
                            type="text"
                            defaultValue={exam?.name}
                            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">
                            বিবরণ
                          </label>
                          <textarea
                            defaultValue={exam?.description}
                            rows={3}
                            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">
                            এক্সামের ধরন
                          </label>
                          <select className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white">
                            <option value="regular" className="bg-[#17202F]">
                              নিয়মিত এক্সাম
                            </option>
                            <option value="quiz" className="bg-[#17202F]">
                              কুইজ টেস্ট
                            </option>
                            <option value="mock" className="bg-[#17202F]">
                              মক টেস্ট
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#3BD480]" />
                        নিরাপত্তা সেটিংস
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">টাইমার</h4>
                            <p className="text-gray-400 text-sm">
                              টেস্টের সময়সীমা নির্ধারণ করুন
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3BD480]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">
                              অটো সাবমিট
                            </h4>
                            <p className="text-gray-400 text-sm">
                              সময় শেষে স্বয়ংক্রিয় সাবমিট
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3BD480]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300">
                        সেটিংস সেভ করুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Add Test Modal */}
      {showModal && (
        <AddTestModal
          examId={id}
          close={() => setShowModal(false)}
          reload={load}
        />
      )}
    </div>
  );
}
