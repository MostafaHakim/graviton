// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSubjectById } from "../../store/features/auth/subjectSlice";

// const Subject = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || null;
//   const { subjectId } = useParams();
//   const { subject } = useSelector((state) => state.subjects);
//   const dispatch = useDispatch();

//   console.log(subject);

//   useEffect(() => {
//     if (!subjectId) return;
//     dispatch(getSubjectById(subjectId));
//   }, [subjectId, dispatch]);

//   return (
//     <div className="flex flex-col space-y-4 bg-white p-8 min-h-screen rounded-2xl">
//       <div className="capitalize text-center">
//         <h2 className="text-2xl">Class {user.class}</h2>
//         <h2 className="text-xl">Subject {subject?.name}</h2>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {subject &&
//           subject.chapter.map((sub) => (
//             <Link to={sub._id} className="border rounded p-4 text-center">
//               <h2>{sub.title}</h2>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Subject;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../../store/features/auth/subjectSlice";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, GraduationCap, Layers } from "lucide-react";

const Subject = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { subjectId } = useParams();
  const { subject } = useSelector((state) => state.subjects);
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
    if (!subjectId) return;
    dispatch(getSubjectById(subjectId));
  }, [subjectId, dispatch]);

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-4 bg-[#3BD480]/20 rounded-2xl"
                  >
                    <GraduationCap className="w-10 h-10 text-[#3BD480]" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                      {subject?.name}
                    </h1>
                    <div className="flex items-center space-x-2 mt-2">
                      <BookOpen className="w-5 h-5 text-[#3BD480]" />
                      <p className="text-white/80 text-lg">
                        Class {user?.class} • {subject?.chapter?.length || 0}{" "}
                        Chapters
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30"
                >
                  <p className="text-white font-semibold">
                    <span className="text-[#3BD480]">📚</span> Total Chapters:{" "}
                    {subject?.chapter?.length || 0}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Chapters Grid */}
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <Layers className="w-6 h-6 text-[#3BD480]" />
                <h2 className="text-2xl font-bold text-white">
                  Available Chapters
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {subject?.chapter?.map((chapter, index) => (
                  <motion.div
                    key={chapter._id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={chapter._id} className="block h-full">
                      <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                        {/* Hover Effect Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#3BD480]/0 to-[#3BD480]/0 group-hover:from-[#3BD480]/10 group-hover:to-transparent"
                          transition={{ duration: 0.3 }}
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="p-3 bg-[#3BD480]/20 rounded-lg"
                            >
                              <BookOpen className="w-6 h-6 text-[#3BD480]" />
                            </motion.div>
                            <span className="text-white/40 text-sm">
                              Chapter {index + 1}
                            </span>
                          </div>

                          <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">
                            {chapter.title}
                          </h3>

                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-white/60 text-sm">
                              Click to explore
                            </span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ChevronRight className="w-5 h-5 text-[#3BD480]" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#3BD480]/20 to-transparent rounded-bl-full" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Empty State */}
            {(!subject?.chapter || subject.chapter.length === 0) && (
              <motion.div variants={itemVariants} className="text-center py-16">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full mb-4"
                >
                  <BookOpen className="w-16 h-16 text-[#3BD480]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Chapters Available
                </h3>
                <p className="text-white/70">
                  Chapters for this subject will be added soon. Stay tuned!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
