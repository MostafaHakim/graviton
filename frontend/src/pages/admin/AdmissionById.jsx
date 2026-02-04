import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  School,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Download,
  Printer,
  MessageSquare,
  Camera,
  MapPin,
  Users,
  BookOpen,
  Award,
  Shield,
  TrendingUp,
  BarChart3,
  ChevronRight,
  MoreVertical,
  Copy,
  QrCode,
  Tag,
  Percent,
  Receipt,
  Smartphone,
  Banknote,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmissionById,
  handleApprove,
} from "../../store/features/auth/admissionSlice";

const AdmissionById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { admission } = useSelector((state) => state.admissions);

  useEffect(() => {
    if (admission) {
      setStudent(admission);
      setIsLoading(false);
    }
  }, [admission]);

  useEffect(() => {
    if (id) {
      dispatch(getAdmissionById(id));
    }
  }, [id, dispatch]);

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
      },
    },
  };

  const tabs = [
    { id: "personal", label: "ব্যক্তিগত তথ্য", icon: User },
    { id: "academic", label: "একাডেমিক তথ্য", icon: GraduationCap },
    { id: "financial", label: "আর্থিক তথ্য", icon: CreditCard },
    { id: "documents", label: "ডকুমেন্টস", icon: FileText },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          text: "অনুমোদিত",
          color: "bg-green-500/20 text-green-500 border-green-500/30",
          icon: <CheckCircle size={14} />,
        };
      case "pending":
        return {
          text: "নতুন আবেদন",
          color: "bg-amber-500/20 text-amber-500 border-amber-500/30",
          icon: <Clock size={14} />,
        };
      case "rejected":
        return {
          text: "বাতিল",
          color: "bg-red-500/20 text-red-500 border-red-500/30",
          icon: <XCircle size={14} />,
        };
      default:
        return {
          text: status,
          color: "bg-gray-500/20 text-gray-500 border-gray-500/30",
          icon: null,
        };
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "nagad":
        return <Smartphone className="w-4 h-4" />;
      case "bkash":
        return <Smartphone className="w-4 h-4" />;
      case "bank":
        return <Banknote className="w-4 h-4" />;
      case "cash":
        return <Banknote className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const calculateProgress = () => {
    if (!student) return 0;
    const paid = student.cashPayment || 0;
    const total = student.totalFee || 1;
    return Math.round((paid / total) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45]/10 to-[#3BD480]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3BD480]/30 border-t-[#3BD480] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            শিক্ষার্থী পাওয়া যায়নি
          </h3>
          <p className="text-gray-400 mb-6">এই আইডির সাথে কোন শিক্ষার্থী নেই</p>
          <button
            onClick={() => navigate("/admin/admission")}
            className="px-6 py-3 bg-[#3BD480] text-[#17202F] rounded-xl font-semibold hover:bg-[#2da866] transition-colors duration-300"
          >
            অ্যাডমিশন পেইজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(student.status);
  const progressPercentage = calculateProgress();

  const clickToApprove = async () => {
    try {
      await dispatch(handleApprove({ id, status: "approved" })).unwrap();
      dispatch(getAdmissionById(id));
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  const clickToReject = async () => {
    try {
      await dispatch(handleApprove({ id, status: "rejected" })).unwrap();
      dispatch(getAdmissionById(id));
    } catch (error) {
      console.error("Reject failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 rounded-2xl">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/admission")}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {student.studentName}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-300 font-mono">
                    {student.admissionId}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.color}`}
                  >
                    {statusBadge.icon}
                    {statusBadge.text}
                  </span>
                  {student.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          clickToApprove();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-lime-500/20 text-lime-500 border-lime-500/30 capitalize cursor-pointer"
                      >
                        আনুমোদন দিন
                      </button>
                      <button
                        onClick={() => {
                          clickToReject();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-rose-500/20 text-rose-500 border-rose-500/30 capitalize cursor-pointer"
                      >
                        বাতিল করুন
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <Edit className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <Printer className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20">
                  <img
                    src={student.photo}
                    alt={student.studentName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-[#3BD480] rounded-full hover:bg-[#2da866] transition-colors duration-300">
                  <Camera className="w-4 h-4 text-[#17202F]" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">মোবাইল</span>
                    </div>
                    <p className="text-white font-medium">
                      {student.mobileNumber}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">শ্রেণী</span>
                    </div>
                    <p className="text-white font-medium">{student.class}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <School className="w-4 h-4" />
                      <span className="text-sm">বিদ্যালয়</span>
                    </div>
                    <p className="text-white font-medium">
                      {student.schoolCollege}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">ভর্তির তারিখ</span>
                    </div>
                    <p className="text-white font-medium">
                      {new Date(student.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">ঠিকানা</span>
                  </div>
                  <p className="text-white">{student.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              {tabs.map((tab) => {
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
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Personal Information Card */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      ব্যক্তিগত তথ্য
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            পিতার নাম
                          </label>
                          <div className="text-white bg-white/5 p-3 rounded-lg border border-white/10">
                            {student.fatherName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            মাতার নাম
                          </label>
                          <div className="text-white bg-white/5 p-3 rounded-lg border border-white/10">
                            {student.motherName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            ভর্তি আইডি
                          </label>
                          <div className="flex items-center justify-between text-white bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="font-mono">
                              {student.admissionId}
                            </span>
                            <button className="p-1 hover:bg-white/10 rounded">
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            ট্রানজেকশন আইডি
                          </label>
                          <div className="flex items-center justify-between text-white bg-white/5 p-3 rounded-lg border border-white/10">
                            <span>{student.transactionId}</span>
                            <button className="p-1 hover:bg-white/10 rounded">
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            সদস্য কার্ড
                          </label>
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${student.membershipCard ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}`}
                          >
                            {student.membershipCard
                              ? "প্রদত্ত ✓"
                              : "প্রদত্ত হয়নি"}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            আপডেটের তারিখ
                          </label>
                          <div className="text-white bg-white/5 p-3 rounded-lg border border-white/10">
                            {new Date(student.updatedAt).toLocaleDateString(
                              "bn-BD",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      দ্রুত অ্যাকশন
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#3BD480]/20 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-[#3BD480]" />
                          </div>
                          <span className="text-white">মেসেজ পাঠান</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Download className="w-5 h-5 text-blue-500" />
                          </div>
                          <span className="text-white">প্রোফাইল ডাউনলোড</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <QrCode className="w-5 h-5 text-purple-500" />
                          </div>
                          <span className="text-white">QR কোড জেনারেট</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-500/20 rounded-lg">
                            <Shield className="w-5 h-5 text-amber-500" />
                          </div>
                          <span className="text-white">স্ট্যাটাস পরিবর্তন</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "academic" && (
              <motion.div
                key="academic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Course Information */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    কোর্স তথ্য
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          নির্বাচিত কোর্সসমূহ
                        </label>
                        <div className="space-y-2">
                          {student.courses.map((course, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <span className="text-white">{course}</span>
                              <span className="px-2 py-1 text-xs bg-[#3BD480]/20 text-[#3BD480] rounded-full">
                                Active
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          একাডেমিক অবস্থা
                        </label>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-[#3BD480]" />
                            <div>
                              <div className="text-white font-semibold">
                                সক্রিয়
                              </div>
                              <div className="text-sm text-gray-400">
                                বর্তমান সেশনে সক্রিয়
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">এটেনডেন্স</span>
                              <span className="text-white font-semibold">
                                ৮৯%
                              </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[#3BD480] w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        একাডেমিক পারফরম্যান্স
                      </label>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              A+
                            </div>
                            <div className="text-sm text-gray-400">গ্রেড</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              ৪.৮
                            </div>
                            <div className="text-sm text-gray-400">GPA</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              ১৫
                            </div>
                            <div className="text-sm text-gray-400">ক্লাস</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress & Activities */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      প্রোগ্রেস রিপোর্ট
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">কোর্স কমপ্লিশন</span>
                          <span className="text-white font-semibold">৬৫%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-3/5"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">অ্যাসাইনমেন্ট</span>
                          <span className="text-white font-semibold">৮/১০</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">পরীক্ষা</span>
                          <span className="text-white font-semibold">৫/৮</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-5/8"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      অর্জন
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Award className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-white text-sm">
                            মাসের সেরা শিক্ষার্থী
                          </div>
                          <div className="text-xs text-gray-400">
                            ডিসেম্বর ২০২৪
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Award className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="text-white text-sm">
                            ১০০% এটেনডেন্স
                          </div>
                          <div className="text-xs text-gray-400">
                            নভেম্বর ২০২৪
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "financial" && (
              <motion.div
                key="financial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Payment Summary */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      আর্থিক সারাংশ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">মোট ফি</span>
                            <span className="text-2xl font-bold text-white">
                              ৳{student.totalFee}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">ডিসকাউন্ট</span>
                            <span className="text-xl font-bold text-[#FF754C]">
                              -৳{student.discount}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Percent className="w-4 h-4" />
                            <span>
                              {(
                                (student.discount / student.totalFee) *
                                100
                              ).toFixed(0)}
                              % ডিসকাউন্ট
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">পরিশোধিত</span>
                            <span className="text-2xl font-bold text-green-500">
                              ৳{student.cashPayment}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">বকেয়া</span>
                            <span className="text-2xl font-bold text-amber-500">
                              ৳{student.duePayment}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>শেষ তারিখ: ২৫ ফেব্রুয়ারি</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Progress */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-400">পেমেন্ট প্রোগ্রেস</span>
                        <span className="text-white font-semibold">
                          {progressPercentage}%
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#3BD480] to-[#2da866]"
                        />
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        পেমেন্ট বিবরণ
                      </h4>
                      <div className="overflow-hidden rounded-xl border border-white/10">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-4 text-gray-400 text-sm">
                                পেমেন্ট মাধ্যম
                              </th>
                              <th className="text-left py-3 px-4 text-gray-400 text-sm">
                                ট্রানজেকশন আইডি
                              </th>
                              <th className="text-left py-3 px-4 text-gray-400 text-sm">
                                পরিমাণ
                              </th>
                              <th className="text-left py-3 px-4 text-gray-400 text-sm">
                                তারিখ
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 bg-blue-500/20 rounded-lg">
                                    {getPaymentMethodIcon(
                                      student.paymentMethod,
                                    )}
                                  </div>
                                  <span className="text-white capitalize">
                                    {student.paymentMethod}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-white">
                                    {student.transactionId}
                                  </span>
                                  <button className="p-1 hover:bg-white/10 rounded">
                                    <Copy className="w-3 h-3 text-gray-400" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-green-500 font-semibold">
                                  ৳{student.cashPayment}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-gray-400 text-sm">
                                  {new Date(
                                    student.createdAt,
                                  ).toLocaleDateString("bn-BD")}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Actions */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      পেমেন্ট অ্যাকশন
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <CreditCard className="w-5 h-5 text-green-500" />
                          </div>
                          <span className="text-white">নতুন পেমেন্ট গ্রহণ</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Receipt className="w-5 h-5 text-blue-500" />
                          </div>
                          <span className="text-white">রিসিপ্ট তৈরি করুন</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-500/20 rounded-lg">
                            <Tag className="w-5 h-5 text-amber-500" />
                          </div>
                          <span className="text-white">ডিসকাউন্ট দিন</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Download className="w-5 h-5 text-purple-500" />
                          </div>
                          <span className="text-white">ফাইন্যান্স রিপোর্ট</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      ফি রিমাইন্ডার
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <div className="text-amber-500 font-semibold mb-1">
                          ৳{student.duePayment} বকেয়া
                        </div>
                        <div className="text-xs text-amber-400">
                          পরবর্তী রিমাইন্ডার: ২০ ফেব্রুয়ারি
                        </div>
                      </div>
                      <button className="w-full py-3 bg-amber-500/20 text-amber-500 rounded-lg font-semibold hover:bg-amber-500/30 transition-colors duration-300">
                        রিমাইন্ডার পাঠান
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "documents" && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Documents List */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        ডকুমেন্টস
                      </h3>
                      <button className="px-4 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300">
                        নতুন আপলোড
                      </button>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          name: "ভর্তি ফর্ম",
                          size: "2.4 MB",
                          date: "03 Feb 2026",
                          type: "pdf",
                        },
                        {
                          name: "ছাত্রের ছবি",
                          size: "1.8 MB",
                          date: "03 Feb 2026",
                          type: "image",
                        },
                        {
                          name: "পেমেন্ট রিসিপ্ট",
                          size: "1.2 MB",
                          date: "03 Feb 2026",
                          type: "pdf",
                        },
                        {
                          name: "আইডি কার্ড",
                          size: "0.8 MB",
                          date: "03 Feb 2026",
                          type: "image",
                        },
                        {
                          name: "স্কুল সার্টিফিকেট",
                          size: "3.1 MB",
                          date: "03 Feb 2026",
                          type: "pdf",
                        },
                      ].map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg ${doc.type === "pdf" ? "bg-red-500/20" : "bg-blue-500/20"}`}
                            >
                              <FileText
                                className={`w-6 h-6 ${doc.type === "pdf" ? "text-red-500" : "text-blue-500"}`}
                              />
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {doc.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {doc.size} • {doc.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                              <Download className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Document Stats */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      ডকুমেন্ট স্ট্যাটাস
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">মোট ডকুমেন্ট</span>
                        <span className="text-white font-semibold">৫</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">সর্বশেষ আপলোড</span>
                        <span className="text-white font-semibold">
                          ৩ ফেব্রুয়ারি
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">মোট সাইজ</span>
                        <span className="text-white font-semibold">৯.৩ MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      প্রয়োজনীয় ডকুমেন্ট
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "জন্ম নিবন্ধন", status: "uploaded" },
                        { name: "পাসপোর্ট সাইজ ছবি", status: "uploaded" },
                        {
                          name: "স্কুল ট্রান্সফার সার্টিফিকেট",
                          status: "pending",
                        },
                        {
                          name: "অভিভাবকের জাতীয় পরিচয়পত্র",
                          status: "pending",
                        },
                      ].map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-white text-sm">{doc.name}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${doc.status === "uploaded" ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"}`}
                          >
                            {doc.status === "uploaded" ? "আপলোডেড" : "প্রয়োজন"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdmissionById;
