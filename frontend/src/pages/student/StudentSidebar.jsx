import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Home,
  Globe,
  UserCircle,
  Settings,
  LogOut,
  HelpCircle,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";

const StudentSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navItems = [
    {
      id: "dashboard",
      label: "ড্যাশবোর্ড",
      icon: Home,
      path: "/student",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      id: "madeeasy",
      label: "মেড ইজি",
      icon: BookOpen,
      path: "/student/madeeasy",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    // {
    //   id: "classes",
    //   label: "আমার ক্লাস",
    //   icon: Users,
    //   path: "/student/classes",
    //   color: "text-purple-600",
    //   bg: "bg-purple-50",
    //   border: "border-purple-200",
    // },
    // {
    //   id: "assignments",
    //   label: "অ্যাসাইনমেন্ট",
    //   icon: FileText,
    //   path: "/student/assignments",
    //   color: "text-amber-600",
    //   bg: "bg-amber-50",
    //   border: "border-amber-200",
    // },
    // {
    //   id: "exams",
    //   label: "পরীক্ষা",
    //   icon: BarChart,
    //   path: "/student/exams",
    //   color: "text-red-600",
    //   bg: "bg-red-50",
    //   border: "border-red-200",
    // },
    {
      id: "abroad",
      label: "বিদেশ যাত্রা",
      icon: Globe,
      path: "/student/abroad",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
    },
    // {
    //   id: "club",
    //   label: "ক্লাব",
    //   icon: GraduationCap,
    //   path: "/student/club",
    //   color: "text-pink-600",
    //   bg: "bg-pink-50",
    //   border: "border-pink-200",
    // },
    // {
    //   id: "feedback",
    //   label: "ফিডব্যাক",
    //   icon: MessageSquare,
    //   path: "/student/feedback",
    //   color: "text-indigo-600",
    //   bg: "bg-indigo-50",
    //   border: "border-indigo-200",
    // },
    // {
    //   id: "gallery",
    //   label: "গ্যালারি",
    //   icon: Image,
    //   path: "/student/gallery",
    //   color: "text-teal-600",
    //   bg: "bg-teal-50",
    //   border: "border-teal-200",
    // },
    // {
    //   id: "achievements",
    //   label: "অর্জনসমূহ",
    //   icon: Award,
    //   path: "/student/achievements",
    //   color: "text-orange-600",
    //   bg: "bg-orange-50",
    //   border: "border-orange-200",
    // },
  ];

  const bottomItems = [
    {
      label: "প্রোফাইল",
      icon: UserCircle,
      path: "/student/profile",
      color: "text-gray-600",
    },
    {
      label: "সেটিংস",
      icon: Settings,
      path: "/student/settings",
      color: "text-gray-600",
    },
    {
      label: "সাহায্য",
      icon: HelpCircle,
      path: "/student/help",
      color: "text-gray-600",
    },
  ];

  const studentInfo = {
    name: "আহসান হাবীব",
    studentId: "S-2024-001",
    avatar: "M",
    grade: "নবম শ্রেণী",
    points: 1250,
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const upcomingClassVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-64 hidden lg:flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-[calc(100vh-64px)] shadow-sm"
    >
      {/* Student Profile Card */}
      <motion.div
        variants={profileVariants}
        className="p-6 border-b border-gray-200"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg cursor-pointer"
          >
            {studentInfo.avatar}
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-gray-900 font-kalpurush capitalize"
            >
              {user.studentName}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-gray-600 font-kalpurush"
            >
              {user.studentId}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-gray-700 font-kalpurush bg-gray-100 px-3 py-1 rounded-full"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 capitalize" />
            <span className="capitalize">{user.class}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-gray-700 font-kalpurush bg-gray-100 px-3 py-1 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>{studentInfo.points} পয়েন্ট</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          <AnimatePresence>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to={item.path}
                    end={`${user.role}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-kalpurush relative overflow-hidden group ${
                        isActive
                          ? `${item.bg} ${item.color} font-medium border ${item.border} shadow-sm`
                          : "text-gray-700 hover:bg-gray-50 border border-transparent"
                      }`
                    }
                  >
                    {/* Active Indicator */}
                    {({ isActive }) =>
                      isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-current to-transparent opacity-20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      )
                    }

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    <motion.div
                      className={`p-2 rounded-lg ${item.bg.replace("50", "100")}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </motion.div>

                    <span className="font-medium">{item.label}</span>

                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </NavLink>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2 mb-4">
          <AnimatePresence>
            {bottomItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-kalpurush ${
                        isActive
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={() => {
            dispatch(logoutUser());
          }}
          whileHover={{ scale: 1.02, backgroundColor: "#FEE2E2" }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-kalpurush border border-red-100 cursor-pointer"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <LogOut className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">লগআউট</span>
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-gray-200 text-center"
        >
          <p className="text-xs text-gray-500 font-kalpurush">
            © ২০২৪ গ্র্যাভিটন একাডেমি
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentSidebar;
