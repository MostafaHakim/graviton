import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCourse,
  updateCourse,
  getCourseById,
} from "../store/features/auth/courseSlice";
import { motion } from "framer-motion";
import {
  Atom,
  Book,
  Clock1,
  DollarSign,
  FileText,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const AddCourse = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    totalClass: "",
    classDuration: "",
    about: "",
    fee: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id)).then((res) => {
        const data = res.payload;
        console.log(data);
        setFormData({
          courseName: data.name || "",
          totalClass: data.totalClass || "",
          classDuration: data.classDuration || "",
          about: data.about || "",
          fee: data.fee || "",
        });
      });
    }
  }, [id, dispatch]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let res;

    if (isEdit) {
      res = await dispatch(updateCourse({ id, data: formData }));
    } else {
      res = await dispatch(createCourse(formData));
    }

    setFormData({
      courseName: "",
      about: "",
      fee: "",
    });
    setIsSubmitting(false);
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/admin/course");
    }
  };

  const handleClear = () => {
    setFormData({
      courseName: "",
      about: "",
      fee: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-2xl shadow-xl mb-4"
          >
            <Book className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add New Course
          </h1>
          <p className="text-gray-600">Create a new course for your students</p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Form Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="ml-2 text-sm text-gray-600 font-medium">
                Course Information
              </span>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Course Name Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <Book className="w-4 h-4 text-gray-900" />
                <span>Course Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Web Development Bootcamp"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter a descriptive name for your course
              </p>
            </div>

            {/* Total Class Field */}
            <div className="space-y-2 font-kalpurush">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <Atom className="w-4 h-4 text-gray-900" />
                <span>মোট ক্লাস</span>
              </label>
              <div className="relative">
                <input
                  name="totalClass"
                  value={formData.totalClass}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="মোট ক্লাস ৮০ টি"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>
              <p className="text-xs text-gray-500 font-kalpurush">
                মোট কয়টি ক্লাস থাকবে লিখুন
              </p>
            </div>

            {/*  Class Duretion */}
            <div className="space-y-2 font-kalpurush">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <Clock1 className="w-4 h-4 text-gray-900" />
                <span>প্রতিটি ক্লাসের সময়</span>
              </label>
              <div className="relative">
                <input
                  name="classDuration"
                  value={formData.classDuration}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="প্রতিটি ক্লাস ৪৫ মিনিট"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* About Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-gray-900" />
                <span>About Course</span>
              </label>
              <div className="relative">
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Describe what students will learn in this course..."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>
              <p className="text-xs text-gray-500">
                Provide a brief overview of the course content
              </p>
            </div>

            {/* Fee Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-gray-900" />
                <span>Course Fee</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-900 font-semibold">৳</span>
                </div>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500">Set the course fee in BDT</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Plus className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? isEdit
                      ? "Updating..."
                      : "Creating..."
                    : isEdit
                      ? "Update Course"
                      : "Create Course"}
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleClear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                <X className="w-5 h-5" />
                <span>Clear</span>
              </motion.button>
            </div>
          </form>

          {/* Form Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>All fields are required</span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Preview Card (Optional - shows current form data) */}
        {(formData.courseName || formData.about || formData.fee) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Preview
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {formData.courseName && (
                <div className="flex items-start space-x-2">
                  <Book className="w-4 h-4 text-gray-900 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Course Name
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formData.courseName}
                    </span>
                  </div>
                </div>
              )}
              {formData.about && (
                <div className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-gray-900 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">About</span>
                    <span className="text-sm text-gray-700 line-clamp-2">
                      {formData.about}
                    </span>
                  </div>
                </div>
              )}
              {formData.fee && (
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-900 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Fee</span>
                    <span className="text-sm font-semibold text-gray-900">
                      ৳ {formData.fee}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
