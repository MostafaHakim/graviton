// import { ArrowUpRight, BanknoteArrowDown, Book } from "lucide-react";
// import Banner from "../assets/banner.jpg";
// import { Link } from "react-router-dom";

// const HomeContent = () => {
//   return (
//     <div className="bg-linear-to-l max-w-365 mx-auto">
//       <div className=" py-14">
//         <div className="flex flex-row items-center justify-center space-x-6">
//           <div className="flex flex-col items-center justify-between space-y-10">
//             <div className="flex flex-col items-start justify-between space-y-4 px-8">
//               <h2 className="lg:text-6xl  text-primary font-kalpurush font-bold">
//                 গ্র্যাভিটন একাডেমি
//               </h2>
//               <h2 className="lg:text-6xl  text-[#1CBA7D] font-kalpurush">
//                 শিক্ষার নতুন দিগন্ত
//               </h2>
//             </div>
//             <div>
//               <div>
//                 <Book />
//                 <h2>Made Easy সিস্টেম </h2>
//                 <p>বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি </p>
//               </div>
//               <div>
//                 <Book />
//                 <h2>Made Easy সিস্টেম </h2>
//                 <p>বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি </p>
//               </div>
//               <div>
//                 <Book />
//                 <h2>Made Easy সিস্টেম </h2>
//                 <p>বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি </p>
//               </div>
//               <div>
//                 <Book />
//                 <h2>Made Easy সিস্টেম </h2>
//                 <p>বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি </p>
//               </div>
//             </div>
//             <div className="flex flex-row items-center justify-between space-x-6 px-8">
//               <Link
//                 to="/admission"
//                 className="flex flex-row items-center justify-start space-x-2 px-8 py-2 bg-green-500 text-white rounded-md"
//               >
//                 <ArrowUpRight />
//                 <span>Admission</span>
//               </Link>
//               <button className="flex flex-row items-center justify-start space-x-2 px-8 py-2 bg-orange-500 text-white rounded-md">
//                 <BanknoteArrowDown />
//                 <span> Our Courses</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeContent;

// import {
//   ArrowUpRight,
//   BanknoteArrowDown,
//   Book,
//   Users,
//   Target,
//   Award,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const HomeContent = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
//       <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
//             {/* Left Content */}
//             <div className="flex-1">
//               <div className="flex flex-col items-start space-y-8">
//                 <div className="flex flex-col items-start space-y-4">
//                   <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-kalpurush font-bold leading-tight">
//                     গ্র্যাভিটন একাডেমি
//                     <span className="block text-[#3BD480]">
//                       {" "}
//                       শিক্ষার নতুন দিগন্ত
//                     </span>
//                   </h1>

//                   <p className="text-lg text-white/80 max-w-2xl">
//                     আধুনিক প্রযুক্তি ও উদ্ভাবনী শিক্ষা পদ্ধতির মাধ্যমে আমরা তৈরি
//                     করছি আগামী দিনের নেতৃত্ব। আমাদের Made Easy সিস্টেমের মাধ্যমে
//                     সহজেই আয়ত্ত করুন যেকোনো বিষয়।
//                   </p>
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
//                   {[
//                     {
//                       icon: <Book className="w-6 h-6" />,
//                       title: "Made Easy সিস্টেম",
//                       description: "বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি",
//                     },
//                     {
//                       icon: <Target className="w-6 h-6" />,
//                       title: "লক্ষ্য নির্ভর শিক্ষা",
//                       description: "পরীক্ষাভিত্তিক প্রস্তুতি ও নির্দেশনা",
//                     },
//                     {
//                       icon: <Users className="w-6 h-6" />,
//                       title: "অভিজ্ঞ শিক্ষক",
//                       description: "প্রতিষ্ঠিত ও দক্ষ শিক্ষকমন্ডলী",
//                     },
//                     {
//                       icon: <Award className="w-6 h-6" />,
//                       title: "সাফল্যের গ্যারান্টি",
//                       description: "প্রতিবারই সেরা ফলাফল",
//                     },
//                   ].map((feature, index) => (
//                     <div
//                       key={index}
//                       className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:translate-y-[-2px]"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="p-3 bg-[#3BD480]/20 rounded-lg">
//                           <div className="text-[#3BD480]">{feature.icon}</div>
//                         </div>
//                         <div>
//                           <h3 className="text-white font-bold text-lg">
//                             {feature.title}
//                           </h3>
//                           <p className="text-white/70">{feature.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
//                   <Link
//                     to="/admission"
//                     className="group flex items-center justify-center space-x-3 px-8 py-4 bg-[#3BD480] text-[#17202F] rounded-xl font-bold text-lg hover:bg-[#2da866] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30"
//                   >
//                     <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//                     <span>Admission Now</span>
//                   </Link>

//                   <button className="group flex items-center justify-center space-x-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
//                     <BanknoteArrowDown className="w-6 h-6 group-hover:rotate-12 transition-transform" />
//                     <span>Our Courses</span>
//                   </button>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex items-center space-x-8 pt-12">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-white">৫০০+</div>
//                     <div className="text-white/70">সফল শিক্ষার্থী</div>
//                   </div>
//                   <div className="h-12 w-px bg-white/30"></div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-white">৯৫%</div>
//                     <div className="text-white/70">সাফল্যের হার</div>
//                   </div>
//                   <div className="h-12 w-px bg-white/30"></div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-white">২০+</div>
//                     <div className="text-white/70">বিষয় কোর্স</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Decorative Elements */}
//             <div className="hidden lg:block flex-1 relative">
//               {/* Floating Elements */}
//               <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-[#3BD480]/20 to-transparent rounded-full blur-3xl"></div>
//               <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-[#134C45]/30 to-transparent rounded-full blur-3xl"></div>

//               {/* Decorative Circles */}
//               <div className="relative">
//                 <div className="w-96 h-96 border-2 border-[#3BD480]/30 rounded-full absolute -right-10 top-1/2 transform -translate-y-1/2"></div>
//                 <div className="w-80 h-80 border border-[#3BD480]/20 rounded-full absolute -right-5 top-1/2 transform -translate-y-1/2"></div>
//                 <div className="w-64 h-64 border border-[#134C45]/40 rounded-full absolute right-10 top-1/2 transform -translate-y-1/2"></div>

//                 {/* Floating Icons */}
//                 <div className="absolute right-40 top-20 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float">
//                   <Book className="w-8 h-8 text-[#3BD480]" />
//                 </div>
//                 <div
//                   className="absolute right-60 bottom-32 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float"
//                   style={{ animationDelay: "1s" }}
//                 >
//                   <Award className="w-8 h-8 text-[#3BD480]" />
//                 </div>
//                 <div
//                   className="absolute right-20 top-1/2 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float"
//                   style={{ animationDelay: "2s" }}
//                 >
//                   <Target className="w-8 h-8 text-[#3BD480]" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomeContent;
import {
  ArrowUpRight,
  BanknoteArrowDown,
  Book,
  Users,
  Target,
  Award,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomeContent = () => {
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

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Features data
  const features = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "Made Easy সিস্টেম",
      description: "বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "লক্ষ্য নির্ভর শিক্ষা",
      description: "পরীক্ষাভিত্তিক প্রস্তুতি ও নির্দেশনা",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "অভিজ্ঞ শিক্ষক",
      description: "প্রতিষ্ঠিত ও দক্ষ শিক্ষকমন্ডলী",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "সাফল্যের গ্যারান্টি",
      description: "প্রতিবারই সেরা ফলাফল",
    },
  ];

  // Stats data
  const stats = [
    { value: "৫০০+", label: "সফল শিক্ষার্থী" },
    { value: "৯৫%", label: "সাফল্যের হার" },
    { value: "২০+", label: "বিষয় কোর্স" },
  ];

  return (
    <div className="relative  overflow-hidden bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]">
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

      <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12"
          >
            <div className="flex-1 items-center justify-center ">
              <div className="flex flex-col items-center justify-center space-y-8">
                {/* Main Heading */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-kalpurush font-bold leading-tight">
                    গ্র্যাভিটন একাডেমি
                    <motion.span
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="block text-[#3BD480]"
                    >
                      শিক্ষার নতুন দিগন্ত
                    </motion.span>
                  </h1>
                </motion.div>
                {/* Features Grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full "
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="p-3 bg-[#3BD480]/20 rounded-lg"
                        >
                          <div className="text-[#3BD480]">{feature.icon}</div>
                        </motion.div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {feature.title}
                          </h3>
                          <p className="text-white/70">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={containerVariants}
                  className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/admission"
                      className="group flex items-center justify-center space-x-3 px-8 py-4 bg-[#3BD480] text-[#17202F] rounded-xl font-bold text-lg hover:bg-[#2da866] transition-all duration-300 shadow-lg hover:shadow-xl shadow-[#3BD480]/30"
                    >
                      <motion.div
                        animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                      <span>Admission Now</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="group flex items-center justify-center space-x-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <BanknoteArrowDown className="w-6 h-6" />
                      </motion.div>
                      <span>Our Courses</span>
                    </button>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={containerVariants}
                  className="flex flex-wrap items-center gap-8 pt-12"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.2,
                          type: "spring",
                        }}
                        className="text-3xl font-bold text-white"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-white/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
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
    </div>
  );
};

export default HomeContent;
