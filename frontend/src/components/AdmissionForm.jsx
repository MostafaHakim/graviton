// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   Upload,
//   User,
//   BookOpen,
//   CreditCard,
//   Calculator,
//   Home,
//   CheckCircle,
//   Shield,
// } from "lucide-react";
// import { createAdmission } from "../store/features/auth/admissionSlice";
// import uploadPhotoToCloudinary from "../utils/cloudinery";

// const AdmissionForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: "",
//     studentName: "",
//     fatherName: "",
//     motherName: "",
//     class: "",
//     address: "",
//     schoolCollege: "",
//     mobileNumber: "",
//     courses: [],
//     paymentMethod: "",
//     transactionId: "",
//     photo: null,
//     public_id: null,
//     totalFee: "",
//     discount: "",
//     cashPayment: "",
//     duePayment: "",
//     membershipCard: false,
//   });

//   const classes = [
//     { value: "six", label: "ষষ্ঠ শ্রেণী" },
//     { value: "seven", label: "সপ্তম শ্রেণী" },
//     { value: "eight", label: "অষ্টম শ্রেণী" },
//     { value: "nine-ten", label: "নবম-দশম শ্রেণী" },
//     { value: "11th-12th", label: "একাদশ-দ্বাদশ শ্রেণী" },
//     { value: "others", label: "অন্যান্য" },
//   ];

//   const courses = [
//     {
//       id: "pre-primary",
//       label: "প্রি-প্রাইমারি কোর্স",
//       icon: "👶",
//     },
//     {
//       id: "kids-programming",
//       label: "কিডস প্রোগ্রামিং",
//       icon: "💻",
//     },
//     {
//       id: "kids-spoken",
//       label: "কিডস স্পোকেন",
//       icon: "🗣️",
//     },
//     {
//       id: "junior-spoken",
//       label: "জুনিয়র স্পোকেন",
//       icon: "👦",
//     },
//     {
//       id: "senior-spoken",
//       label: "সিনিয়র স্পোকেন",
//       icon: "👨",
//     },
//     {
//       id: "ielts",
//       label: "আইইএলটিএস",
//       icon: "🌍",
//     },
//     {
//       id: "sat",
//       label: "এসএটি",
//       icon: "🎓",
//     },
//     {
//       id: "digital-marketing",
//       label: "ডিজিটাল মার্কেটিং",
//       icon: "📈",
//     },
//     {
//       id: "ssc-2026-science",
//       label: "এসএসসি-২০২৬(বিজ্ঞান)",
//       icon: "🔬",
//     },
//     {
//       id: "ssc-2026-arts-business",
//       label: "এসএসসি-২০২৬(মানবিক ও ব্যবসায়)",
//       icon: "📚",
//     },
//     {
//       id: "class-six",
//       label: "ষষ্ঠ শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
//       icon: "6️⃣",
//     },
//     {
//       id: "class-seven",
//       label: "সপ্তম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
//       icon: "7️⃣",
//     },
//     {
//       id: "class-eight",
//       label: "অষ্টম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
//       icon: "8️⃣",
//     },
//     {
//       id: "nine-ten-science",
//       label: "নবম ও দশম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
//       icon: "🧪",
//     },
//     {
//       id: "science-finishing",
//       label: "নবম ও দশম শ্রেণী(বিজ্ঞান ফিনিশিং কোর্স)",
//       icon: "🎯",
//     },
//     {
//       id: "hsc-science",
//       label: "এইচএসসি(বিজ্ঞান ফিনিশিং কোর্স)",
//       icon: "⚗️",
//     },
//     {
//       id: "hsc-ict",
//       label: "এইচএসসি আইসিটি(হাতে-কলমে HTML ও প্রোগ্রামিং)",
//       icon: "💻",
//     },
//     {
//       id: "hsc-english",
//       label: "এইচএসসি ইংরেজি ও বিশ্ববিদ্যালয় ভর্তি ইংরেজি",
//       icon: "🇬🇧",
//     },
//     {
//       id: "dakhil",
//       label: "দাখিল(আরবি ১ম ও ২য়)",
//       icon: "🕌",
//     },
//     {
//       id: "alim",
//       label: "আলিম(আরবি ১ম ও ২য়)",
//       icon: "📖",
//     },
//     {
//       id: "arabic-eight",
//       label: "অষ্টম শ্রেণী(আরবি ১ম ও ২য়)",
//       icon: "8️⃣🕌",
//     },
//     {
//       id: "graphic-design",
//       label: "গ্রাফিক ডিজাইন",
//       icon: "🎨",
//     },
//   ];

//   const paymentMethods = [
//     {
//       value: "cash",
//       label: "নগদ পেমেন্ট",
//       icon: "💵",
//     },
//     {
//       value: "bkash",
//       label: "বিকাশ-০১৮৫৫১৬৬৩৩৯(সেন্ড মানি)",
//       icon: "📱",
//     },
//     {
//       value: "nagad",
//       label: "নগদ-০১৮৫৫১৬৬৩৩৯(সেন্ড মানি)",
//       icon: "📲",
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "file"
//             ? files[0]
//             : type === "select-multiple"
//               ? Array.from(e.target.selectedOptions, (option) => option.value)
//               : value,
//     }));
//   };

//   const handleCourseSelect = (courseId) => {
//     setFormData((prev) => ({
//       ...prev,
//       courses: prev.courses.includes(courseId)
//         ? prev.courses.filter((id) => id !== courseId)
//         : [...prev.courses, courseId],
//     }));
//   };

//   const handleSelectAll = () => {
//     if (formData.courses.length === courses.length) {
//       setFormData((prev) => ({ ...prev, courses: [] }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         courses: courses.map((course) => course.id),
//       }));
//     }
//   };

//   const calculateDue = () => {
//     const total = parseFloat(formData.totalFee) || 0;
//     const discount = parseFloat(formData.discount) || 0;
//     const cash = parseFloat(formData.cashPayment) || 0;
//     return total - discount - cash;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let photoUrl = null;

//     if (formData.photo) {
//       photoUrl = await uploadPhotoToCloudinary(formData.photo);
//       if (!photoUrl) {
//         alert("ছবি আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//         return;
//       }
//     }

//     // FormData update: replace file with URL
//     const submissionData = {
//       ...formData,
//       photo: photoUrl.secure_url,
//       public_id: photoUrl.public_id,
//       admissionId: Math.floor(Math.random() * 1000000), // random ID
//     };

//     await dispatch(createAdmission(submissionData));

//     alert("আবেদন সফলভাবে জমা দেওয়া হয়েছে!");
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       email: "",
//       studentName: "",
//       fatherName: "",
//       motherName: "",
//       class: "",
//       address: "",
//       schoolCollege: "",
//       mobileNumber: "",
//       courses: [],
//       paymentMethod: "",
//       transactionId: "",
//       photo: null,
//       totalFee: "",
//       discount: "",
//       cashPayment: "",
//       duePayment: "",
//       membershipCard: false,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
//       {/* Mesh Grid Background */}
//       <div className="absolute inset-0">
//         <svg
//           className="absolute w-full h-full opacity-10"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <pattern
//               id="mesh-grid-admission"
//               width="40"
//               height="40"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M 40 0 L 0 0 0 40"
//                 fill="none"
//                 stroke="rgba(59, 212, 128, 0.3)"
//                 strokeWidth="1"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#mesh-grid-admission)" />
//         </svg>
//       </div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
//             গ্র্যাভিটন একাডেমি
//             <span className="block text-[#3BD480]">ভর্তি ফর্ম</span>
//           </h1>

//           <p className="text-lg text-white/80 max-w-2xl mx-auto font-kalpurush">
//             আপনার ভবিষ্যৎ গড়ে তুলতে আজই ভর্তি হোন। সমস্ত প্রয়োজনীয় তথ্য পূরণ
//             করুন এবং এডমিশন প্রক্রিয়া সম্পন্ন করুন।
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Personal Information Card */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white font-kalpurush">
//                 ব্যক্তিগত তথ্য
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                   ছাত্র/ছাত্রীর নাম *
//                 </label>
//                 <input
//                   type="text"
//                   name="studentName"
//                   value={formData.studentName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                   placeholder="ছাত্র/ছাত্রীর নাম লিখুন"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                   পিতার নাম *
//                 </label>
//                 <input
//                   type="text"
//                   name="fatherName"
//                   value={formData.fatherName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                   placeholder="পিতার নাম লিখুন"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                   মাতার নাম *
//                 </label>
//                 <input
//                   type="text"
//                   name="motherName"
//                   value={formData.motherName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                   placeholder="মাতার নাম লিখুন"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                   শ্রেণী নির্বাচন করুন *
//                 </label>
//                 <select
//                   name="class"
//                   value={formData.class}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white"
//                 >
//                   <option value="" className="bg-[#17202F]">
//                     শ্রেণী নির্বাচন করুন
//                   </option>
//                   {classes.map((cls) => (
//                     <option
//                       key={cls.value}
//                       value={cls.value}
//                       className="bg-[#17202F]"
//                     >
//                       {cls.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information Card */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
//                 <Home className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white font-kalpurush">
//                 যোগাযোগের তথ্য
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     বাসস্থান ঠিকানা *
//                   </label>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     required
//                     rows="1"
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                     placeholder="সম্পূর্ণ ঠিকানা লিখুন"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     ইমেইল *
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                     placeholder="ইমেইল"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     বিদ্যালয়/কলেজের নাম *
//                   </label>
//                   <input
//                     type="text"
//                     name="schoolCollege"
//                     value={formData.schoolCollege}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                     placeholder="বিদ্যালয়/কলেজের নাম"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     মোবাইল নম্বর *
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNumber"
//                     value={formData.mobileNumber}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                     placeholder="০১XXXXXXXXX"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Course Selection Card */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
//                 <BookOpen className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white font-kalpurush">
//                 কোর্স নির্বাচন *
//               </h2>
//             </div>

//             <div className="mb-6">
//               <button
//                 type="button"
//                 onClick={handleSelectAll}
//                 className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20 font-kalpurush"
//               >
//                 {formData.courses.length === courses.length
//                   ? "সব নির্বাচন করুন"
//                   : "সব কোর্স নির্বাচন করুন"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {courses.map((course) => (
//                 <div
//                   key={course.id}
//                   onClick={() => handleCourseSelect(course.id)}
//                   className={`p-3 border rounded-lg cursor-pointer transition-all backdrop-blur-sm ${
//                     formData.courses.includes(course.id)
//                       ? "border-[#3BD480] bg-[#3BD480]/10"
//                       : "border-white/20 bg-white/5 hover:border-white/30"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`w-6 h-6 flex items-center justify-center rounded-lg ${
//                         formData.courses.includes(course.id)
//                           ? "bg-[#3BD480] text-white"
//                           : "bg-white/10 text-white/70"
//                       }`}
//                     >
//                       {course.icon}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-4 h-4 border rounded flex items-center justify-center ${
//                             formData.courses.includes(course.id)
//                               ? "bg-[#3BD480] border-[#3BD480]"
//                               : "border-white/30"
//                           }`}
//                         >
//                           {formData.courses.includes(course.id) && (
//                             <CheckCircle className="w-3 h-3 text-white" />
//                           )}
//                         </div>
//                         <span className="text-sm text-white font-kalpurush">
//                           {course.label}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Payment & Photo Upload Card */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
//                 <CreditCard className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white font-kalpurush">
//                 পেমেন্ট ও নথিপত্র
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Payment Section */}
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     পেমেন্ট পদ্ধতি *
//                   </label>
//                   <div className="space-y-3">
//                     {paymentMethods.map((method) => (
//                       <label
//                         key={method.value}
//                         className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
//                           formData.paymentMethod === method.value
//                             ? "border-[#3BD480] bg-[#3BD480]/10"
//                             : "border-white/20 bg-white/5 hover:border-white/30"
//                         }`}
//                       >
//                         <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
//                           <span>{method.icon}</span>
//                         </div>
//                         <div className="flex-1">
//                           <input
//                             type="radio"
//                             name="paymentMethod"
//                             value={method.value}
//                             checked={formData.paymentMethod === method.value}
//                             onChange={handleInputChange}
//                             required
//                             className="sr-only"
//                           />
//                           <span className="text-white font-kalpurush">
//                             {method.label}
//                           </span>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     ট্রানজেকশন আইডি/শেষ ৩ ডিজিট ফোন নম্বর *
//                   </label>
//                   <input
//                     type="text"
//                     name="transactionId"
//                     value={formData.transactionId}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
//                     placeholder="ট্রানজেকশন আইডি লিখুন"
//                   />
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     id="membershipCard"
//                     name="membershipCard"
//                     checked={formData.membershipCard}
//                     onChange={handleInputChange}
//                     className="w-5 h-5 text-[#3BD480] bg-white/5 border-white/20 rounded"
//                   />
//                   <label
//                     htmlFor="membershipCard"
//                     className="text-white/90 font-kalpurush"
//                   >
//                     সদস্যতা কার্ড চাই
//                   </label>
//                 </div>
//               </div>

//               {/* Photo Upload & Calculations */}
//               <div className="space-y-6">
//                 {/* Photo Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
//                     ছবি আপলোড করুন *
//                   </label>
//                   <div
//                     className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
//                       formData.photo
//                         ? "border-[#3BD480] bg-[#3BD480]/5"
//                         : "border-white/20 bg-white/5 hover:border-white/30"
//                     }`}
//                   >
//                     <Upload className="w-12 h-12 text-white/50 mx-auto mb-3" />
//                     <p className="text-sm text-white/80 mb-2 font-kalpurush">
//                       {formData.photo
//                         ? formData.photo.name
//                         : "কোন ফাইল নির্বাচন করা হয়নি"}
//                     </p>
//                     <input
//                       type="file"
//                       name="photo"
//                       onChange={handleInputChange}
//                       accept=".jpg,.jpeg,.png,.gif,.webp"
//                       required
//                       className="hidden"
//                       id="photoUpload"
//                     />
//                     <label
//                       htmlFor="photoUpload"
//                       className="inline-block px-4 py-2 bg-[#3BD480] text-white rounded-lg hover:bg-[#2da866] transition-colors cursor-pointer font-kalpurush"
//                     >
//                       ফাইল নির্বাচন করুন
//                     </label>
//                     <p className="text-xs text-white/50 mt-2 font-kalpurush">
//                       সর্বোচ্চ ফাইলের আকার: ১০এমবি। অনুমোদিত ধরন: জেপিজি,
//                       পিএনজি, জিআইএফ, ওয়েবপি।
//                     </p>
//                   </div>
//                 </div>

//                 {/* Fee Calculation */}
//                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 space-y-4 border border-white/10">
//                   <div className="flex items-center gap-3 mb-3">
//                     <Calculator className="w-5 h-5 text-white/70" />
//                     <h3 className="font-medium text-white font-kalpurush">
//                       ফি হিসাব
//                     </h3>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-white/70 font-kalpurush">
//                         মোট ফি
//                       </span>
//                       <input
//                         type="number"
//                         name="totalFee"
//                         value={formData.totalFee}
//                         onChange={handleInputChange}
//                         required
//                         className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white"
//                         placeholder="৳"
//                       />
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-white/70 font-kalpurush">
//                         ছাড়
//                       </span>
//                       <input
//                         type="number"
//                         name="discount"
//                         value={formData.discount}
//                         onChange={handleInputChange}
//                         className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white"
//                         placeholder="৳"
//                       />
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-white/70 font-kalpurush">
//                         নগদ পেমেন্ট
//                       </span>
//                       <input
//                         type="number"
//                         name="cashPayment"
//                         value={formData.cashPayment}
//                         onChange={handleInputChange}
//                         required
//                         className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white"
//                         placeholder="৳"
//                       />
//                     </div>

//                     <div className="pt-3 border-t border-white/20">
//                       <div className="flex justify-between items-center font-medium">
//                         <span className="text-white font-kalpurush">
//                           বকেয়া পেমেন্ট
//                         </span>
//                         <span className="text-xl text-[#3BD480] font-kalpurush">
//                           ৳ {calculateDue()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8">
//             <button
//               type="button"
//               onClick={resetForm}
//               className="px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 font-kalpurush"
//             >
//               ফর্ম রিসেট করুন
//             </button>

//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30 font-kalpurush"
//               >
//                 আবেদন জমা দিন
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Footer Note */}
//         <div className="mt-12 pt-6 border-t border-white/20 text-center">
//           <div className="inline-flex items-center gap-2 text-white/60 text-sm mb-2 font-kalpurush">
//             <Shield className="w-4 h-4" />
//             আপনার তথ্য সম্পূর্ণ নিরাপদ
//           </div>
//           <p className="text-white/60 text-sm font-kalpurush">
//             কোন সাহায্যের জন্য যোগাযোগ করুন: ০১৮৫৫-১৬৬৩৩৯ | ইমেইল:
//             info@gravitonacademy.com
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmissionForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Upload,
  User,
  BookOpen,
  CreditCard,
  Calculator,
  Home,
  CheckCircle,
  Shield,
  Loader2,
  Check,
} from "lucide-react";
import { createAdmission } from "../store/features/auth/admissionSlice";
import uploadPhotoToCloudinary from "../utils/cloudinery";

const AdmissionForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    submitting: false,
    photoUpload: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    studentName: "",
    fatherName: "",
    motherName: "",
    class: "",
    address: "",
    schoolCollege: "",
    mobileNumber: "",
    courses: [],
    paymentMethod: "",
    transactionId: "",
    photo: null,
    public_id: null,
    totalFee: "",
    discount: "",
    cashPayment: "",
    duePayment: "",
    membershipCard: false,
  });

  const classes = [
    { value: "six", label: "ষষ্ঠ শ্রেণী" },
    { value: "seven", label: "সপ্তম শ্রেণী" },
    { value: "eight", label: "অষ্টম শ্রেণী" },
    { value: "nine-ten", label: "নবম-দশম শ্রেণী" },
    { value: "11th-12th", label: "একাদশ-দ্বাদশ শ্রেণী" },
    { value: "others", label: "অন্যান্য" },
  ];

  const courses = [
    {
      id: "pre-primary",
      label: "প্রি-প্রাইমারি কোর্স",
      icon: "👶",
    },
    {
      id: "kids-programming",
      label: "কিডস প্রোগ্রামিং",
      icon: "💻",
    },
    {
      id: "kids-spoken",
      label: "কিডস স্পোকেন",
      icon: "🗣️",
    },
    {
      id: "junior-spoken",
      label: "জুনিয়র স্পোকেন",
      icon: "👦",
    },
    {
      id: "senior-spoken",
      label: "সিনিয়র স্পোকেন",
      icon: "👨",
    },
    {
      id: "ielts",
      label: "আইইএলটিএস",
      icon: "🌍",
    },
    {
      id: "sat",
      label: "এসএটি",
      icon: "🎓",
    },
    {
      id: "digital-marketing",
      label: "ডিজিটাল মার্কেটিং",
      icon: "📈",
    },
    {
      id: "ssc-2026-science",
      label: "এসএসসি-২০২৬(বিজ্ঞান)",
      icon: "🔬",
    },
    {
      id: "ssc-2026-arts-business",
      label: "এসএসসি-২০২৬(মানবিক ও ব্যবসায়)",
      icon: "📚",
    },
    {
      id: "class-six",
      label: "ষষ্ঠ শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
      icon: "6️⃣",
    },
    {
      id: "class-seven",
      label: "সপ্তম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
      icon: "7️⃣",
    },
    {
      id: "class-eight",
      label: "অষ্টম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
      icon: "8️⃣",
    },
    {
      id: "nine-ten-science",
      label: "নবম ও দশম শ্রেণী(ইংরেজি-গণিত ও বিজ্ঞান)",
      icon: "🧪",
    },
    {
      id: "science-finishing",
      label: "নবম ও দশম শ্রেণী(বিজ্ঞান ফিনিশিং কোর্স)",
      icon: "🎯",
    },
    {
      id: "hsc-science",
      label: "এইচএসসি(বিজ্ঞান ফিনিশিং কোর্স)",
      icon: "⚗️",
    },
    {
      id: "hsc-ict",
      label: "এইচএসসি আইসিটি(হাতে-কলমে HTML ও প্রোগ্রামিং)",
      icon: "💻",
    },
    {
      id: "hsc-english",
      label: "এইচএসসি ইংরেজি ও বিশ্ববিদ্যালয় ভর্তি ইংরেজি",
      icon: "🇬🇧",
    },
    {
      id: "dakhil",
      label: "দাখিল(আরবি ১ম ও ২য়)",
      icon: "🕌",
    },
    {
      id: "alim",
      label: "আলিম(আরবি ১ম ও ২য়)",
      icon: "📖",
    },
    {
      id: "arabic-eight",
      label: "অষ্টম শ্রেণী(আরবি ১ম ও ২য়)",
      icon: "8️⃣🕌",
    },
    {
      id: "graphic-design",
      label: "গ্রাফিক ডিজাইন",
      icon: "🎨",
    },
  ];

  const paymentMethods = [
    {
      value: "cash",
      label: "নগদ পেমেন্ট",
      icon: "💵",
    },
    {
      value: "bkash",
      label: "বিকাশ-০১৮৫৫১৬৬৩৩৯(সেন্ড মানি)",
      icon: "📱",
    },
    {
      value: "nagad",
      label: "নগদ-০১৮৫৫১৬৬৩৩৯(সেন্ড মানি)",
      icon: "📲",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files[0]) {
      // Validate file size (10MB)
      if (files[0].size > 10 * 1024 * 1024) {
        setErrorMessage("ফাইলের আকার ১০এমবি-এর বেশি হতে পারবে না");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(files[0].type)) {
        setErrorMessage("শুধুমাত্র JPG, PNG, GIF, WebP ফাইল অনুমোদিত");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files[0]
            : type === "select-multiple"
              ? Array.from(e.target.selectedOptions, (option) => option.value)
              : value,
    }));
  };

  const handleCourseSelect = (courseId) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter((id) => id !== courseId)
        : [...prev.courses, courseId],
    }));
  };

  const handleSelectAll = () => {
    if (formData.courses.length === courses.length) {
      setFormData((prev) => ({ ...prev, courses: [] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        courses: courses.map((course) => course.id),
      }));
    }
  };

  const calculateDue = () => {
    const total = parseFloat(formData.totalFee) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const cash = parseFloat(formData.cashPayment) || 0;
    return Math.max(0, total - discount - cash);
  };

  const simulateUploadProgress = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(Math.min(progress, 90));

        if (progress >= 90) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.courses.length === 0) {
      setErrorMessage("অন্তত একটি কোর্স নির্বাচন করুন");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!formData.photo) {
      setErrorMessage("ছবি আপলোড করুন");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Start loading
    setLoading({ submitting: true, photoUpload: false });
    setUploadProgress(0);

    try {
      let photoUrl = null;

      // Upload photo with progress
      if (formData.photo) {
        setLoading((prev) => ({ ...prev, photoUpload: true }));
        await simulateUploadProgress();

        photoUrl = await uploadPhotoToCloudinary(formData.photo);

        if (!photoUrl) {
          throw new Error("ছবি আপলোড ব্যর্থ হয়েছে");
        }

        setUploadProgress(100);
        setLoading((prev) => ({ ...prev, photoUpload: false }));
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        photo: photoUrl?.url || null,
        public_id: photoUrl?.public_id || null,
        admissionId: `GRA${Date.now().toString().slice(-6)}`,
        duePayment: calculateDue(),
        submissionDate: new Date().toISOString(),
        status: "pending",
      };
      console.log(submissionData);
      // Submit to Redux
      await dispatch(createAdmission(submissionData));

      // Show success
      setShowSuccess(true);

      // Reset after success
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        setLoading({ submitting: false, photoUpload: false });
        setUploadProgress(0);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "আবেদন জমা দিতে সমস্যা হয়েছে");
      setShowError(true);
      setLoading({ submitting: false, photoUpload: false });
      setUploadProgress(0);

      setTimeout(() => setShowError(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      studentName: "",
      fatherName: "",
      motherName: "",
      class: "",
      address: "",
      schoolCollege: "",
      mobileNumber: "",
      courses: [],
      paymentMethod: "",
      transactionId: "",
      photo: null,
      public_id: null,
      totalFee: "",
      discount: "",
      cashPayment: "",
      duePayment: "",
      membershipCard: false,
    });
  };

  // Loading Overlay Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#17202F] to-[#134C45] rounded-2xl p-8 max-w-md w-full mx-4 border border-[#3BD480]/30">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#3BD480]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#3BD480] border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#3BD480] animate-spin" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 font-kalpurush">
            {loading.photoUpload
              ? "ছবি আপলোড হচ্ছে..."
              : "আবেদন প্রক্রিয়াকরণ হচ্ছে..."}
          </h3>

          <p className="text-white/70 mb-6 font-kalpurush">
            দয়া করে অপেক্ষা করুন...
          </p>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-[#3BD480] to-[#134C45] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

          <p className="text-sm text-white/60 font-kalpurush">
            {uploadProgress}% সম্পূর্ণ
          </p>

          <p className="text-xs text-white/40 mt-4 font-kalpurush">
            পৃষ্ঠাটি রিলোড করবেন না
          </p>
        </div>
      </div>
    </div>
  );

  // Success Message Component
  const SuccessMessage = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#17202F] to-[#134C45] rounded-2xl p-8 max-w-md w-full mx-4 border border-[#3BD480]/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#3BD480] to-[#134C45] flex items-center justify-center animate-pulse">
            <Check className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 font-kalpurush">
            সফল হয়েছে!
          </h3>

          <p className="text-white/80 mb-6 font-kalpurush">
            আপনার আবেদন সফলভাবে জমা দেওয়া হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ
            করব।
          </p>

          <div className="flex items-center justify-center gap-2 text-[#3BD480]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-kalpurush">
              স্বয়ংক্রিয়ভাবে বন্ধ হবে...
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Error Message Component
  const ErrorMessage = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#17202F] to-[#801717] rounded-2xl p-8 max-w-md w-full mx-4 border border-red-500/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
            <span className="text-2xl text-white">!</span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 font-kalpurush">
            সমস্যা হয়েছে!
          </h3>

          <p className="text-white/80 mb-6 font-kalpurush">{errorMessage}</p>

          <button
            onClick={() => setShowError(false)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-kalpurush"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
      {/* Show loading overlay */}
      {loading.submitting && <LoadingOverlay />}

      {/* Show success message */}
      {showSuccess && <SuccessMessage />}

      {/* Show error message */}
      {showError && <ErrorMessage />}

      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-admission"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-admission)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            গ্র্যাভিটন একাডেমি
            <span className="block text-[#3BD480]">ভর্তি ফর্ম</span>
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto font-kalpurush">
            আপনার ভবিষ্যৎ গড়ে তুলতে আজই ভর্তি হোন। সমস্ত প্রয়োজনীয় তথ্য পূরণ
            করুন এবং এডমিশন প্রক্রিয়া সম্পন্ন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-kalpurush">
                ব্যক্তিগত তথ্য
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                  ছাত্র/ছাত্রীর নাম *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  disabled={loading.submitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                  placeholder="ছাত্র/ছাত্রীর নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                  পিতার নাম *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  disabled={loading.submitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                  placeholder="পিতার নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                  মাতার নাম *
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  disabled={loading.submitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                  placeholder="মাতার নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                  শ্রেণী নির্বাচন করুন *
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                  disabled={loading.submitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                >
                  <option value="" className="bg-[#17202F]">
                    শ্রেণী নির্বাচন করুন
                  </option>
                  {classes.map((cls) => (
                    <option
                      key={cls.value}
                      value={cls.value}
                      className="bg-[#17202F]"
                    >
                      {cls.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-kalpurush">
                যোগাযোগের তথ্য
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    বাসস্থান ঠিকানা *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="1"
                    disabled={loading.submitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                    placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    ইমেইল *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading.submitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                    placeholder="ইমেইল"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    বিদ্যালয়/কলেজের নাম *
                  </label>
                  <input
                    type="text"
                    name="schoolCollege"
                    value={formData.schoolCollege}
                    onChange={handleInputChange}
                    required
                    disabled={loading.submitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                    placeholder="বিদ্যালয়/কলেজের নাম"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    disabled={loading.submitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Selection Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-kalpurush">
                কোর্স নির্বাচন *
              </h2>
            </div>

            <div className="mb-6">
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={loading.submitting}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20 font-kalpurush disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formData.courses.length === courses.length
                  ? "সব নির্বাচন করুন"
                  : "সব কোর্স নির্বাচন করুন"}
              </button>

              {formData.courses.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-white/70 font-kalpurush">
                    নির্বাচিত কোর্স: {formData.courses.length} টি
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() =>
                    !loading.submitting && handleCourseSelect(course.id)
                  }
                  className={`p-3 border rounded-lg transition-all backdrop-blur-sm ${
                    loading.submitting
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:border-white/30"
                  } ${
                    formData.courses.includes(course.id)
                      ? "border-[#3BD480] bg-[#3BD480]/10"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                        formData.courses.includes(course.id)
                          ? "bg-[#3BD480] text-white"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            formData.courses.includes(course.id)
                              ? "bg-[#3BD480] border-[#3BD480]"
                              : "border-white/30"
                          }`}
                        >
                          {formData.courses.includes(course.id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm text-white font-kalpurush">
                          {course.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Photo Upload Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-kalpurush">
                পেমেন্ট ও নথিপত্র
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    পেমেন্ট পদ্ধতি *
                  </label>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
                          loading.submitting
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:border-white/30"
                        } ${
                          formData.paymentMethod === method.value
                            ? "border-[#3BD480] bg-[#3BD480]/10"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
                          <span>{method.icon}</span>
                        </div>
                        <div className="flex-1">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleInputChange}
                            required
                            disabled={loading.submitting}
                            className="sr-only"
                          />
                          <span className="text-white font-kalpurush">
                            {method.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    ট্রানজেকশন আইডি/শেষ ৩ ডিজিট ফোন নম্বর *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    disabled={loading.submitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                    placeholder="ট্রানজেকশন আইডি লিখুন"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="membershipCard"
                    name="membershipCard"
                    checked={formData.membershipCard}
                    onChange={handleInputChange}
                    disabled={loading.submitting}
                    className="w-5 h-5 text-[#3BD480] bg-white/5 border-white/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor="membershipCard"
                    className="text-white/90 font-kalpurush"
                  >
                    সদস্যতা কার্ড চাই
                  </label>
                </div>
              </div>

              {/* Photo Upload & Calculations */}
              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    ছবি আপলোড করুন *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      loading.submitting
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:border-white/30"
                    } ${
                      formData.photo
                        ? "border-[#3BD480] bg-[#3BD480]/5"
                        : "border-white/20 bg-white/5"
                    }`}
                    onClick={() =>
                      !loading.submitting &&
                      document.getElementById("photoUpload").click()
                    }
                  >
                    {formData.photo && !loading.photoUpload ? (
                      <>
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-white/80 mb-2 font-kalpurush">
                          {formData.photo.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-white/50 mx-auto mb-3" />
                        <p className="text-sm text-white/80 mb-2 font-kalpurush">
                          {loading.photoUpload
                            ? "আপলোড হচ্ছে..."
                            : "কোন ফাইল নির্বাচন করা হয়নি"}
                        </p>
                      </>
                    )}

                    <input
                      type="file"
                      name="photo"
                      onChange={handleInputChange}
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      required
                      disabled={loading.submitting}
                      className="hidden"
                      id="photoUpload"
                    />
                    <label
                      htmlFor="photoUpload"
                      className={`inline-block px-4 py-2 rounded-lg transition-colors cursor-pointer font-kalpurush ${
                        loading.submitting
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-[#3BD480] text-white hover:bg-[#2da866]"
                      }`}
                    >
                      {formData.photo
                        ? "ছবি পরিবর্তন করুন"
                        : "ফাইল নির্বাচন করুন"}
                    </label>
                    <p className="text-xs text-white/50 mt-2 font-kalpurush">
                      সর্বোচ্চ ফাইলের আকার: ১০এমবি। অনুমোদিত ধরন: জেপিজি,
                      পিএনজি, জিআইএফ, ওয়েবপি।
                    </p>
                  </div>
                </div>

                {/* Fee Calculation */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 space-y-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-5 h-5 text-white/70" />
                    <h3 className="font-medium text-white font-kalpurush">
                      ফি হিসাব
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70 font-kalpurush">
                        মোট ফি
                      </span>
                      <input
                        type="number"
                        name="totalFee"
                        value={formData.totalFee}
                        onChange={handleInputChange}
                        required
                        disabled={loading.submitting}
                        className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                        placeholder="৳"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70 font-kalpurush">
                        ছাড়
                      </span>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        disabled={loading.submitting}
                        className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                        placeholder="৳"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70 font-kalpurush">
                        নগদ পেমেন্ট
                      </span>
                      <input
                        type="number"
                        name="cashPayment"
                        value={formData.cashPayment}
                        onChange={handleInputChange}
                        required
                        disabled={loading.submitting}
                        className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush"
                        placeholder="৳"
                      />
                    </div>

                    <div className="pt-3 border-t border-white/20">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white font-kalpurush">
                          বকেয়া পেমেন্ট
                        </span>
                        <span
                          className={`text-xl font-kalpurush ${
                            calculateDue() > 0
                              ? "text-yellow-400"
                              : "text-[#3BD480]"
                          }`}
                        >
                          ৳ {calculateDue()}
                        </span>
                      </div>
                      {calculateDue() > 0 && (
                        <p className="text-xs text-yellow-400 mt-1 font-kalpurush">
                          দয়া করে বকেয়া পরিশোধ করুন
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8">
            <button
              type="button"
              onClick={resetForm}
              disabled={loading.submitting}
              className="px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 font-kalpurush disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ফর্ম রিসেট করুন
            </button>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading.submitting}
                className="px-8 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30 font-kalpurush disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
              >
                {loading.submitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3BD480] to-[#134C45] flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
                <span className={loading.submitting ? "invisible" : "visible"}>
                  আবেদন জমা দিন
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <div className="inline-flex items-center gap-2 text-white/60 text-sm mb-2 font-kalpurush">
            <Shield className="w-4 h-4" />
            আপনার তথ্য সম্পূর্ণ নিরাপদ
          </div>
          <p className="text-white/60 text-sm font-kalpurush">
            কোন সাহায্যের জন্য যোগাযোগ করুন: ০১৮৫৫-১৬৬৩৩৯ | ইমেইল:
            info@gravitonacademy.com
          </p>
          {loading.submitting && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[#3BD480] text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-kalpurush">প্রক্রিয়া চলছে...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
