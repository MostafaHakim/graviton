// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createSubject,
//   resetSubject,
// } from "../../../store/features/auth/subjectSlice";

// const AddSubject = () => {
//   const dispatch = useDispatch();
//   const { loading, success, error } = useSelector((s) => s.subject);

//   const [subject, setSubject] = useState({
//     name: "",
//     description: "",
//     color: "",
//     icon: "",
//     classes: [],
//   });

//   const addClass = () => {
//     setSubject({
//       ...subject,
//       classes: [
//         ...subject.classes,
//         { classId: "", name: "", hasPaper: true, papers: [], chapters: [] },
//       ],
//     });
//   };

//   const addPaper = (cIndex) => {
//     const updated = [...subject.classes];
//     updated[cIndex].papers.push({
//       paperId: "",
//       name: "",
//       hasPaper: true,
//       chapters: [],
//     });
//     setSubject({ ...subject, classes: updated });
//   };

//   const addChapter = (cIndex, pIndex) => {
//     const updated = [...subject.classes];
//     updated[cIndex].papers[pIndex].chapters.push({ name: "" });
//     setSubject({ ...subject, classes: updated });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createSubject(subject));
//   };

//   useEffect(() => {
//     if (success) {
//       alert("Subject Created!");
//       dispatch(resetSubject());
//       setSubject({
//         name: "",
//         description: "",
//         color: "",
//         icon: "",
//         classes: [],
//       });
//     }
//   }, [success]);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Add New Subject</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           placeholder="Subject Name"
//           className="input"
//           onChange={(e) => setSubject({ ...subject, name: e.target.value })}
//         />

//         <input
//           placeholder="Description"
//           className="input"
//           onChange={(e) =>
//             setSubject({ ...subject, description: e.target.value })
//           }
//         />

//         <input
//           placeholder="Tailwind Color (from-green-500 to-blue-500)"
//           className="input"
//           onChange={(e) => setSubject({ ...subject, color: e.target.value })}
//         />

//         <input
//           placeholder="Icon (BookOpen, Globe etc)"
//           className="input"
//           onChange={(e) => setSubject({ ...subject, icon: e.target.value })}
//         />

//         {/* Classes */}
//         <button
//           type="button"
//           onClick={addClass}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           ➕ Add Class
//         </button>

//         {subject.classes.map((cls, cIndex) => (
//           <div key={cIndex} className="border p-4 rounded mt-4">
//             <input
//               placeholder="Class ID (class-9)"
//               className="input"
//               onChange={(e) => {
//                 const updated = [...subject.classes];
//                 updated[cIndex].classId = e.target.value;
//                 setSubject({ ...subject, classes: updated });
//               }}
//             />

//             <input
//               placeholder="Class Name"
//               className="input mt-2"
//               onChange={(e) => {
//                 const updated = [...subject.classes];
//                 updated[cIndex].name = e.target.value;
//                 setSubject({ ...subject, classes: updated });
//               }}
//             />

//             <button
//               type="button"
//               onClick={() => addPaper(cIndex)}
//               className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//             >
//               ➕ Add Paper
//             </button>

//             {cls.papers.map((paper, pIndex) => (
//               <div key={pIndex} className="ml-4 mt-3 border p-3 rounded">
//                 <input
//                   placeholder="Paper ID"
//                   className="input"
//                   onChange={(e) => {
//                     const updated = [...subject.classes];
//                     updated[cIndex].papers[pIndex].paperId = e.target.value;
//                     setSubject({ ...subject, classes: updated });
//                   }}
//                 />

//                 <input
//                   placeholder="Paper Name"
//                   className="input mt-2"
//                   onChange={(e) => {
//                     const updated = [...subject.classes];
//                     updated[cIndex].papers[pIndex].name = e.target.value;
//                     setSubject({ ...subject, classes: updated });
//                   }}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => addChapter(cIndex, pIndex)}
//                   className="bg-purple-500 text-white px-2 py-1 mt-2 rounded"
//                 >
//                   ➕ Add Chapter
//                 </button>

//                 {paper.chapters.map((ch, chIndex) => (
//                   <input
//                     key={chIndex}
//                     placeholder="Chapter Name"
//                     className="input mt-2"
//                     onChange={(e) => {
//                       const updated = [...subject.classes];
//                       updated[cIndex].papers[pIndex].chapters[chIndex].name =
//                         e.target.value;
//                       setSubject({ ...subject, classes: updated });
//                     }}
//                   />
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-black text-white px-6 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Save Subject"}
//         </button>

//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default AddSubject;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  BookPlus,
  BookOpen,
  FileText,
  Layers,
  ChevronDown,
  ChevronRight,
  X,
  Save,
  Plus,
  Palette,
  Type,
  Hash,
  FolderPlus,
  FilePlus,
  BookMarked,
  Sparkles,
} from "lucide-react";
import {
  createSubject,
  resetSubject,
} from "../../../store/features/auth/subjectSlice";

const AddSubject = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((s) => s.subject);

  const [subject, setSubject] = useState({
    name: "",
    description: "",
    color: "from-green-500 to-blue-500",
    icon: "BookOpen",
    classes: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    classes: true,
    papers: {},
    chapters: {},
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addClass = () => {
    setSubject({
      ...subject,
      classes: [
        ...subject.classes,
        {
          classId: "",
          name: "",
          hasPaper: true,
          papers: [],
          chapters: [],
        },
      ],
    });
  };

  const addPaper = (cIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers.push({
      paperId: "",
      name: "",
      hasPaper: true,
      chapters: [],
    });
    setSubject({ ...subject, classes: updated });
  };

  const addChapter = (cIndex, pIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers[pIndex].chapters.push({ name: "" });
    setSubject({ ...subject, classes: updated });
  };

  const removeClass = (cIndex) => {
    const updated = [...subject.classes];
    updated.splice(cIndex, 1);
    setSubject({ ...subject, classes: updated });
  };

  const removePaper = (cIndex, pIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers.splice(pIndex, 1);
    setSubject({ ...subject, classes: updated });
  };

  const removeChapter = (cIndex, pIndex, chIndex) => {
    const updated = [...subject.classes];
    updated[cIndex].papers[pIndex].chapters.splice(chIndex, 1);
    setSubject({ ...subject, classes: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubject(subject));
  };

  useEffect(() => {
    if (success) {
      // Success notification with your theme
      const successDiv = document.createElement("div");
      successDiv.className = "fixed top-4 right-4 z-50";
      successDiv.innerHTML = `
        <div class="bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] px-6 py-4 rounded-xl font-semibold shadow-lg shadow-[#3BD480]/30 animate-fade-in-up">
          ✅ Subject Created Successfully!
        </div>
      `;
      document.body.appendChild(successDiv);

      setTimeout(() => {
        successDiv.remove();
      }, 3000);

      dispatch(resetSubject());
      setSubject({
        name: "",
        description: "",
        color: "from-green-500 to-blue-500",
        icon: "BookOpen",
        classes: [],
      });
    }
  }, [success, dispatch]);

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

  const presetColors = [
    "from-green-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
  ];

  const presetIcons = [
    "BookOpen",
    "BookMarked",
    "GraduationCap",
    "Globe",
    "Calculator",
    "Flask",
    "Atom",
    "Music",
    "Code",
    "Heart",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 rounded-2xl">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-0 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                নতুন বিষয় যোগ করুন
              </h1>
              <p className="text-gray-300 mt-2">
                MadeEasy সিস্টেমে নতুন বিষয় তৈরি করুন
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#17202F] border-t-transparent rounded-full animate-spin"></div>
                    সেভ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    বিষয় সেভ করুন
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">বিষয়ের নাম</p>
                  <h3 className="text-xl font-bold text-white mt-2 truncate">
                    {subject.name || "Not Set"}
                  </h3>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <Type className="w-6 h-6 text-[#3BD480]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">মোট শ্রেণী</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {subject.classes.length}
                  </h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Hash className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">রং থিম</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`w-6 h-6 rounded-lg bg-gradient-to-r ${subject.color}`}
                    ></div>
                    <span className="text-white text-sm truncate">
                      {subject.color}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Palette className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">আইকন</p>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {subject.icon}
                  </h3>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <BookMarked className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div variants={itemVariants}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
          >
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#3BD480]" />
                  মৌলিক তথ্য
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    বিষয়ের নাম
                  </label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      placeholder="যেমন: গণিত, ইংরেজি, বিজ্ঞান"
                      value={subject.name}
                      onChange={(e) =>
                        setSubject({ ...subject, name: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    রং থিম
                  </label>
                  <div className="relative">
                    <Palette className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={subject.color}
                      onChange={(e) =>
                        setSubject({ ...subject, color: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-300 appearance-none"
                    >
                      {presetColors.map((color) => (
                        <option
                          key={color}
                          value={color}
                          className="bg-[#17202F] text-white"
                        >
                          {color}
                        </option>
                      ))}
                    </select>
                    <div
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-lg bg-gradient-to-r ${subject.color}`}
                    ></div>
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    আইকন
                  </label>
                  <div className="relative">
                    <BookMarked className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={subject.icon}
                      onChange={(e) =>
                        setSubject({ ...subject, icon: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-300 appearance-none"
                    >
                      {presetIcons.map((icon) => (
                        <option
                          key={icon}
                          value={icon}
                          className="bg-[#17202F] text-white"
                        >
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    বর্ণনা
                  </label>
                  <textarea
                    placeholder="বিষয়ের সংক্ষিপ্ত বর্ণনা লিখুন..."
                    value={subject.description}
                    onChange={(e) =>
                      setSubject({ ...subject, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Classes Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleSection("classes")}
                  className="flex items-center gap-2 text-xl font-semibold text-white hover:text-[#3BD480] transition-colors duration-300"
                >
                  {expandedSections.classes ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                  <FolderPlus className="w-5 h-5" />
                  শ্রেণী সমূহ
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                    {subject.classes.length}
                  </span>
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addClass}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                >
                  <Plus className="w-4 h-4" />
                  নতুন শ্রেণী
                </motion.button>
              </div>

              {expandedSections.classes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {subject.classes.map((cls, cIndex) => (
                    <motion.div
                      key={cIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: cIndex * 0.1 }}
                      className="bg-white/5 rounded-xl border border-white/20 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Hash className="w-5 h-5 text-blue-500" />
                          </div>
                          শ্রেণী #{cIndex + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeClass(cIndex)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                        >
                          <X className="w-5 h-5 text-red-500" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            শ্রেণী আইডি
                          </label>
                          <input
                            placeholder="class-9, grade-6, etc."
                            value={cls.classId}
                            onChange={(e) => {
                              const updated = [...subject.classes];
                              updated[cIndex].classId = e.target.value;
                              setSubject({ ...subject, classes: updated });
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            শ্রেণীর নাম
                          </label>
                          <input
                            placeholder="৯ম শ্রেণী, এসএসসি, এইচএসসি"
                            value={cls.name}
                            onChange={(e) => {
                              const updated = [...subject.classes];
                              updated[cIndex].name = e.target.value;
                              setSubject({ ...subject, classes: updated });
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Papers Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="text-md font-semibold text-white flex items-center gap-2">
                            <FilePlus className="w-4 h-4 text-purple-500" />
                            পেপার সমূহ
                            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                              {cls.papers.length}
                            </span>
                          </h5>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => addPaper(cIndex)}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 transition-colors duration-300"
                          >
                            <Plus className="w-4 h-4" />
                            নতুন পেপার
                          </motion.button>
                        </div>

                        {cls.papers.map((paper, pIndex) => (
                          <motion.div
                            key={pIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: pIndex * 0.05 }}
                            className="ml-6 p-4 bg-white/5 rounded-lg border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h6 className="text-sm font-semibold text-white flex items-center gap-2">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                  <FileText className="w-4 h-4 text-purple-500" />
                                </div>
                                পেপার #{pIndex + 1}
                              </h6>
                              <button
                                type="button"
                                onClick={() => removePaper(cIndex, pIndex)}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  পেপার আইডি
                                </label>
                                <input
                                  placeholder="paper-1, paper-a, etc."
                                  value={paper.paperId}
                                  onChange={(e) => {
                                    const updated = [...subject.classes];
                                    updated[cIndex].papers[pIndex].paperId =
                                      e.target.value;
                                    setSubject({
                                      ...subject,
                                      classes: updated,
                                    });
                                  }}
                                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  পেপার নাম
                                </label>
                                <input
                                  placeholder="পেপার ১, তত্ত্বীয়, ব্যবহারিক"
                                  value={paper.name}
                                  onChange={(e) => {
                                    const updated = [...subject.classes];
                                    updated[cIndex].papers[pIndex].name =
                                      e.target.value;
                                    setSubject({
                                      ...subject,
                                      classes: updated,
                                    });
                                  }}
                                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                                />
                              </div>
                            </div>

                            {/* Chapters Section */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h6 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-amber-500" />
                                  অধ্যায় সমূহ
                                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {paper.chapters.length}
                                  </span>
                                </h6>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  type="button"
                                  onClick={() => addChapter(cIndex, pIndex)}
                                  className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-500 rounded-lg hover:bg-amber-500/30 transition-colors duration-300 text-sm"
                                >
                                  <Plus className="w-3 h-3" />
                                  নতুন অধ্যায়
                                </motion.button>
                              </div>

                              {paper.chapters.map((chapter, chIndex) => (
                                <motion.div
                                  key={chIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: chIndex * 0.03 }}
                                  className="flex items-center gap-3 ml-4"
                                >
                                  <div className="flex-1">
                                    <input
                                      placeholder={`অধ্যায় ${chIndex + 1} এর নাম`}
                                      value={chapter.name}
                                      onChange={(e) => {
                                        const updated = [...subject.classes];
                                        updated[cIndex].papers[pIndex].chapters[
                                          chIndex
                                        ].name = e.target.value;
                                        setSubject({
                                          ...subject,
                                          classes: updated,
                                        });
                                      }}
                                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-sm"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeChapter(cIndex, pIndex, chIndex)
                                    }
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                                  >
                                    <X className="w-4 h-4 text-red-500" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {subject.classes.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 bg-white/5 rounded-xl border border-white/10 border-dashed"
                    >
                      <div className="inline-block p-6 bg-white/5 rounded-2xl mb-4">
                        <FolderPlus className="w-12 h-12 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        কোন শ্রেণী নেই
                      </h4>
                      <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        প্রথমে একটি শ্রেণী যোগ করুন। প্রতিটি শ্রেণীতে আপনি পেপার
                        এবং অধ্যায় যোগ করতে পারবেন।
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={addClass}
                        className="px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                      >
                        প্রথম শ্রেণী যোগ করুন
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#17202F] border-t-transparent rounded-full animate-spin"></div>
                    সাবজেক্ট তৈরি হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    সম্পূর্ণ সাবজেক্ট তৈরি করুন
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddSubject;
