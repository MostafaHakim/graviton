// import React, { useState } from "react";
// import {
//   Star,
//   ThumbsUp,
//   MessageSquare,
//   Award,
//   Smile,
//   Frown,
//   Heart,
//   Send,
//   Quote,
//   User,
//   ChevronRight,
//   Sparkles,
//   CheckCircle,
//   Book,
//   Home,
//   HeadphoneOff,
// } from "lucide-react";

// const FeedBack = () => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [activeTab, setActiveTab] = useState("all");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     category: "general",
//     anonymous: false,
//   });

//   const feedbackCategories = [
//     { id: "all", label: "All Feedback", count: 124, icon: MessageSquare },
//     {
//       id: "positive",
//       label: "Positive",
//       count: 89,
//       icon: ThumbsUp,
//       color: "bg-emerald-100 text-emerald-600",
//     },
//     {
//       id: "constructive",
//       label: "Constructive",
//       count: 25,
//       icon: Award,
//       color: "bg-amber-100 text-amber-600",
//     },
//     {
//       id: "feature",
//       label: "Feature Requests",
//       count: 10,
//       icon: Sparkles,
//       color: "bg-blue-100 text-blue-600",
//     },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Aisha Rahman",
//       role: "HSC Student",
//       course: "Science Finishing Course",
//       rating: 5,
//       content:
//         "The teaching methodology here is exceptional! Complex concepts are explained so simply. My results improved dramatically.",
//       date: "2 days ago",
//       avatar: "AR",
//       color: "bg-gradient-to-br from-blue-500 to-cyan-500",
//       tags: ["Teaching Quality", "Results"],
//     },
//     {
//       id: 2,
//       name: "Sakib Ahmed",
//       role: "University Aspirant",
//       course: "IELTS Preparation",
//       rating: 4,
//       content:
//         "The mock tests and speaking sessions were incredibly helpful. Scored 7.5 in my first attempt!",
//       date: "1 week ago",
//       avatar: "SA",
//       color: "bg-gradient-to-br from-purple-500 to-pink-500",
//       tags: ["IELTS", "Success Story"],
//     },
//     {
//       id: 3,
//       name: "Fatima Jahan",
//       role: "Working Professional",
//       course: "Digital Marketing",
//       rating: 5,
//       content:
//         "Practical assignments and industry-relevant curriculum. Landed a marketing job right after completion!",
//       date: "3 weeks ago",
//       avatar: "FJ",
//       color: "bg-gradient-to-br from-emerald-500 to-green-500",
//       tags: ["Career Growth", "Practical"],
//     },
//     {
//       id: 4,
//       name: "Rahim Khan",
//       role: "School Student",
//       course: "Class 9-10 Science",
//       rating: 4,
//       content:
//         "The doubt clearing sessions are amazing. Teachers are always available to help. Highly recommended!",
//       date: "1 month ago",
//       avatar: "RK",
//       color: "bg-gradient-to-br from-amber-500 to-orange-500",
//       tags: ["Support", "Recommended"],
//     },
//   ];

//   const stats = [
//     {
//       label: "Overall Rating",
//       value: "4.8/5.0",
//       icon: Star,
//       color: "text-yellow-500",
//       bg: "bg-yellow-50",
//     },
//     {
//       label: "Happy Students",
//       value: "2,500+",
//       icon: Smile,
//       color: "text-emerald-500",
//       bg: "bg-emerald-50",
//     },
//     {
//       label: "Feedback Received",
//       value: "1,200+",
//       icon: MessageSquare,
//       color: "text-blue-500",
//       bg: "bg-blue-50",
//     },
//     {
//       label: "Response Rate",
//       value: "98%",
//       icon: CheckCircle,
//       color: "text-purple-500",
//       bg: "bg-purple-50",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Feedback submitted:", { ...formData, rating });
//     alert("Thank you for your valuable feedback!");
//     setFormData({
//       name: "",
//       email: "",
//       message: "",
//       category: "general",
//       anonymous: false,
//     });
//     setRating(0);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Share Your
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
//               Experience With Us
//             </span>
//           </h1>

//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Help us improve by sharing your thoughts, suggestions, and
//             experiences. Every piece of feedback brings us closer to excellence.
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl ${stat.bg}`}>
//                   <stat.icon className={`w-6 h-6 ${stat.color}`} />
//                 </div>
//                 <span className="text-3xl font-bold text-gray-900">
//                   {stat.value}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Feedback Form - Left Column */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Share Your Feedback
//                 </h2>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Star Rating */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Overall Rating *
//                   </label>
//                   <div className="flex items-center gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setRating(star)}
//                         onMouseEnter={() => setHoverRating(star)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         className="p-1"
//                       >
//                         <Star
//                           className={`w-10 h-10 transition-colors ${
//                             star <= (hoverRating || rating)
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       </button>
//                     ))}
//                     <span className="ml-4 text-lg font-semibold text-gray-700">
//                       {rating > 0 ? `${rating}.0` : "Select rating"}
//                     </span>
//                   </div>
//                 </div>
//                 {/* Feedback Message */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Feedback *
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows="5"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Share your detailed experience, suggestions, or any concerns..."
//                   />
//                 </div>
//                 {/* Personal Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="Enter your name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Feedback Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Feedback Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   >
//                     <option value="general">General Feedback</option>
//                     <option value="teaching">Teaching Quality</option>
//                     <option value="facilities">Facilities & Resources</option>
//                     <option value="courses">Course Content</option>
//                     <option value="support">Student Support</option>
//                     <option value="suggestions">Suggestions</option>
//                   </select>
//                 </div>

//                 {/* Anonymous Option */}
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     id="anonymous"
//                     name="anonymous"
//                     checked={formData.anonymous}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                   <label htmlFor="anonymous" className="text-sm text-gray-700">
//                     Submit anonymously
//                   </label>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
//                 >
//                   <Send className="w-5 h-5" />
//                   Submit Feedback
//                 </button>
//               </form>
//             </div>

//             {/* Testimonials Section */}
//             <div>
//               {/* Categories Tabs */}
//               <div className="flex flex-wrap gap-3 mb-6">
//                 {feedbackCategories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveTab(category.id)}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
//                       activeTab === category.id
//                         ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-transparent"
//                         : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <category.icon className="w-4 h-4" />
//                     <span className="font-medium">{category.label}</span>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         activeTab === category.id
//                           ? "bg-white/20"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       {category.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>

//               {/* Testimonials Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {testimonials.map((testimonial) => (
//                   <div
//                     key={testimonial.id}
//                     className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                   >
//                     {/* Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold`}
//                         >
//                           {testimonial.avatar}
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-gray-900">
//                             {testimonial.name}
//                           </h4>
//                           <p className="text-sm text-gray-600">
//                             {testimonial.role}
//                           </p>
//                         </div>
//                       </div>
//                       <Quote className="w-6 h-6 text-gray-300" />
//                     </div>

//                     {/* Rating */}
//                     <div className="flex items-center gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < testimonial.rating
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>

//                     {/* Content */}
//                     <p className="text-gray-700 mb-4 leading-relaxed">
//                       "{testimonial.content}"
//                     </p>

//                     {/* Tags */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {testimonial.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     {/* Footer */}
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <span className="text-sm text-gray-500">
//                         {testimonial.date}
//                       </span>
//                       <span className="text-sm font-medium text-blue-600">
//                         {testimonial.course}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* View More Button */}
//               <div className="text-center mt-8">
//                 <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 mx-auto">
//                   View More Feedback
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-6">
//             {/* Guidelines Card */}
//             <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Award className="w-5 h-5 text-blue-600" />
//                 Feedback Guidelines
//               </h3>
//               <ul className="space-y-3">
//                 {[
//                   "Be specific about your experience",
//                   "Focus on both positives and areas for improvement",
//                   "Provide constructive suggestions",
//                   "Mention specific courses or teachers if relevant",
//                   "Share measurable outcomes if applicable",
//                 ].map((guideline, index) => (
//                   <li
//                     key={index}
//                     className="flex items-start gap-3 text-gray-700"
//                   >
//                     <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
//                     <span>{guideline}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Quick Feedback Card */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Quick Feedback
//               </h3>
//               <div className="space-y-3">
//                 {[
//                   { label: "Teaching Quality", icon: User },
//                   { label: "Course Material", icon: Book },
//                   { label: "Facilities", icon: Home },
//                   { label: "Support System", icon: HeadphoneOff },
//                 ].map((item) => (
//                   <button
//                     key={item.label}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
//                   >
//                     <span className="text-gray-700 group-hover:text-blue-600">
//                       {item.label}
//                     </span>
//                     <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Recent Responses
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     action: 'Your feedback on "Course Material" was reviewed',
//                     time: "2 hours ago",
//                   },
//                   {
//                     action: "New feature added based on community suggestions",
//                     time: "1 day ago",
//                   },
//                   {
//                     action: "500+ students found your feedback helpful",
//                     time: "3 days ago",
//                   },
//                 ].map((activity, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
//                   >
//                     <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm text-gray-700">{activity.action}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {activity.time}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Support */}
//             <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
//               <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
//               <p className="text-blue-100 mb-4">
//                 Contact our support team for urgent matters
//               </p>
//               <button className="w-full py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
//                 Contact Support
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedBack;

import React, { useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Award,
  Heart,
  Send,
  Quote,
  User,
  Sparkles,
  CheckCircle,
  Book,
  Home,
  Headphones,
  Users,
  Smile,
} from "lucide-react";

const FeedBack = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "general",
    anonymous: false,
  });

  const feedbackCategories = [
    { id: "all", label: "সকল ফিডব্যাক", count: 124, icon: MessageSquare },
    {
      id: "positive",
      label: "ইতিবাচক",
      count: 89,
      icon: ThumbsUp,
      color: "text-emerald-600",
    },
    {
      id: "constructive",
      label: "গঠনমূলক",
      count: 25,
      icon: Award,
      color: "text-amber-600",
    },
    {
      id: "feature",
      label: "ফিচার রিকুয়েস্ট",
      count: 10,
      icon: Sparkles,
      color: "text-blue-600",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "আয়েশা রহমান",
      role: "এইচএসসি শিক্ষার্থী",
      course: "সাইন্স ফিনিশিং কোর্স",
      rating: 5,
      content:
        "এখানে পড়ানোর পদ্ধতি অসাধারণ! জটিল বিষয়গুলো সহজে বুঝানো হয়। আমার ফলাফল উল্লেখযোগ্যভাবে উন্নতি হয়েছে।",
      date: "২ দিন আগে",
      avatar: "আর",
    },
    {
      id: 2,
      name: "সাকিব আহমেদ",
      role: "বিশ্ববিদ্যালয় প্রার্থী",
      course: "আইইএলটিএস প্রিপারেশন",
      rating: 4,
      content:
        "মক টেস্ট ও স্পিকিং সেশনগুলো খুবই উপকারী ছিল। প্রথম চেষ্টাতেই ৭.৫ স্কোর!",
      date: "১ সপ্তাহ আগে",
      avatar: "সা",
    },
    {
      id: 3,
      name: "ফাতেমা জাহান",
      role: "কর্মজীবী পেশাজীবী",
      course: "ডিজিটাল মার্কেটিং",
      rating: 5,
      content:
        "ব্যবহারিক অ্যাসাইনমেন্ট ও শিল্প-প্রাসঙ্গিক কারিকুলাম। কোর্স শেষ হওয়ার সাথে সাথেই মার্কেটিং চাকরি পেয়েছি!",
      date: "৩ সপ্তাহ আগে",
      avatar: "ফ",
    },
  ];

  const stats = [
    {
      label: "সর্বমোট রেটিং",
      value: "৪.৮/৫.০",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "খুশি শিক্ষার্থী",
      value: "২,৫০০+",
      icon: Smile,
      color: "text-emerald-500",
    },
    {
      label: "ফিডব্যাক প্রাপ্তি",
      value: "১,২০০+",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      label: "সাড়া প্রদান হার",
      value: "৯৮%",
      icon: CheckCircle,
      color: "text-purple-500",
    },
  ];

  const quickFeedbackItems = [
    { label: "শিক্ষার মান", icon: Users },
    { label: "কোর্স সামগ্রী", icon: Book },
    { label: "সুবিধাসমূহ", icon: Home },
    { label: "সাপোর্ট সিস্টেম", icon: Headphones },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { ...formData, rating });
    alert("আপনার মূল্যবান ফিডব্যাকের জন্য ধন্যবাদ!");
    setFormData({
      name: "",
      email: "",
      message: "",
      category: "general",
      anonymous: false,
    });
    setRating(0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-feedback"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-feedback)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            আপনার
            <span className="block text-[#3BD480]">অভিজ্ঞতা শেয়ার করুন</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            আপনার চিন্তাভাবনা, পরামর্শ এবং অভিজ্ঞতা শেয়ার করে আমাদের উন্নত করতে
            সাহায্য করুন। প্রতিটি ফিডব্যাক আমাদেরকে উন্নতির দিকে আরো একধাপ
            এগিয়ে নিয়ে যায়।
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/10`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-white/70 font-kalpurush">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Feedback Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-kalpurush">
                  আপনার ফিডব্যাক দিন
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3 font-kalpurush">
                    সামগ্রিক রেটিং *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/40"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-lg font-semibold text-white">
                      {rating > 0 ? `${rating}.0` : "রেটিং নির্বাচন করুন"}
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    আপনার ফিডব্যাক *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                    placeholder="আপনার বিস্তারিত অভিজ্ঞতা, পরামর্শ বা কোনো উদ্বেগ শেয়ার করুন..."
                  />
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Feedback Category */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    ফিডব্যাক বিভাগ *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white"
                  >
                    <option value="general" className="bg-[#17202F]">
                      সাধারণ ফিডব্যাক
                    </option>
                    <option value="teaching" className="bg-[#17202F]">
                      শিক্ষার মান
                    </option>
                    <option value="facilities" className="bg-[#17202F]">
                      সুবিধাসমূহ
                    </option>
                    <option value="courses" className="bg-[#17202F]">
                      কোর্স কন্টেন্ট
                    </option>
                    <option value="support" className="bg-[#17202F]">
                      শিক্ষার্থী সাপোর্ট
                    </option>
                  </select>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#3BD480] rounded focus:ring-[#3BD480]"
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm text-white/70 font-kalpurush"
                  >
                    বেনামে জমা দিন
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 font-kalpurush"
                >
                  <Send className="w-5 h-5" />
                  ফিডব্যাক জমা দিন
                </button>
              </form>
            </div>

            {/* Testimonials Section */}
            <div>
              {/* Categories Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {feedbackCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-kalpurush ${
                      activeTab === category.id
                        ? "bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white border-transparent"
                        : "bg-white/10 border-white/20 text-white/90 hover:border-white/30"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="font-medium">{category.label}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === category.id
                          ? "bg-white/20"
                          : "bg-white/10"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-white font-kalpurush">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white/70 font-kalpurush">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <Quote className="w-6 h-6 text-white/30" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/90 mb-4 leading-relaxed font-kalpurush">
                      "{testimonial.content}"
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-sm text-white/50 font-kalpurush">
                        {testimonial.date}
                      </span>
                      <span className="text-sm font-medium text-[#3BD480] font-kalpurush">
                        {testimonial.course}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-kalpurush">
                <Award className="w-5 h-5 text-[#3BD480]" />
                ফিডব্যাক গাইডলাইন
              </h3>
              <ul className="space-y-3">
                {[
                  "আপনার অভিজ্ঞতা সম্পর্কে নির্দিষ্ট হোন",
                  "ইতিবাচক ও উন্নতির ক্ষেত্র উভয়ই উল্লেখ করুন",
                  "গঠনমূলক পরামর্শ দিন",
                  "প্রাসঙ্গিক হলে নির্দিষ্ট কোর্স বা শিক্ষকের নাম উল্লেখ করুন",
                  "প্রযোজ্য হলে পরিমাপযোগ্য ফলাফল শেয়ার করুন",
                ].map((guideline, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90 font-kalpurush"
                  >
                    <CheckCircle className="w-4 h-4 text-[#3BD480] mt-0.5 flex-shrink-0" />
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Feedback Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-kalpurush">
                দ্রুত ফিডব্যাক
              </h3>
              <div className="space-y-3">
                {quickFeedbackItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg hover:border-[#3BD480] hover:bg-[#3BD480]/10 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="text-white/90 group-hover:text-[#3BD480] font-kalpurush">
                      {item.label}
                    </span>
                    <item.icon className="w-4 h-4 text-white/50 group-hover:text-[#3BD480]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3 font-kalpurush">
                জরুরি সাহায্য প্রয়োজন?
              </h3>
              <p className="text-white/80 mb-4 font-kalpurush">
                জরুরি বিষয়ের জন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
              </p>
              <button className="w-full py-3 bg-white text-[#134C45] font-medium rounded-lg hover:bg-white/90 transition-colors font-kalpurush">
                সাপোর্টে যোগাযোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
