// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCourses,
//   deleteCourse,
// } from "../../store/features/auth/courseSlice";
// import { Link } from "react-router-dom";

// const CourseManagement = () => {
//   const dispatch = useDispatch();
//   const { courses } = useSelector((state) => state.courses);

//   useEffect(() => {
//     dispatch(getCourses());
//   }, [dispatch]);

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-between">
//         <h2>All Courses</h2>
//         <Link
//           to="new-course"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Course
//         </Link>
//       </div>

//       {courses.map((course) => (
//         <div key={course._id}>
//           <h3>{course.courseName}</h3>
//           <p>{course.about}</p>
//           <p>Fee: {course.fee}</p>

//           <button onClick={() => dispatch(deleteCourse(course._id))}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseManagement;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  deleteCourse,
} from "../../store/features/auth/courseSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Search,
  Book,
  DollarSign,
  Calendar,
  Filter,
  MoreVertical,
  X,
} from "lucide-react";

const CourseManagement = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  // Filter courses based on search and status
  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.about?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      dispatch(deleteCourse(selectedCourse._id));
      setShowDeleteModal(false);
      setSelectedCourse(null);
    }
  };

  // Animation variants
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Course Management
              </h1>
              <p className="text-gray-600">
                Manage all your courses in one place
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="new-course"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Course</span>
              </Link>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {courses?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Courses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {courses?.filter((c) => c.status === "active").length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Inactive Courses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {courses?.filter((c) => c.status !== "active").length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ৳
                    {courses?.reduce((acc, curr) => acc + (curr.fee || 0), 0) ||
                      0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Courses Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses?.map((course) => (
                  <motion.tr
                    key={course._id}
                    variants={itemVariants}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                          <Book className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {course.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course.about}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-gray-900" />
                        <span className="font-semibold text-gray-900">
                          {course.fee}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          course.status === "active"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {course.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteClick(course)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCourses?.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Book className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search"
                  : "Get started by adding your first course"}
              </p>
              {!searchTerm && (
                <Link
                  to="new-course"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Course</span>
                </Link>
              )}
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredCourses?.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{filteredCourses.length}</span> of{" "}
              <span className="font-medium">{courses?.length}</span> courses
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                Previous
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Course
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{selectedCourse?.courseName}"?
              This action cannot be undone.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseManagement;
