import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../store/features/auth/courseSlice";
import { motion } from "framer-motion";
import {
  Book,
  Clock,
  Users,
  DollarSign,
  Award,
  ArrowRight,
  Sparkle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Courses = () => {
  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  console.log(courses);
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  // Animation variants
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
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid)" />
        </svg>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3BD480]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-block p-3 bg-[#3BD480]/20 rounded-full mb-4"
            >
              <Book className="w-8 h-8 text-[#3BD480]" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-kalpurush">
              আমাদের কোর্সসমূহ
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              আপনার ক্যারিয়ার গড়ার জন্য নির্বাচিত করুন সেরা কোর্স
            </p>
          </motion.div>

          {/* Courses Grid */}
          {courses?.length > 0 ? (
            <motion.div
              key={courses.length}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden"
                >
                  {/* Course Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        course.status === "active"
                          ? "bg-[#3BD480] text-[#17202F]"
                          : "bg-red-500/80 text-white"
                      }`}
                    >
                      {course.status === "active" ? "চলছে" : "শেষ হয়েছে"}
                    </span>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-[#3BD480]/20 rounded-xl flex items-center justify-center mb-4"
                    >
                      <Award className="w-7 h-7 text-[#3BD480]" />
                    </motion.div>

                    {/* Course Name */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 whitespace-pre-wrap">
                      {course.name}
                    </h3>

                    {/* About */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {course.about}
                    </p>

                    {/* Course Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-white/80 text-sm">
                        <Users className="w-4 h-4 mr-2 text-[#3BD480]" />
                        <span>{course.totalClass}</span>
                      </div>
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-[#3BD480]" />
                        <span>{course.classDuration}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/20 my-4"></div>

                    {/* Fee and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white/60 text-xs">কোর্স ফি</span>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-[#3BD480]" />
                          <span className="text-2xl font-bold text-white">
                            {course.fee}
                          </span>
                          <span className="text-white/60 ml-1">টাকা</span>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          to={`/courses/${course._id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-all duration-300"
                        >
                          <span>বিস্তারিত</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3BD480]/0 via-[#3BD480]/0 to-[#3BD480]/0 group-hover:from-[#3BD480]/5 group-hover:via-[#3BD480]/5 group-hover:to-[#3BD480]/5 transition-all duration-500 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Book className="w-12 h-12 text-[#3BD480]" />
              </div>
              <p className="text-white/80 text-xl">কোনো কোর্স পাওয়া যায়নি</p>
              <p className="text-white/60 mt-2">শীঘ্রই নতুন কোর্স আসছে...</p>
            </motion.div>
          )}

          {/* Additional Info Section */}
          {courses?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Sparkle className="w-5 h-5 text-[#3BD480]" />
                <span className="text-white/90">
                  মোট {courses.length}টি কোর্স উপলব্ধ
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
