// import React, { useEffect, useState } from "react";
// import ConfirmBox from "../../components/ConfirmBox";
// import AddModal from "../../components/AddModal";
// import { Link } from "react-router-dom";

// const BASE = import.meta.env.VITE_BASE_URL + "/api/subjects";
// console.log(BASE);
// const MadeEasyManagement = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [refresh, setRefresh] = useState(false);

//   const [confirm, setConfirm] = useState(null);
//   const [modal, setModal] = useState(null);

//   const loadSubjects = async () => {
//     const res = await fetch(import.meta.env.VITE_BASE_URL + "/api/subjects");
//     const data = await res.json();
//     setSubjects(data);
//   };

//   useEffect(() => {
//     loadSubjects();
//   }, [refresh]);

//   const reload = () => setRefresh(!refresh);

//   /* ============ ADD HANDLERS ============ */
//   const addClass = async (sid, value) => {
//     await fetch(`${BASE}/${sid}/class`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ classId: value, name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   const addPaper = async (sid, classId, value) => {
//     await fetch(`${BASE}/${sid}/class/${classId}/paper`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paperId: value, name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   const addChapter = async (sid, classId, paperId, value) => {
//     await fetch(`${BASE}/${sid}/class/${classId}/paper/${paperId}/chapter`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   /* ============ DELETE HANDLERS ============ */
//   const del = async () => {
//     await fetch(confirm.url, { method: "DELETE" });
//     setConfirm(null);
//     reload();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">📚 MadeEasy Subject Manager</h2>
//       <Link to="add">Add Subject</Link>
//       {subjects.map((sub) => (
//         <div key={sub._id} className="border rounded p-4 mb-4">
//           <h3 className="text-xl font-semibold">{sub.name}</h3>

//           <button
//             className="text-blue-600"
//             onClick={() =>
//               setModal({
//                 title: "Add Class",
//                 onSave: (v) => addClass(sub._id, v),
//               })
//             }
//           >
//             ➕ Add Class
//           </button>

//           {sub.classes.map((cls) => (
//             <div key={cls.classId} className="ml-6 mt-3 border-l pl-4">
//               <div className="flex justify-between">
//                 <b>{cls.name}</b>
//                 <button
//                   className="text-red-500"
//                   onClick={() =>
//                     setConfirm({
//                       message: `Delete class ${cls.name}?`,
//                       url: `${BASE}/${sub._id}/class/${cls.classId}`,
//                     })
//                   }
//                 >
//                   ❌
//                 </button>
//               </div>

//               <button
//                 className="text-green-600"
//                 onClick={() =>
//                   setModal({
//                     title: "Add Paper",
//                     onSave: (v) => addPaper(sub._id, cls.classId, v),
//                   })
//                 }
//               >
//                 ➕ Add Paper
//               </button>

//               {cls.papers?.map((paper) => (
//                 <div key={paper.paperId} className="ml-6 mt-2">
//                   <div className="flex justify-between">
//                     {paper.name}
//                     <button
//                       className="text-red-500"
//                       onClick={() =>
//                         setConfirm({
//                           message: `Delete paper ${paper.name}?`,
//                           url: `${BASE}/${sub._id}/class/${cls.classId}/paper/${paper.paperId}`,
//                         })
//                       }
//                     >
//                       ❌
//                     </button>
//                   </div>

//                   <button
//                     className="text-purple-600"
//                     onClick={() =>
//                       setModal({
//                         title: "Add Chapter",
//                         onSave: (v) =>
//                           addChapter(sub._id, cls.classId, paper.paperId, v),
//                       })
//                     }
//                   >
//                     ➕ Add Chapter
//                   </button>

//                   <ul className="ml-6">
//                     {paper.chapters.map((ch, i) => (
//                       <li key={i} className="flex justify-between">
//                         {ch.name}
//                         <button
//                           className="text-red-500"
//                           onClick={() =>
//                             setConfirm({
//                               message: `Delete chapter ${ch.name}?`,
//                               url: `${BASE}/${sub._id}/class/${cls.classId}/paper/${paper.paperId}/chapter/${i}`,
//                             })
//                           }
//                         >
//                           ❌
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}

//       {modal && (
//         <AddModal
//           title={modal.title}
//           onSave={modal.onSave}
//           onClose={() => setModal(null)}
//         />
//       )}

//       {confirm && (
//         <ConfirmBox
//           message={confirm.message}
//           onYes={del}
//           onNo={() => setConfirm(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default MadeEasyManagement;
// import React, { useEffect, useState } from "react";
// import ConfirmBox from "../../components/ConfirmBox";
// import AddModal from "../../components/AddModal";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Plus,
//   Trash2,
//   Edit2,
//   BookOpen,
//   Folder,
//   FileText,
//   Layers,
//   ChevronDown,
//   ChevronRight,
//   Search,
//   Filter,
//   Download,
//   Upload,
//   MoreVertical,
//   Copy,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   BookMarked,
//   GraduationCap,
//   FolderPlus,
//   FilePlus,
//   BookPlus,
// } from "lucide-react";

// const BASE = import.meta.env.VITE_BASE_URL + "/api/subjects";

// const MadeEasyManagement = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedItems, setExpandedItems] = useState({});
//   const [confirm, setConfirm] = useState(null);
//   const [modal, setModal] = useState(null);

//   const loadSubjects = async () => {
//     try {
//       const res = await fetch(BASE);
//       const data = await res.json();
//       setSubjects(data);
//     } catch (error) {
//       console.error("Failed to load subjects:", error);
//     }
//   };

//   useEffect(() => {
//     loadSubjects();
//   }, [refresh]);

//   const reload = () => setRefresh(!refresh);

//   /* ============ ADD HANDLERS ============ */
//   const addClass = async (sid, value) => {
//     await fetch(`${BASE}/${sid}/class`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ classId: value, name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   const addPaper = async (sid, classId, value) => {
//     await fetch(`${BASE}/${sid}/class/${classId}/paper`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paperId: value, name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   const addChapter = async (sid, classId, paperId, value) => {
//     await fetch(`${BASE}/${sid}/class/${classId}/paper/${paperId}/chapter`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: value }),
//     });
//     setModal(null);
//     reload();
//   };

//   /* ============ DELETE HANDLERS ============ */
//   const del = async () => {
//     await fetch(confirm.url, { method: "DELETE" });
//     setConfirm(null);
//     reload();
//   };

//   // Toggle expanded state
//   const toggleExpand = (type, id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [`${type}-${id}`]: !prev[`${type}-${id}`],
//     }));
//   };

//   // Filter subjects based on search
//   const filteredSubjects = subjects.filter((subject) =>
//     subject.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   // Get stats
//   const getSubjectStats = () => {
//     const totalSubjects = subjects.length;
//     const totalClasses = subjects.reduce(
//       (sum, sub) => sum + (sub.classes?.length || 0),
//       0,
//     );
//     const totalPapers = subjects.reduce(
//       (sum, sub) =>
//         sum +
//         (sub.classes?.reduce(
//           (clsSum, cls) => clsSum + (cls.papers?.length || 0),
//           0,
//         ) || 0),
//       0,
//     );
//     const totalChapters = subjects.reduce(
//       (sum, sub) =>
//         sum +
//         (sub.classes?.reduce(
//           (clsSum, cls) =>
//             clsSum +
//             (cls.papers?.reduce(
//               (paperSum, paper) => paperSum + (paper.chapters?.length || 0),
//               0,
//             ) || 0),
//           0,
//         ) || 0),
//       0,
//     );

//     return { totalSubjects, totalClasses, totalPapers, totalChapters };
//   };

//   const stats = getSubjectStats();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
//       </div>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="relative z-0 max-w-7xl mx-auto"
//       >
//         {/* Header */}
//         <motion.div variants={itemVariants} className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
//                 MadeEasy ম্যানেজমেন্ট
//               </h1>
//               <p className="text-gray-300 mt-2">
//                 বিষয়, শ্রেণী, পেপার এবং অধ্যায় ব্যবস্থাপনা
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Link
//                 to="add"
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
//               >
//                 <BookPlus className="w-5 h-5" />
//                 নতুন বিষয়
//               </Link>
//               <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
//                 <Download className="w-5 h-5" />
//                 এক্সপোর্ট
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-300 text-sm">মোট বিষয়</p>
//                   <h3 className="text-3xl font-bold text-white mt-2">
//                     {stats.totalSubjects}
//                   </h3>
//                 </div>
//                 <div className="p-3 bg-[#3BD480]/20 rounded-xl">
//                   <BookOpen className="w-6 h-6 text-[#3BD480]" />
//                 </div>
//               </div>
//               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
//                 <div className="h-full bg-[#3BD480] w-full"></div>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-300 text-sm">শ্রেণী সমূহ</p>
//                   <h3 className="text-3xl font-bold text-white mt-2">
//                     {stats.totalClasses}
//                   </h3>
//                 </div>
//                 <div className="p-3 bg-blue-500/20 rounded-xl">
//                   <GraduationCap className="w-6 h-6 text-blue-500" />
//                 </div>
//               </div>
//               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-3/4"></div>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-300 text-sm">পেপার সমূহ</p>
//                   <h3 className="text-3xl font-bold text-white mt-2">
//                     {stats.totalPapers}
//                   </h3>
//                 </div>
//                 <div className="p-3 bg-purple-500/20 rounded-xl">
//                   <FileText className="w-6 h-6 text-purple-500" />
//                 </div>
//               </div>
//               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
//                 <div className="h-full bg-purple-500 w-2/3"></div>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-300 text-sm">অধ্যায় সমূহ</p>
//                   <h3 className="text-3xl font-bold text-white mt-2">
//                     {stats.totalChapters}
//                   </h3>
//                 </div>
//                 <div className="p-3 bg-amber-500/20 rounded-xl">
//                   <Layers className="w-6 h-6 text-amber-500" />
//                 </div>
//               </div>
//               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
//                 <div className="h-full bg-amber-500 w-1/2"></div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     placeholder="বিষয়ের নাম দিয়ে খুঁজুন..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
//                   />
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <select className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent">
//                   <option value="all" className="bg-[#17202F]">
//                     সব শ্রেণী
//                   </option>
//                   <option value="6" className="bg-[#17202F]">
//                     ৬ষ্ঠ শ্রেণী
//                   </option>
//                   <option value="7" className="bg-[#17202F]">
//                     ৭ম শ্রেণী
//                   </option>
//                   <option value="8" className="bg-[#17202F]">
//                     ৮ম শ্রেণী
//                   </option>
//                   <option value="9" className="bg-[#17202F]">
//                     ৯ম শ্রেণী
//                   </option>
//                 </select>
//                 <button className="px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2">
//                   <Filter size={20} />
//                   ফিল্টার
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Subjects List */}
//         <motion.div variants={itemVariants}>
//           <div className="space-y-6">
//             <AnimatePresence>
//               {filteredSubjects.map((subject, subjectIndex) => (
//                 <motion.div
//                   key={subject._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: subjectIndex * 0.1 }}
//                   className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
//                 >
//                   {/* Subject Header */}
//                   <div className="p-6 border-b border-white/10">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-[#3BD480]/20 rounded-xl">
//                           <BookOpen className="w-6 h-6 text-[#3BD480]" />
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-semibold text-white">
//                             {subject.name}
//                           </h3>
//                           <div className="flex items-center gap-4 mt-2">
//                             <span className="text-sm text-gray-400 flex items-center gap-1">
//                               <Folder className="w-4 h-4" />
//                               {subject.classes?.length || 0} শ্রেণী
//                             </span>
//                             <span className="text-sm text-gray-400">•</span>
//                             <span className="text-sm text-gray-400">
//                               আইডি: {subject._id.slice(-8)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() =>
//                             setModal({
//                               title: "নতুন শ্রেণী যোগ করুন",
//                               onSave: (v) => addClass(subject._id, v),
//                             })
//                           }
//                           className="flex items-center gap-2 px-4 py-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
//                         >
//                           <FolderPlus className="w-4 h-4" />
//                           শ্রেণী
//                         </button>
//                         <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
//                           <MoreVertical className="w-5 h-5 text-gray-400" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Classes List */}
//                   <div className="p-6">
//                     <AnimatePresence>
//                       {subject.classes?.map((cls, classIndex) => {
//                         const isExpanded =
//                           expandedItems[`class-${cls.classId}`];
//                         return (
//                           <motion.div
//                             key={cls.classId}
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="mb-4 last:mb-0"
//                           >
//                             {/* Class Header */}
//                             <div className="bg-white/5 rounded-xl border border-white/10">
//                               <div className="p-4 flex items-center justify-between">
//                                 <div className="flex items-center gap-3">
//                                   <button
//                                     onClick={() =>
//                                       toggleExpand("class", cls.classId)
//                                     }
//                                     className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
//                                   >
//                                     {isExpanded ? (
//                                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                                     ) : (
//                                       <ChevronRight className="w-5 h-5 text-gray-400" />
//                                     )}
//                                   </button>
//                                   <div className="p-2 bg-blue-500/20 rounded-lg">
//                                     <GraduationCap className="w-5 h-5 text-blue-500" />
//                                   </div>
//                                   <div>
//                                     <h4 className="font-semibold text-white">
//                                       {cls.name}
//                                     </h4>
//                                     <div className="flex items-center gap-3 mt-1">
//                                       <span className="text-sm text-gray-400">
//                                         {cls.papers?.length || 0} পেপার
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() =>
//                                       setModal({
//                                         title: "নতুন পেপার যোগ করুন",
//                                         onSave: (v) =>
//                                           addPaper(subject._id, cls.classId, v),
//                                       })
//                                     }
//                                     className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-white rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
//                                   >
//                                     <FilePlus className="w-4 h-4" />
//                                     পেপার
//                                   </button>
//                                   <button
//                                     onClick={() =>
//                                       setConfirm({
//                                         message: `${cls.name} শ্রেণী ডিলিট করবেন?`,
//                                         url: `${BASE}/${subject._id}/class/${cls.classId}`,
//                                       })
//                                     }
//                                     className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
//                                   >
//                                     <Trash2 className="w-4 h-4 text-red-500" />
//                                   </button>
//                                 </div>
//                               </div>

//                               {/* Papers List - Expanded Content */}
//                               <AnimatePresence>
//                                 {isExpanded && cls.papers && (
//                                   <motion.div
//                                     initial={{ opacity: 0, height: 0 }}
//                                     animate={{ opacity: 1, height: "auto" }}
//                                     exit={{ opacity: 0, height: 0 }}
//                                     className="border-t border-white/10"
//                                   >
//                                     <div className="p-4 space-y-3">
//                                       {cls.papers.map((paper, paperIndex) => {
//                                         const isPaperExpanded =
//                                           expandedItems[
//                                             `paper-${paper.paperId}`
//                                           ];
//                                         return (
//                                           <motion.div
//                                             key={paper.paperId}
//                                             initial={{ opacity: 0, x: -20 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             transition={{
//                                               delay: paperIndex * 0.05,
//                                             }}
//                                             className="bg-white/5 rounded-lg border border-white/10"
//                                           >
//                                             {/* Paper Header */}
//                                             <div className="p-3 flex items-center justify-between">
//                                               <div className="flex items-center gap-3">
//                                                 <button
//                                                   onClick={() =>
//                                                     toggleExpand(
//                                                       "paper",
//                                                       paper.paperId,
//                                                     )
//                                                   }
//                                                   className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
//                                                 >
//                                                   {isPaperExpanded ? (
//                                                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                                                   ) : (
//                                                     <ChevronRight className="w-4 h-4 text-gray-400" />
//                                                   )}
//                                                 </button>
//                                                 <div className="p-2 bg-purple-500/20 rounded-lg">
//                                                   <FileText className="w-4 h-4 text-purple-500" />
//                                                 </div>
//                                                 <div>
//                                                   <h5 className="font-medium text-white">
//                                                     {paper.name}
//                                                   </h5>
//                                                   <span className="text-xs text-gray-400">
//                                                     {paper.chapters?.length ||
//                                                       0}{" "}
//                                                     অধ্যায়
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                               <div className="flex items-center gap-2">
//                                                 <button
//                                                   onClick={() =>
//                                                     setModal({
//                                                       title:
//                                                         "নতুন অধ্যায় যোগ করুন",
//                                                       onSave: (v) =>
//                                                         addChapter(
//                                                           subject._id,
//                                                           cls.classId,
//                                                           paper.paperId,
//                                                           v,
//                                                         ),
//                                                     })
//                                                   }
//                                                   className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 transition-colors duration-300"
//                                                 >
//                                                   <BookPlus className="w-4 h-4" />
//                                                   অধ্যায়
//                                                 </button>
//                                                 <button
//                                                   onClick={() =>
//                                                     setConfirm({
//                                                       message: `${paper.name} পেপার ডিলিট করবেন?`,
//                                                       url: `${BASE}/${subject._id}/class/${cls.classId}/paper/${paper.paperId}`,
//                                                     })
//                                                   }
//                                                   className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
//                                                 >
//                                                   <Trash2 className="w-4 h-4 text-red-500" />
//                                                 </button>
//                                               </div>
//                                             </div>

//                                             {/* Chapters List - Expanded Content */}
//                                             <AnimatePresence>
//                                               {isPaperExpanded &&
//                                                 paper.chapters && (
//                                                   <motion.div
//                                                     initial={{
//                                                       opacity: 0,
//                                                       height: 0,
//                                                     }}
//                                                     animate={{
//                                                       opacity: 1,
//                                                       height: "auto",
//                                                     }}
//                                                     exit={{
//                                                       opacity: 0,
//                                                       height: 0,
//                                                     }}
//                                                     className="border-t border-white/10"
//                                                   >
//                                                     <div className="p-3 space-y-2">
//                                                       {paper.chapters.map(
//                                                         (
//                                                           chapter,
//                                                           chapterIndex,
//                                                         ) => (
//                                                           <motion.div
//                                                             key={chapterIndex}
//                                                             initial={{
//                                                               opacity: 0,
//                                                               x: -10,
//                                                             }}
//                                                             animate={{
//                                                               opacity: 1,
//                                                               x: 0,
//                                                             }}
//                                                             transition={{
//                                                               delay:
//                                                                 chapterIndex *
//                                                                 0.05,
//                                                             }}
//                                                             className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
//                                                           >
//                                                             <div className="flex items-center gap-3">
//                                                               <div className="p-2 bg-amber-500/20 rounded-lg">
//                                                                 <Layers className="w-4 h-4 text-amber-500" />
//                                                               </div>
//                                                               <div>
//                                                                 <span className="text-white">
//                                                                   {chapter.name}
//                                                                 </span>
//                                                                 <div className="flex items-center gap-2 mt-1">
//                                                                   <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full">
//                                                                     অধ্যায়{" "}
//                                                                     {chapterIndex +
//                                                                       1}
//                                                                   </span>
//                                                                 </div>
//                                                               </div>
//                                                             </div>
//                                                             <button
//                                                               onClick={() =>
//                                                                 setConfirm({
//                                                                   message: `${chapter.name} অধ্যায় ডিলিট করবেন?`,
//                                                                   url: `${BASE}/${subject._id}/class/${cls.classId}/paper/${paper.paperId}/chapter/${chapterIndex}`,
//                                                                 })
//                                                               }
//                                                               className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
//                                                             >
//                                                               <Trash2 className="w-4 h-4 text-red-500" />
//                                                             </button>
//                                                           </motion.div>
//                                                         ),
//                                                       )}
//                                                     </div>
//                                                   </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                           </motion.div>
//                                         );
//                                       })}
//                                     </div>
//                                   </motion.div>
//                                 )}
//                               </AnimatePresence>
//                             </div>
//                           </motion.div>
//                         );
//                       })}
//                     </AnimatePresence>

//                     {/* Empty State for Classes */}
//                     {(!subject.classes || subject.classes.length === 0) && (
//                       <div className="text-center py-8">
//                         <div className="inline-block p-4 bg-white/5 rounded-2xl mb-4">
//                           <Folder className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <h4 className="text-lg font-semibold text-white mb-2">
//                           কোন শ্রেণী নেই
//                         </h4>
//                         <p className="text-gray-400 mb-4">
//                           এই বিষয়ের জন্য এখনও কোন শ্রেণী যোগ করা হয়নি
//                         </p>
//                         <button
//                           onClick={() =>
//                             setModal({
//                               title: "নতুন শ্রেণী যোগ করুন",
//                               onSave: (v) => addClass(subject._id, v),
//                             })
//                           }
//                           className="px-4 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300"
//                         >
//                           প্রথম শ্রেণী যোগ করুন
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Empty State for Subjects */}
//             {filteredSubjects.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center"
//               >
//                 <div className="inline-block p-6 bg-white/5 rounded-2xl mb-6">
//                   <BookOpen className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-white mb-3">
//                   কোন বিষয় পাওয়া যায়নি
//                 </h3>
//                 <p className="text-gray-400 mb-8 max-w-md mx-auto">
//                   MadeEasy সিস্টেমে এখনও কোন বিষয় যোগ করা হয়নি। প্রথম বিষয়
//                   যোগ করে শুরু করুন।
//                 </p>
//                 <Link
//                   to="add"
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
//                 >
//                   <BookPlus className="w-6 h-6" />
//                   প্রথম বিষয় যোগ করুন
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Modals */}
//       {modal && (
//         <AddModal
//           title={modal.title}
//           onSave={modal.onSave}
//           onClose={() => setModal(null)}
//         />
//       )}

//       {confirm && (
//         <ConfirmBox
//           message={confirm.message}
//           onYes={del}
//           onNo={() => setConfirm(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default MadeEasyManagement;

import React, { useEffect, useState } from "react";
import ConfirmBox from "../../components/ConfirmBox";
import AddModal from "../../components/AddModal";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Folder,
  FileText,
  Layers,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  BookMarked,
  GraduationCap,
  FolderPlus,
  FilePlus,
  BookPlus,
  Eye,
  ArrowRight,
} from "lucide-react";

const BASE = import.meta.env.VITE_BASE_URL + "/api/subjects";

const MadeEasyManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [confirm, setConfirm] = useState(null);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const loadSubjects = async () => {
    try {
      const res = await fetch(BASE);
      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects:", error);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [refresh]);

  const reload = () => setRefresh(!refresh);

  /* ============ ADD HANDLERS ============ */
  const addClass = async (sid, value) => {
    await fetch(`${BASE}/${sid}/class`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId: value, name: value }),
    });
    setModal(null);
    reload();
  };

  const addPaper = async (sid, classId, value) => {
    await fetch(`${BASE}/${sid}/class/${classId}/paper`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paperId: value, name: value }),
    });
    setModal(null);
    reload();
  };

  const addChapter = async (sid, classId, paperId, value) => {
    await fetch(`${BASE}/${sid}/class/${classId}/paper/${paperId}/chapter`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    });
    setModal(null);
    reload();
  };

  /* ============ DELETE HANDLERS ============ */
  const del = async () => {
    await fetch(confirm.url, { method: "DELETE" });
    setConfirm(null);
    reload();
  };

  // Chapter ক্লিক করলে Chapter Page-এ নিয়ে যাবে
  const handleChapterClick = (subjectId, classId, paperId, chapterIndex) => {
    navigate(
      `/admin/madeeasy/${subjectId}/${classId}/${paperId}/${chapterIndex}`,
    );
  };

  // Toggle expanded state
  const toggleExpand = (type, id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${type}-${id}`]: !prev[`${type}-${id}`],
    }));
  };

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get stats
  const getSubjectStats = () => {
    const totalSubjects = subjects.length;
    const totalClasses = subjects.reduce(
      (sum, sub) => sum + (sub.classes?.length || 0),
      0,
    );
    const totalPapers = subjects.reduce(
      (sum, sub) =>
        sum +
        (sub.classes?.reduce(
          (clsSum, cls) => clsSum + (cls.papers?.length || 0),
          0,
        ) || 0),
      0,
    );
    const totalChapters = subjects.reduce(
      (sum, sub) =>
        sum +
        (sub.classes?.reduce(
          (clsSum, cls) =>
            clsSum +
            (cls.papers?.reduce(
              (paperSum, paper) => paperSum + (paper.chapters?.length || 0),
              0,
            ) || 0),
          0,
        ) || 0),
      0,
    );

    return { totalSubjects, totalClasses, totalPapers, totalChapters };
  };

  const stats = getSubjectStats();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-0 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                MadeEasy ম্যানেজমেন্ট
              </h1>
              <p className="text-gray-300 mt-2">
                বিষয়, শ্রেণী, পেপার এবং অধ্যায় ব্যবস্থাপনা
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="add"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
              >
                <BookPlus className="w-5 h-5" />
                নতুন বিষয়
              </Link>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                <Download className="w-5 h-5" />
                এক্সপোর্ট
              </button>
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
                  <p className="text-gray-300 text-sm">মোট বিষয়</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.totalSubjects}
                  </h3>
                </div>
                <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-[#3BD480]" />
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
                  <p className="text-gray-300 text-sm">শ্রেণী সমূহ</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.totalClasses}
                  </h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4"></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">পেপার সমূহ</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.totalPapers}
                  </h3>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-2/3"></div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">অধ্যায় সমূহ</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stats.totalChapters}
                  </h3>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Layers className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-1/2"></div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
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
                    placeholder="বিষয়ের নাম দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent">
                  <option value="all" className="bg-[#17202F]">
                    সব শ্রেণী
                  </option>
                  <option value="6" className="bg-[#17202F]">
                    ৬ষ্ঠ শ্রেণী
                  </option>
                  <option value="7" className="bg-[#17202F]">
                    ৭ম শ্রেণী
                  </option>
                  <option value="8" className="bg-[#17202F]">
                    ৮ম শ্রেণী
                  </option>
                  <option value="9" className="bg-[#17202F]">
                    ৯ম শ্রেণী
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

        {/* Subjects List */}
        <motion.div variants={itemVariants}>
          <div className="space-y-6">
            <AnimatePresence>
              {filteredSubjects.map((subject, subjectIndex) => (
                <motion.div
                  key={subject._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: subjectIndex * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
                >
                  {/* Subject Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#3BD480]/20 rounded-xl">
                          <BookOpen className="w-6 h-6 text-[#3BD480]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {subject.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                              <Folder className="w-4 h-4" />
                              {subject.classes?.length || 0} শ্রেণী
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">
                              আইডি: {subject._id.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setModal({
                              title: "নতুন শ্রেণী যোগ করুন",
                              onSave: (v) => addClass(subject._id, v),
                            })
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-[#3BD480]/20 text-[#3BD480] rounded-lg hover:bg-[#3BD480]/30 transition-colors duration-300"
                        >
                          <FolderPlus className="w-4 h-4" />
                          শ্রেণী
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Classes List */}
                  <div className="p-6">
                    <AnimatePresence>
                      {subject.classes?.map((cls, classIndex) => {
                        const isExpanded =
                          expandedItems[`class-${cls.classId}`];
                        return (
                          <motion.div
                            key={cls.classId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 last:mb-0"
                          >
                            {/* Class Header */}
                            <div className="bg-white/5 rounded-xl border border-white/10">
                              <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      toggleExpand("class", cls.classId)
                                    }
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronRight className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <GraduationCap className="w-5 h-5 text-blue-500" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white">
                                      {cls.name}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className="text-sm text-gray-400">
                                        {cls.papers?.length || 0} পেপার
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      setModal({
                                        title: "নতুন পেপার যোগ করুন",
                                        onSave: (v) =>
                                          addPaper(subject._id, cls.classId, v),
                                      })
                                    }
                                    className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-white rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                                  >
                                    <FilePlus className="w-4 h-4" />
                                    পেপার
                                  </button>
                                  <button
                                    onClick={() =>
                                      setConfirm({
                                        message: `${cls.name} শ্রেণী ডিলিট করবেন?`,
                                        url: `${BASE}/${subject._id}/class/${cls.classId}`,
                                      })
                                    }
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </button>
                                </div>
                              </div>

                              {/* Papers List - Expanded Content */}
                              <AnimatePresence>
                                {isExpanded && cls.papers && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-white/10"
                                  >
                                    <div className="p-4 space-y-3">
                                      {cls.papers.map((paper, paperIndex) => {
                                        const isPaperExpanded =
                                          expandedItems[
                                            `paper-${paper.paperId}`
                                          ];
                                        return (
                                          <motion.div
                                            key={paper.paperId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              delay: paperIndex * 0.05,
                                            }}
                                            className="bg-white/5 rounded-lg border border-white/10"
                                          >
                                            {/* Paper Header */}
                                            <div className="p-3 flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <button
                                                  onClick={() =>
                                                    toggleExpand(
                                                      "paper",
                                                      paper.paperId,
                                                    )
                                                  }
                                                  className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                                >
                                                  {isPaperExpanded ? (
                                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                                  ) : (
                                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                                  )}
                                                </button>
                                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                                  <FileText className="w-4 h-4 text-purple-500" />
                                                </div>
                                                <div>
                                                  <h5 className="font-medium text-white">
                                                    {paper.name}
                                                  </h5>
                                                  <span className="text-xs text-gray-400">
                                                    {paper.chapters?.length ||
                                                      0}{" "}
                                                    অধ্যায়
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <button
                                                  onClick={() =>
                                                    setModal({
                                                      title:
                                                        "নতুন অধ্যায় যোগ করুন",
                                                      onSave: (v) =>
                                                        addChapter(
                                                          subject._id,
                                                          cls.classId,
                                                          paper.paperId,
                                                          v,
                                                        ),
                                                    })
                                                  }
                                                  className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 transition-colors duration-300"
                                                >
                                                  <BookPlus className="w-4 h-4" />
                                                  অধ্যায়
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    setConfirm({
                                                      message: `${paper.name} পেপার ডিলিট করবেন?`,
                                                      url: `${BASE}/${subject._id}/class/${cls.classId}/paper/${paper.paperId}`,
                                                    })
                                                  }
                                                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                                                >
                                                  <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                              </div>
                                            </div>

                                            {/* Chapters List - Expanded Content */}
                                            <AnimatePresence>
                                              {isPaperExpanded &&
                                                paper.chapters && (
                                                  <motion.div
                                                    initial={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    animate={{
                                                      opacity: 1,
                                                      height: "auto",
                                                    }}
                                                    exit={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    className="border-t border-white/10"
                                                  >
                                                    <div className="p-3 space-y-2">
                                                      {paper.chapters.map(
                                                        (
                                                          chapter,
                                                          chapterIndex,
                                                        ) => (
                                                          <motion.div
                                                            key={chapterIndex}
                                                            initial={{
                                                              opacity: 0,
                                                              x: -10,
                                                            }}
                                                            animate={{
                                                              opacity: 1,
                                                              x: 0,
                                                            }}
                                                            transition={{
                                                              delay:
                                                                chapterIndex *
                                                                0.05,
                                                            }}
                                                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 group cursor-pointer"
                                                            onClick={() =>
                                                              handleChapterClick(
                                                                subject._id,
                                                                cls.classId,
                                                                paper.paperId,
                                                                chapterIndex,
                                                              )
                                                            }
                                                          >
                                                            <div className="flex items-center gap-3">
                                                              <div className="p-2 bg-amber-500/20 rounded-lg">
                                                                <Layers className="w-4 h-4 text-amber-500" />
                                                              </div>
                                                              <div>
                                                                <span className="text-white">
                                                                  {chapter.name}
                                                                </span>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                  <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                                                                    অধ্যায়{" "}
                                                                    {chapterIndex +
                                                                      1}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                              <button
                                                                onClick={(
                                                                  e,
                                                                ) => {
                                                                  e.stopPropagation();
                                                                  setConfirm({
                                                                    message: `${chapter.name} অধ্যায় ডিলিট করবেন?`,
                                                                    url: `${BASE}/${subject._id}/class/${cls.classId}/paper/${paper.paperId}/chapter/${chapterIndex}`,
                                                                  });
                                                                }}
                                                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-300"
                                                              >
                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                              </button>
                                                              <button
                                                                onClick={(
                                                                  e,
                                                                ) => {
                                                                  e.stopPropagation();
                                                                  handleChapterClick(
                                                                    subject._id,
                                                                    cls.classId,
                                                                    paper.paperId,
                                                                    chapterIndex,
                                                                  );
                                                                }}
                                                                className="p-2 hover:bg-[#3BD480]/20 rounded-lg transition-colors duration-300 opacity-0 group-hover:opacity-100"
                                                                title="অধ্যায় দেখুন"
                                                              >
                                                                <ArrowRight className="w-4 h-4 text-[#3BD480]" />
                                                              </button>
                                                            </div>
                                                          </motion.div>
                                                        ),
                                                      )}
                                                    </div>
                                                  </motion.div>
                                                )}
                                            </AnimatePresence>
                                          </motion.div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Empty State for Classes */}
                    {(!subject.classes || subject.classes.length === 0) && (
                      <div className="text-center py-8">
                        <div className="inline-block p-4 bg-white/5 rounded-2xl mb-4">
                          <Folder className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          কোন শ্রেণী নেই
                        </h4>
                        <p className="text-gray-400 mb-4">
                          এই বিষয়ের জন্য এখনও কোন শ্রেণী যোগ করা হয়নি
                        </p>
                        <button
                          onClick={() =>
                            setModal({
                              title: "নতুন শ্রেণী যোগ করুন",
                              onSave: (v) => addClass(subject._id, v),
                            })
                          }
                          className="px-4 py-2 bg-[#3BD480] text-[#17202F] rounded-lg font-semibold hover:bg-[#2da866] transition-colors duration-300"
                        >
                          প্রথম শ্রেণী যোগ করুন
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State for Subjects */}
            {filteredSubjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center"
              >
                <div className="inline-block p-6 bg-white/5 rounded-2xl mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  কোন বিষয় পাওয়া যায়নি
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  MadeEasy সিস্টেমে এখনও কোন বিষয় যোগ করা হয়নি। প্রথম বিষয়
                  যোগ করে শুরু করুন।
                </p>
                <Link
                  to="add"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
                >
                  <BookPlus className="w-6 h-6" />
                  প্রথম বিষয় যোগ করুন
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      {modal && (
        <AddModal
          title={modal.title}
          onSave={modal.onSave}
          onClose={() => setModal(null)}
        />
      )}

      {confirm && (
        <ConfirmBox
          message={confirm.message}
          onYes={del}
          onNo={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

export default MadeEasyManagement;
