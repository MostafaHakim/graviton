// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAdmission } from "../../store/features/auth/admissionSlice";

// const AdmissionManagement = () => {
//   const { students } = useSelector((state) => state.students);

//   const dispatch = useDispatch();

//   console.log(students);

//   useEffect(() => {
//     dispatch(getAdmission());
//   }, []);

//   return (
//     <div>
//       <div>
//         {students?.map((std) => (
//           <h2>{std.studentName}</h2>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdmissionManagement;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  GraduationCap,
  Phone,
  Hash,
  Users,
  ChevronRight,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { getAdmission } from "../../store/features/auth/admissionSlice";

const AdmissionManagement = () => {
  const { admissions } = useSelector((state) => state.admissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdmission());
  }, []);

  // Filter students based on search and status
  const filteredStudents = admissions?.filter((student) => {
    const matchesSearch =
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobileNumber?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const totalStudents = admissions?.length || 0;
  const pendingStudents =
    admissions?.filter((s) => s.status === "pending")?.length || 0;
  const totalFees =
    admissions?.reduce((sum, s) => sum + (s.totalFee || 0), 0) || 0;
  const collectedFees =
    admissions?.reduce((sum, s) => sum + (s.cashPayment || 0), 0) || 0;

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

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-amber-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "অনুমোদিত";
      case "pending":
        return "নতুন";
      case "rejected":
        return "বাতিল";
      default:
        return status;
    }
  };

  const handleViewDetails = (student) => {
    navigate(`/admin/admission/${student._id}`);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 rounded-2xl">
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
                অ্যাডমিশন ম্যানেজমেন্ট
              </h1>
              <p className="text-gray-300 mt-2">
                সমস্ত ভর্তি আবেদন পরিচালনা করুন
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">মোট আবেদন</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {totalStudents}
                  </h3>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <Users className="w-6 h-6 text-[#3BD480]" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#3BD480] w-full"></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">নতুন আবেদন</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {pendingStudents}
                  </h3>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-3/4"></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">মোট ফি</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    ৳{totalFees.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <CreditCard className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-2/3"></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">সংগৃহীত ফি</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    ৳{collectedFees.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-4/5"></div>
              </div>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="শিক্ষার্থীর নাম, অ্যাডমিশন আইডি, বা ফোন নম্বর দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                >
                  <option value="all" className="bg-[#17202F]">
                    সকল অবস্থা
                  </option>
                  <option value="pending" className="bg-[#17202F]">
                    নতুন আবেদন
                  </option>
                  <option value="approved" className="bg-[#17202F]">
                    অনুমোদিত
                  </option>
                  <option value="rejected" className="bg-[#17202F]">
                    বাতিল
                  </option>
                </select>
                <button className="px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2">
                  <Filter size={20} />
                  ফিল্টার
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Students List */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Hash size={16} />
                        আইডি
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      শিক্ষার্থী
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      শ্রেণী
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      কোর্স
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      ফি
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      অবস্থা
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      তারিখ
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredStudents?.map((student, index) => (
                      <motion.tr
                        key={student._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm text-[#3BD480] font-semibold">
                            {student.admissionId}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3BD480] to-[#2da866] flex items-center justify-center text-white font-bold">
                              {student.studentName?.charAt(0) || "S"}
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {student.studentName}
                              </div>
                              <div className="text-sm text-gray-400 flex items-center gap-1">
                                <Phone size={12} />
                                {student.mobileNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <GraduationCap
                              size={16}
                              className="text-gray-400"
                            />
                            <span className="text-white">{student.class}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {student.courses?.map((course, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs bg-[#3BD480]/20 text-[#3BD480] rounded-full border border-[#3BD480]/30"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-white font-semibold">
                              ৳{student.totalFee}
                            </div>
                            <div className="text-xs text-gray-400">
                              Paid: ৳{student.cashPayment}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(student.status)}/20 text-${getStatusColor(student.status).replace("bg-", "")} border border-${getStatusColor(student.status).replace("bg-", "")}/30`}
                          >
                            {student.status === "approved" && (
                              <CheckCircle size={12} />
                            )}
                            {student.status === "pending" && (
                              <Clock size={12} />
                            )}
                            {student.status === "rejected" && (
                              <XCircle size={12} />
                            )}
                            {getStatusText(student.status)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-400">
                            {new Date(student.createdAt).toLocaleDateString(
                              "bn-BD",
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetails(student)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                              title="বিস্তারিত দেখুন"
                            >
                              <Eye
                                size={18}
                                className="text-gray-400 group-hover:text-[#3BD480]"
                              />
                            </button>
                            <button
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                              title="এডিট করুন"
                            >
                              <Edit
                                size={18}
                                className="text-gray-400 group-hover:text-blue-500"
                              />
                            </button>
                            <button
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                              title="ডিলিট করুন"
                            >
                              <Trash2
                                size={18}
                                className="text-gray-400 group-hover:text-red-500"
                              />
                            </button>
                            <button
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                              title="অ্যাকশন"
                            >
                              <ChevronRight
                                size={18}
                                className="text-gray-400"
                              />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {(!filteredStudents || filteredStudents.length === 0) && (
              <div className="py-20 text-center">
                <div className="inline-block p-6 bg-white/5 rounded-2xl mb-4">
                  <UserCheck size={48} className="text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  কোন শিক্ষার্থী পাওয়া যায়নি
                </h3>
                <p className="text-gray-400 mb-6">
                  অনুসন্ধানের সাথে মিল রেখে কোন ফলাফল পাওয়া যায়নি
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="px-6 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300"
                >
                  সব দেখুন
                </button>
              </div>
            )}

            {/* Footer */}
            {filteredStudents && filteredStudents.length > 0 && (
              <div className="px-6 py-4 border-t border-white/20 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  মোট {filteredStudents.length} টি আবেদন
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors duration-300">
                    আগের
                  </button>
                  <button className="px-4 py-2 text-sm bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300">
                    পরের
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdmissionManagement;
