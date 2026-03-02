import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectByClassName } from "../../store/features/auth/subjectSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Library,
  Star,
  BookMarked,
} from "lucide-react";

const AbordTest = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { subjects } = useSelector((state) => state.subjects);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!user?.class) return;
    dispatch(getSubjectByClassName(user?.class));
  }, [user?.class, dispatch]);

  // Subject icons mapping for variety
  const subjectIcons = [
    <BookOpen className="w-8 h-8" />,
    <Library className="w-8 h-8" />,
    <BookMarked className="w-8 h-8" />,
    <GraduationCap className="w-8 h-8" />,
    <Star className="w-8 h-8" />,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] rounded-2xl">
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
        {Array.from({ length: 30 }).map((_, i) => (
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* Header Section with Made Easy branding */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3BD480] blur-xl opacity-50 rounded-full" />
                  <Sparkles className="relative w-16 h-16 text-[#3BD480] mx-auto" />
                </div>
              </motion.div>

              <div className="font-kalpurush">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                  বিদেশে পড়ালেখা
                </h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-white/70 text-lg max-w-2xl mx-auto"
              >
                বিদেশে উচ্চশিক্ষা অর্জনের জন্য সঠিক সিদ্ধান্ত গ্রহণ একজন
                শিক্ষার্থীর জীবনের অন্যতম গুরুত্বপূর্ণ বিষয়। প্রতিটি বিষয়
                গুরুত্বের সঙ্গে বিবেচনা করলে নিজের প্রয়োজন ও লক্ষ্য অনুযায়ী সেরা
                দেশ নির্বাচন করা সহজ হয়।
              </motion.p>
            </motion.div>

            {/* Subjects Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {subjects && subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <motion.div
                    key={subject._id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="h-full"
                  >
                    <Link
                      to={`subject/${subject._id}`}
                      className="block h-full"
                    >
                      <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                        {/* Hover Effect Gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-[#3BD480]/0 to-[#3BD480]/0 group-hover:from-[#3BD480]/20 group-hover:to-transparent"
                          transition={{ duration: 0.3 }}
                        />

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3BD480]/10 to-transparent rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#3BD480]/5 to-transparent rounded-tr-full" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Icon with animation */}
                          <motion.div
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6 }}
                            className="mb-4"
                          >
                            <div className="inline-block p-4 bg-[#3BD480]/20 rounded-2xl">
                              <div className="text-[#3BD480]">
                                {subjectIcons[index % subjectIcons.length]}
                              </div>
                            </div>
                          </motion.div>

                          {/* Subject Name */}
                          <h3 className="text-white font-bold text-xl mb-3 font-kalpurush">
                            {subject.name}
                          </h3>

                          {/* Chapter Count */}
                          <div className="flex items-center space-x-2 text-white/60 mb-4">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm">
                              {subject.chapter?.length || 0} টি অধ্যায়
                            </span>
                          </div>

                          {/* Footer */}
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                              বিষয় দেখুন
                            </span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="bg-[#3BD480]/20 rounded-full p-1"
                            >
                              <ChevronRight className="w-5 h-5 text-[#3BD480]" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Border Glow on Hover */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                          style={{
                            boxShadow: "0 0 20px rgba(59, 212, 128, 0.3)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                // Empty State
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center py-16"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block mb-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#3BD480] blur-2xl opacity-30 rounded-full" />
                      <BookOpen className="relative w-20 h-20 text-[#3BD480]" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    কোনো বিষয় পাওয়া যায়নি
                  </h3>
                  <p className="text-white/70">
                    এই ক্লাসের জন্য এখনও কোনো বিষয় যোগ করা হয়নি।
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Quick Stats or Additional Info */}
            {subjects && subjects.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  {
                    icon: <BookOpen />,
                    label: "মোট বিষয়",
                    value: subjects.length,
                  },
                  {
                    icon: <GraduationCap />,
                    label: "শ্রেণি",
                    value: user?.class,
                  },
                  { icon: <Star />, label: "সফলতার হার", value: "৯৫%" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#3BD480]/20 rounded-lg text-[#3BD480]">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{stat.label}</p>
                        <p className="text-white font-bold text-xl capitalize">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AbordTest;
