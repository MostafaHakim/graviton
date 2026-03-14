import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationByTelentId } from "../../store/features/auth/talentSlice";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Download,
  Eye,
  ChevronLeft,
  User,
  Phone,
  MapPin,
  School,
  BookOpen,
  Hash,
  IdCard,
  Mail,
  Calendar,
  Filter,
  Grid,
  List,
  MoreVertical,
  ArrowLeft,
  Printer,
  DownloadCloud,
} from "lucide-react";

const AppliedStudentList = () => {
  const { talentId } = useParams();
  const dispatch = useDispatch();

  const { registrations, loading } = useSelector((state) => state.talents);

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [classFilter, setClassFilter] = useState("all");

  useEffect(() => {
    dispatch(getRegistrationByTelentId(talentId));
  }, [dispatch, talentId]);

  // Get unique classes for filter
  const uniqueClasses = [...new Set(registrations?.map((s) => s.class) || [])];

  const filteredStudents = registrations?.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.regId?.toLowerCase().includes(search.toLowerCase()) ||
      student.phone?.includes(search);

    const matchesClass = classFilter === "all" || student.class === classFilter;

    return matchesSearch && matchesClass;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/talent"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </Link>
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Applied Students
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  <span className="font-medium text-gray-900">
                    {registrations?.length || 0}
                  </span>{" "}
                  টি আবেদন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 border border-gray-200 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-500 hover:text-gray-900"
                }`}
              >
                <Filter size={18} />
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <DownloadCloud size={18} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, reg ID or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">
                        Filter by Class:
                      </span>
                      <select
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                      >
                        <option value="all">All Classes</option>
                        {uniqueClasses.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <p className="mt-4 text-gray-500">Loading students...</p>
          </div>
        )}

        {/* Student Grid/List */}
        {!loading && filteredStudents?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "space-y-3"
            }
          >
            {filteredStudents.map((student) => (
              <motion.div
                key={student._id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={
                  viewMode === "grid"
                    ? "bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    : "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                }
              >
                {viewMode === "grid" ? (
                  /* Grid View */
                  <div>
                    {/* Photo Section */}
                    <div className="relative h-48 bg-gray-100">
                      {student.imageUrl ? (
                        <img
                          src={student.imageUrl}
                          alt={student.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-300" />
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-gray-900/80 text-white text-xs font-medium rounded backdrop-blur-sm">
                          ID: {student.regId}
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">
                        {student.name}
                      </h3>

                      <div className="space-y-2">
                        {/* Class & Roll */}
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen size={14} className="text-gray-400" />
                          <span className="text-gray-600">
                            Class {student.class} | Roll: {student.roll}
                          </span>
                        </div>

                        {/* School */}
                        <div className="flex items-center gap-2 text-sm">
                          <School size={14} className="text-gray-400" />
                          <span className="text-gray-600 line-clamp-1">
                            {student.school_name}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-gray-600">{student.phone}</span>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-gray-600 line-clamp-1">
                            {student.address}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        <Link
                          to={`/talent/admit/${student.regId}`}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                        >
                          <Download size={16} />
                          <span>Admit</span>
                        </Link>
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="flex items-center gap-4">
                    {/* Photo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {student.imageUrl ? (
                        <img
                          src={student.imageUrl}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {student.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {student.regId}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={14} />
                          Class {student.class}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <School size={14} />
                          {student.school_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {student.phone}
                        </span>
                        {student.email && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Mail size={12} />
                              {student.email}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/talent/admit/${student.regId}`}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download Admit Card"
                      >
                        <Download size={18} />
                      </Link>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-3xl mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {search || classFilter !== "all"
                  ? "No students found"
                  : "No applications yet"}
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {search || classFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No students have applied for this talent hunt yet."}
              </p>
            </motion.div>
          )
        )}

        {/* Quick Stats */}
        {!loading && filteredStudents?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredStudents.length}
                  </div>
                  <div className="text-sm text-gray-500">Showing</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {uniqueClasses.length}
                  </div>
                  <div className="text-sm text-gray-500">Classes</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <School className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {
                      [...new Set(registrations?.map((s) => s.school_name))]
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-500">Schools</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {registrations?.reduce(
                      (acc, s) => acc + (s.roll ? 1 : 0),
                      0,
                    )}
                  </div>
                  <div className="text-sm text-gray-500">With Roll</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-h-[90vh] overflow-y-auto w-[500px] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Student Details
                </h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-5">
                {/* Photo */}
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                    {selectedStudent.imageUrl ? (
                      <img
                        src={selectedStudent.imageUrl}
                        alt={selectedStudent.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedStudent.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Registration ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.regId}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Class</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.class}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Roll Number</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.roll || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">School Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedStudent.school_name}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedStudent.address}
                    </p>
                  </div>

                  {selectedStudent.email && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.email}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-200">
                  <Link
                    to={`/talent/admit/${selectedStudent.regId}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Download size={18} />
                    <span>Download Admit Card</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppliedStudentList;
