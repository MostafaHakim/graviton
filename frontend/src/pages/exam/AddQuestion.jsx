import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  PlusCircle,
  Trash2,
  Save,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Target,
  Brain,
  Zap,
  Trophy,
  Clock,
  BarChart3,
  Settings,
  Users,
  Shield,
  Globe,
  Sparkles,
  Star,
  Filter,
  Search,
  Download,
  Upload,
  Grid,
  List,
  MoreVertical,
  RefreshCw,
  BookMarked,
  GraduationCap,
  BookPlus,
  FilePlus,
  Layers,
  Hash,
  Type,
  CheckSquare,
  Square,
  Music,
} from "lucide-react";

const emptyQuestion = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  marks: 1,
  explanation: "",
  difficulty: "medium",
  type: "mcq",
  tags: [],
};

export default function AddQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [testInfo, setTestInfo] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const loadTestInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/tests/${id}`,
      );
      console.log(data);
      setTestInfo(data);
    } catch (err) {
      console.error("Failed to load test info:", err);
    }
  };
  // Load test info
  useEffect(() => {
    loadTestInfo();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 2) {
      updatedQuestions[qIndex].options.splice(oIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const addQuestion = () => {
    const newQuestion = { ...emptyQuestion };
    newQuestion.options = ["", "", "", ""];
    setQuestions([...questions, newQuestion]);
    setActiveQuestion(questions.length);
  };

  const duplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index] };
    questionToDuplicate.question = `Copy: ${questionToDuplicate.question}`;
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, questionToDuplicate);
    setQuestions(updatedQuestions);
    setActiveQuestion(index + 1);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
      if (activeQuestion >= updatedQuestions.length) {
        setActiveQuestion(updatedQuestions.length - 1);
      }
    }
  };

  const clearAllQuestions = () => {
    if (window.confirm("আপনি কি সব প্রশ্ন মুছে ফেলতে চান?")) {
      setQuestions([{ ...emptyQuestion }]);
      setActiveQuestion(0);
    }
  };

  const toggleExpandQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const submit = async () => {
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setError(`প্রশ্ন ${i + 1}: প্রশ্নের টেক্সট প্রয়োজন`);
        setActiveQuestion(i);
        return;
      }
      if (q.options.filter((opt) => opt.trim()).length < 2) {
        setError(`প্রশ্ন ${i + 1}: কমপক্ষে ২টি অপশন প্রয়োজন`);
        setActiveQuestion(i);
        return;
      }
      if (!q.correctAnswer.trim()) {
        setError(`প্রশ্ন ${i + 1}: সঠিক উত্তর প্রয়োজন`);
        setActiveQuestion(i);
        return;
      }
      if (q.marks <= 0) {
        setError(`প্রশ্ন ${i + 1}: মার্কস ০-এর বেশি হতে হবে`);
        setActiveQuestion(i);
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/tests/${id}/questions-bulk`,
        { questions },
      );

      setSuccess(`✅ ${questions.length}টি প্রশ্ন সফলভাবে যোগ করা হয়েছে!`);
      setQuestions([{ ...emptyQuestion }]);
      setActiveQuestion(0);
      await loadTestInfo();
      // Auto clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "❌ প্রশ্ন আপলোড ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const difficultyOptions = [
    { value: "easy", label: "সহজ", color: "#10B981" },
    { value: "medium", label: "মাঝারি", color: "#F59E0B" },
    { value: "hard", label: "কঠিন", color: "#EF4444" },
  ];

  const questionTypes = [
    { value: "mcq", label: "MCQ", icon: CheckSquare, color: "#3BD480" },
    {
      value: "truefalse",
      label: "সত্য/মিথ্যা",
      icon: Square,
      color: "#8B5CF6",
    },
    { value: "short", label: "সংক্ষিপ্ত", icon: Type, color: "#F59E0B" },
    {
      value: "descriptive",
      label: "বর্ণনামূলক",
      icon: FileText,
      color: "#EF4444",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
        className="relative z-10 mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                  প্রশ্ন যোগ করুন
                </h1>
                <p className="text-gray-300 mt-2">
                  {testInfo?.title || "টেস্ট"} - নতুন প্রশ্ন তৈরি করুন
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#3BD480]" />
                  <span className="text-white font-medium">
                    {questions.length} প্রশ্ন
                  </span>
                </div>
              </div>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">মোট মার্কস</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {questions.reduce(
                      (sum, q) => sum + (parseInt(q.marks) || 0),
                      0,
                    )}
                  </h3>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <Target className="w-6 h-6 text-[#3BD480]" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">গড় কঠিনতা</p>
                  <h3 className="text-3xl font-bold text-white mt-2">মাঝারি</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Brain className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">MCQ প্রশ্ন</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {questions.filter((q) => q.type === "mcq").length}
                  </h3>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <CheckSquare className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">সময় প্রয়োজন</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {questions.length * 1.5} মিনিট
                  </h3>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {/* Audio Player Section */}
          {testInfo?.audio?.secure_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        টেস্ট অডিও
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        সম্পূর্ণ টেস্টের জন্য অডিও নির্দেশনা
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      MP3
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <audio
                    controls
                    src={testInfo.audio.secure_url}
                    className="w-full rounded-xl"
                  >
                    আপনার ব্রাউজার অডিও সাপোর্ট করে না।
                  </audio>
                  <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full"></div>
                </div>

                {testInfo.audio.public_id && (
                  <p className="text-gray-400 text-sm mt-4 text-center">
                    ফাইল: {testInfo.audio.public_id.split("/").pop()}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Existing Questions Section */}
          {testInfo?.questions && testInfo.questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                {/* Section Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-xl">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          বিদ্যমান প্রশ্নসমূহ
                        </h2>
                        <p className="text-gray-300 mt-1">
                          মোট {testInfo.questions.length}টি প্রশ্ন আছে
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#3BD480]/20 text-[#3BD480] text-sm rounded-full">
                        {testInfo.questions.length} Questions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div className="divide-y divide-white/10">
                  {testInfo.questions.map((question, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        {/* Question Number */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3BD480]/20 to-[#2da866]/10 flex items-center justify-center">
                            <span className="text-[#3BD480] font-bold text-lg">
                              {i + 1}
                            </span>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          {/* Question Text */}
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {question.question}
                            </h3>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1 text-gray-400">
                                <Target className="w-4 h-4" />
                                মার্কস: {question.marks || 1}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-400">
                                আইডি: {question._id?.slice(-6)}
                              </span>
                            </div>
                          </div>

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border transition-all duration-300 ${
                                  option === question.correctAnswer
                                    ? "border-green-500 bg-green-500/10"
                                    : "border-white/10 bg-white/5"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      option === question.correctAnswer
                                        ? "bg-green-500 text-white"
                                        : "bg-white/10 text-gray-400"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optionIndex)}
                                  </div>
                                  <span
                                    className={`flex-1 ${
                                      option === question.correctAnswer
                                        ? "text-green-300 font-medium"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                  {option === question.correctAnswer && (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Correct Answer Highlight */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
                                <span className="text-green-400 font-medium flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  সঠিক উত্তর: {question.correctAnswer}
                                </span>
                              </div>

                              {/* Explanation if exists */}
                              {question.explanation && (
                                <div className="group relative">
                                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                  </button>
                                  <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-[#17202F] border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                                    <p className="text-sm text-gray-300">
                                      {question.explanation}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Question Metadata */}
                            <div className="flex items-center gap-3 text-sm">
                              {question.audio && (
                                <span className="flex items-center gap-1 text-blue-400">
                                  <Music className="w-4 h-4" />
                                  অডিও
                                </span>
                              )}
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  question.isActive
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }`}
                              >
                                {question.isActive ? "একটিভ" : "ইনএকটিভ"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Stats */}
                <div className="p-6 border-t border-white/10 bg-white/5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {testInfo.questions.length}
                      </div>
                      <div className="text-sm text-gray-400">মোট প্রশ্ন</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {testInfo.questions.reduce(
                          (sum, q) => sum + (q.marks || 1),
                          0,
                        )}
                      </div>
                      <div className="text-sm text-gray-400">মোট মার্কস</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {testInfo.questions.filter((q) => q.audio).length}
                      </div>
                      <div className="text-sm text-gray-400">অডিও প্রশ্ন</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {Math.ceil(testInfo.questions.length * 1.5)}
                      </div>
                      <div className="text-sm text-gray-400">
                        মিনিট প্রয়োজন
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Question List */}
          <motion.div variants={itemVariants} className="lg:w-1/4">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  প্রশ্ন তালিকা
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setViewMode(viewMode === "list" ? "grid" : "list")
                    }
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    {viewMode === "list" ? (
                      <Grid className="w-4 h-4 text-gray-400" />
                    ) : (
                      <List className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {questions.map((q, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setActiveQuestion(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      activeQuestion === index
                        ? "bg-gradient-to-r from-[#3BD480]/20 to-[#2da866]/10 border border-[#3BD480]/30"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activeQuestion === index
                              ? "bg-[#3BD480] text-white"
                              : "bg-white/10 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 truncate">
                              {q.type.toUpperCase()}
                            </span>
                            <span
                              className="text-sm px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor:
                                  difficultyOptions.find(
                                    (d) => d.value === q.difficulty,
                                  )?.color + "20",
                                color: difficultyOptions.find(
                                  (d) => d.value === q.difficulty,
                                )?.color,
                              }}
                            >
                              {
                                difficultyOptions.find(
                                  (d) => d.value === q.difficulty,
                                )?.label
                              }
                            </span>
                          </div>
                          <p className="text-white text-sm truncate">
                            {q.question || `প্রশ্ন ${index + 1}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full">
                          {q.marks} মার্কস
                        </span>
                        {q.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={addQuestion}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                >
                  <PlusCircle className="w-5 h-5" />
                  নতুন প্রশ্ন
                </button>
                <button
                  onClick={clearAllQuestions}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Trash2 className="w-5 h-5" />
                  সব মুছুন
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Question Editor */}
          <motion.div variants={itemVariants} className="lg:w-3/4">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              {/* Question Editor Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        প্রশ্ন {activeQuestion + 1} সম্পাদনা করুন
                      </h2>
                      <p className="text-gray-300 mt-1">
                        প্রশ্নের সব তথ্য পূরণ করুন
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateQuestion(activeQuestion)}
                      className="p-2 hover:bg-white/10 rounded-lg"
                      title="কপি করুন"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                    {questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(activeQuestion)}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                        title="মুছুন"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="m-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-300">{error}</span>
                    </div>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="m-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">{success}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Question Editor Form */}
              <div className="p-6">
                {questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className={qIndex === activeQuestion ? "block" : "hidden"}
                  >
                    {/* Question Type and Difficulty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="flex items-center text-white font-medium mb-3">
                          <Type className="w-5 h-5 mr-2 text-[#3BD480]" />
                          প্রশ্নের ধরন
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {questionTypes.map((type) => (
                            <button
                              key={type.value}
                              onClick={() =>
                                handleQuestionChange(qIndex, "type", type.value)
                              }
                              className={`p-3 rounded-lg border transition-all duration-300 ${
                                q.type === type.value
                                  ? "border-[#3BD480] bg-gradient-to-br from-[#3BD480]/20 to-[#2da866]/10"
                                  : "border-white/10 bg-white/5 hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <type.icon
                                  className="w-4 h-4"
                                  style={{ color: type.color }}
                                />
                                <span className="text-white text-sm">
                                  {type.label}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center text-white font-medium mb-3">
                          <Brain className="w-5 h-5 mr-2 text-[#3BD480]" />
                          কঠিনতা
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {difficultyOptions.map((diff) => (
                            <button
                              key={diff.value}
                              onClick={() =>
                                handleQuestionChange(
                                  qIndex,
                                  "difficulty",
                                  diff.value,
                                )
                              }
                              className={`p-3 rounded-lg border transition-all duration-300 ${
                                q.difficulty === diff.value
                                  ? "border-white/30"
                                  : "border-white/10 hover:bg-white/10"
                              }`}
                              style={{
                                backgroundColor:
                                  q.difficulty === diff.value
                                    ? diff.color + "20"
                                    : "transparent",
                                borderColor:
                                  q.difficulty === diff.value ? diff.color : "",
                              }}
                            >
                              <span className="text-white text-sm">
                                {diff.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="mb-6">
                      <label className="flex items-center text-white font-medium mb-3">
                        <FileText className="w-5 h-5 mr-2 text-[#3BD480]" />
                        প্রশ্নের টেক্সট *
                      </label>
                      <textarea
                        placeholder="প্রশ্নটি এখানে লিখুন..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all min-h-[100px]"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "question",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    {/* Options */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center text-white font-medium">
                          <CheckSquare className="w-5 h-5 mr-2 text-[#3BD480]" />
                          অপশন সমূহ *
                        </label>
                        <button
                          onClick={() => handleAddOption(qIndex)}
                          className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                        >
                          <PlusCircle className="w-4 h-4" />
                          অপশন যোগ করুন
                        </button>
                      </div>
                      <div className="space-y-3">
                        {q.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                q.correctAnswer === option
                                  ? "bg-gradient-to-br from-[#3BD480] to-[#2da866] text-white"
                                  : "bg-white/10 text-gray-400"
                              }`}
                            >
                              {String.fromCharCode(65 + oIndex)}
                            </div>
                            <input
                              type="text"
                              placeholder={`Option ${oIndex + 1}`}
                              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  qIndex,
                                  oIndex,
                                  e.target.value,
                                )
                              }
                            />
                            <button
                              onClick={() =>
                                handleQuestionChange(
                                  qIndex,
                                  "correctAnswer",
                                  option,
                                )
                              }
                              className={`p-3 rounded-lg border transition-all duration-300 ${
                                q.correctAnswer === option
                                  ? "bg-gradient-to-br from-[#3BD480] to-[#2da866] border-[#3BD480]"
                                  : "border-white/10 bg-white/5 hover:bg-white/10"
                              }`}
                              title="সঠিক উত্তর হিসেবে সেট করুন"
                            >
                              <CheckCircle
                                className={`w-5 h-5 ${
                                  q.correctAnswer === option
                                    ? "text-white"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                            {q.options.length > 2 && (
                              <button
                                onClick={() =>
                                  handleRemoveOption(qIndex, oIndex)
                                }
                                className="p-3 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                              >
                                <Trash2 className="w-5 h-5 text-red-400" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correct Answer and Marks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="flex items-center text-white font-medium mb-3">
                          <Target className="w-5 h-5 mr-2 text-[#3BD480]" />
                          সঠিক উত্তর *
                        </label>
                        <input
                          type="text"
                          placeholder="সঠিক উত্তর লিখুন"
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                          value={q.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "correctAnswer",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-white font-medium mb-3">
                          <Hash className="w-5 h-5 mr-2 text-[#3BD480]" />
                          মার্কস *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="100"
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                            value={q.marks}
                            onChange={(e) =>
                              handleQuestionChange(
                                qIndex,
                                "marks",
                                parseInt(e.target.value) || 1,
                              )
                            }
                            placeholder="মার্কস"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            মার্কস
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explanation (Optional) */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center text-white font-medium">
                          <HelpCircle className="w-5 h-5 mr-2 text-[#3BD480]" />
                          ব্যাখ্যা (ঐচ্ছিক)
                        </label>
                        <button
                          onClick={() => toggleExpandQuestion(qIndex)}
                          className="p-2 hover:bg-white/10 rounded-lg"
                        >
                          {expandedQuestions[qIndex] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedQuestions[qIndex] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <textarea
                              placeholder="প্রশ্নের ব্যাখ্যা বা সমাধান লিখুন..."
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all min-h-[80px]"
                              value={q.explanation}
                              onChange={(e) =>
                                handleQuestionChange(
                                  qIndex,
                                  "explanation",
                                  e.target.value,
                                )
                              }
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={addQuestion}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                    >
                      <PlusCircle className="w-5 h-5" />
                      আরও প্রশ্ন যোগ করুন
                    </button>
                    <button
                      onClick={submit}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#17202F] border-t-transparent rounded-full animate-spin"></div>
                          সেভ হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          সব প্রশ্ন সেভ করুন
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
