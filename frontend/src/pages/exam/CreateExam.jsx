import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  ArrowLeft,
  Loader2,
  PlusCircle,
  BookPlus,
  Layers,
  Clock,
  Target,
  Brain,
  Trophy,
  Zap,
  Calendar,
  Users,
  Shield,
  Globe,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Star,
  BookMarked,
  GraduationCap,
  HelpCircle,
  BarChart3,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";

export default function CreateExam() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [examType, setExamType] = useState("regular");
  const [subCatagory, setSubCategory] = useState("listing");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  // MadeEasy কালার স্কিম
  const colors = {
    primary: "#17202F", // Deep Navy
    secondary: "#134C45", // Dark Teal
    accent: "#3BD480", // Bright Green
    lightAccent: "#2da866", // Light Green
    light: "#E8F5E9", // Light Green BG
    white: "#FFFFFF",
    gray: {
      100: "#F7FAFC",
      200: "#EDF2F7",
      300: "#E2E8F0",
      400: "#CBD5E0",
      500: "#A0AEC0",
      600: "#718096",
      700: "#4A5568",
      800: "#2D3748",
      900: "#1A202C",
    },
  };

  const submit = async () => {
    if (!name.trim()) {
      setError("এক্সামের নাম আবশ্যক");
      return;
    }

    if (name.length < 3) {
      setError("এক্সামের নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/exams`,
        {
          name,
          description,
          examType,
          subCategory,
          createdAt: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Success animation delay
      setTimeout(() => {
        navigate(`/admin/exams/${data._id}`);
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "এক্সাম তৈরি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/exams");
  };

  const steps = [
    { id: 1, name: "মৌলিক তথ্য", icon: BookOpen },
    { id: 2, name: "বিস্তারিত", icon: FileText },
    { id: 3, name: "পর্যালোচনা", icon: Eye },
  ];

  const examTypes = [
    {
      id: "ielts",
      name: "আই ই এল টি এস",
      icon: BookOpen,
      color: colors.accent,
    },
    { id: "sat", name: "SAT", icon: Brain, color: "#8B5CF6" },
    { id: "olympiad", name: "Olympiad", icon: Target, color: "#F59E0B" },
    { id: "practice", name: "প্র্যাকটিস সেশন", icon: Zap, color: "#10B981" },
    { id: "final", name: "ফাইনাল এক্সাম", icon: Trophy, color: "#EF4444" },
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

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: `0 20px 40px -15px ${colors.accent}40`,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]/20 p-4 md:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-[#17202F]/20 to-[#3BD480]/10 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                <span className="group-hover:underline">
                  এক্সাম তালিকায় ফিরে যান
                </span>
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-2xl shadow-lg">
                  <BookPlus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                    নতুন এক্সাম তৈরি করুন
                  </h1>
                  <p className="text-gray-300 mt-2">
                    আপনার প্রয়োজন অনুযায়ী কাস্টমাইজড এক্সাম তৈরি করুন
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-[#3BD480]" />
              <span className="text-white text-sm font-medium">
                MadeEasy AI
              </span>
            </motion.div>
          </div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BookMarked className="w-6 h-6 text-[#3BD480]" />
                  এক্সাম তৈরি প্রক্রিয়া
                </h2>
                <div className="text-sm text-gray-400">
                  ধাপ {activeStep} / {steps.length}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {steps.map((step) => (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      activeStep === step.id
                        ? "bg-gradient-to-r from-[#3BD480]/20 to-[#2da866]/10 border border-[#3BD480]/30"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        activeStep === step.id
                          ? "bg-gradient-to-br from-[#3BD480] to-[#2da866]"
                          : "bg-white/10"
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 ${
                          activeStep === step.id
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-400">ধাপ {step.id}</div>
                      <div
                        className={`font-medium ${
                          activeStep === step.id
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {step.name}
                      </div>
                    </div>
                    {activeStep === step.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <div className="w-2 h-2 bg-[#3BD480] rounded-full"></div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#3BD480]/20 to-[#2da866]/10 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-xl">
                    <PlusCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      এক্সামের তথ্য
                    </h2>
                    <p className="text-gray-300 mt-1">
                      নিম্নলিখিত তথ্যগুলো পূরণ করুন
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
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
                      <span className="text-red-300 text-sm">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Exam Type Selection */}
              <motion.div variants={itemVariants} className="mb-8">
                <label className="flex items-center text-white font-medium mb-4">
                  <Target className="w-5 h-5 mr-2 text-[#3BD480]" />
                  এক্সামের ধরন নির্বাচন করুন
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {examTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      variants={cardHoverVariants}
                      whileHover="hover"
                      onClick={() => setExamType(type.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        examType === type.id
                          ? "border-[#3BD480] bg-gradient-to-br from-[#3BD480]/20 to-[#2da866]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: type.color + "20" }}
                        >
                          <type.icon
                            className="w-6 h-6"
                            style={{ color: type.color }}
                          />
                        </div>
                        <span
                          className={`font-medium ${
                            examType === type.id
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {type.name}
                        </span>
                        {examType === type.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-[#3BD480] rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Exam Name Input */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="flex items-center text-white font-medium mb-3">
                  <FileText className="w-5 h-5 mr-2 text-[#3BD480]" />
                  এক্সামের নাম *
                  <span className="ml-2 text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                    আবশ্যক
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="উদাহরণ: ২০২৪ সালের গণিত ফাইনাল এক্সাম"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    value={name}
                  />
                  <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-400">
                    একটি বর্ণনামূলক নাম দিন
                  </p>
                  <span
                    className={`text-sm ${
                      name.length < 3 ? "text-red-400" : "text-[#3BD480]"
                    }`}
                  >
                    {name.length}/50
                  </span>
                </div>
              </motion.div>

              {/* Description Input */}
              <motion.div variants={itemVariants} className="mb-8">
                <label className="flex items-center text-white font-medium mb-3">
                  <FileText className="w-5 h-5 mr-2 text-[#3BD480]" />
                  এক্সামের বিবরণ
                </label>
                <textarea
                  placeholder="এক্সামের উদ্দেশ্য, নির্দেশাবলী, এবং বিশেষ নোট এখানে লিখুন..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all min-h-[120px] resize-y"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  rows={4}
                />
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-400">
                    ঐচ্ছিক, তবে সুস্পষ্টতার জন্য সুপারিশকৃত
                  </p>
                  <span className="text-sm text-gray-400">
                    {description.length}/500 অক্ষর
                  </span>
                </div>
              </motion.div>

              {/* Advanced Options Toggle */}
              <motion.div variants={itemVariants} className="mb-8">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#3BD480]" />
                    <div className="text-left">
                      <div className="font-medium text-white">এডভান্স অপশন</div>
                      <div className="text-sm text-gray-400">
                        আরও কাস্টমাইজেশন অপশন
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      showAdvanced ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-6 bg-gradient-to-br from-[#17202F]/50 to-[#134C45]/30 border border-white/10 rounded-xl"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="flex items-center text-white font-medium mb-3">
                            <Clock className="w-4 h-4 mr-2 text-[#3BD480]" />
                            সময়সীমা (মিনিট)
                          </label>
                          <input
                            type="number"
                            placeholder="60"
                            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480]"
                          />
                        </div>
                        <div>
                          <label className="flex items-center text-white font-medium mb-3">
                            <Users className="w-4 h-4 mr-2 text-[#3BD480]" />
                            সর্বোচ্চ অংশগ্রহণকারী
                          </label>
                          <input
                            type="number"
                            placeholder="100"
                            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480]"
                          />
                        </div>
                        <div>
                          <label className="flex items-center text-white font-medium mb-3">
                            <Shield className="w-4 h-4 mr-2 text-[#3BD480]" />
                            নিরাপত্তা স্তর
                          </label>
                          <select className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480]">
                            <option value="low" className="bg-[#17202F]">
                              স্বাভাবিক
                            </option>
                            <option value="medium" className="bg-[#17202F]">
                              মাঝারি
                            </option>
                            <option value="high" className="bg-[#17202F]">
                              উচ্চ
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center text-white font-medium mb-3">
                            <Globe className="w-4 h-4 mr-2 text-[#3BD480]" />
                            এক্সামের ভাষা
                          </label>
                          <select className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480]">
                            <option value="bn" className="bg-[#17202F]">
                              বাংলা
                            </option>
                            <option value="en" className="bg-[#17202F]">
                              English
                            </option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Live Preview */}
              <motion.div variants={itemVariants} className="mb-8">
                <label className="flex items-center text-white font-medium mb-3">
                  <Eye className="w-5 h-5 mr-2 text-[#3BD480]" />
                  প্রিভিউ
                </label>
                <div className="p-6 bg-gradient-to-br from-[#17202F]/50 to-[#134C45]/30 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-[#3BD480] to-[#2da866] rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {name || "এক্সামের নাম"}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="px-2 py-1 bg-[#3BD480]/20 text-[#3BD480] text-xs rounded-full">
                          {examTypes.find((t) => t.id === examType)?.name ||
                            "নিয়মিত এক্সাম"}
                        </span>
                        <span className="text-sm text-gray-400">
                          ID: EX-{Date.now().toString().slice(-6)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {description || "এক্সামের বিবরণ এখানে দেখানো হবে..."}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={handleCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    বাতিল করুন
                  </motion.button>

                  <motion.button
                    onClick={submit}
                    disabled={isLoading || !name.trim()}
                    whileHover={
                      !isLoading && name.trim() ? { scale: 1.02 } : {}
                    }
                    whileTap={!isLoading && name.trim() ? { scale: 0.98 } : {}}
                    className={`flex-1 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      isLoading || !name.trim()
                        ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] hover:shadow-lg hover:shadow-[#3BD480]/30"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        তৈরি হচ্ছে...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        এক্সাম তৈরি করুন
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">স্ট্যাটাস</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-[#3BD480] rounded-full"></div>
                    <span className="font-medium text-white">খসড়া</span>
                  </div>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <Clock className="w-6 h-6 text-[#3BD480]" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">প্রশ্ন সংখ্যা</p>
                  <h3 className="text-2xl font-bold text-white mt-2">0</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">সময়সীমা</p>
                  <h3 className="text-2xl font-bold text-white mt-2">--:--</h3>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#3BD480]/20 to-[#2da866]/10 rounded-xl">
                <HelpCircle className="w-6 h-6 text-[#3BD480]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  এক্সাম তৈরির টিপস
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#3BD480]" />
                    স্পষ্ট এবং বর্ণনামূলক নাম দিন
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#3BD480]" />
                    প্রয়োজনীয় নির্দেশাবলী বিস্তারিতভাবে লিখুন
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#3BD480]" />
                    এক্সাম তৈরি করার পর প্রশ্ন যোগ করতে পারবেন
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#3BD480]" />
                    সময়সীমা এবং অন্যান্য সেটিংস পরে এডিট করতে পারবেন
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
