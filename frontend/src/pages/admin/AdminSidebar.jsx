import React, { useState } from "react";
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
  Bell,
  Target,
  Zap,
  Bookmark,
  Calendar,
  TrendingUp,
  Award,
  Shield,
  Users,
  BookText,
  GraduationCap,
  Clock,
  Trophy,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeHover, setActiveHover] = useState(null);

  const navItems = [
    {
      id: "dashboard",
      label: "ড্যাশবোর্ড",
      icon: Home,
      path: "/admin",
      color: "text-[#6C5DD3]",
      bg: "bg-[#F1EDFF]",
      border: "border-l-4 border-[#6C5DD3]",
      iconBg: "bg-[#6C5DD3]/10",
      count: 3,
    },
    {
      id: "madeeasy",
      label: "মেড ইজি",
      icon: BookOpen,
      path: "/admin/madeeasy",
      color: "text-[#FF754C]",
      bg: "bg-[#FFF2EE]",
      border: "border-l-4 border-[#FF754C]",
      iconBg: "bg-[#FF754C]/10",
      premium: true,
    },
    {
      id: "admission",
      label: "ভর্তি",
      icon: ShieldCheck,
      path: "/admin/admission",
      color: "text-[#7FBA7A]",
      bg: "bg-[#F0F7EF]",
      border: "border-l-4 border-[#7FBA7A]",
      iconBg: "bg-[#7FBA7A]/10",
      count: 2,
    },
    {
      id: "student",
      label: "স্টুডেন্ট",
      icon: Users,
      path: "/admin/student",
      color: "text-[#7FBA7A]",
      bg: "bg-[#F0F7EF]",
      border: "border-l-4 border-[#7FBA7A]",
      iconBg: "bg-[#7FBA7A]/10",
      count: 2,
    },
    {
      id: "assignments",
      label: "শিক্ষক",
      icon: GraduationCap,
      path: "/student/assignments",
      color: "text-[#FFA2C0]",
      bg: "bg-[#FFF0F5]",
      border: "border-l-4 border-[#FFA2C0]",
      iconBg: "bg-[#FFA2C0]/10",
      count: 5,
    },
    {
      id: "exams",
      label: "মক টেস্ট",
      icon: Target,
      path: "/student/exams",
      color: "text-[#3E8BFF]",
      bg: "bg-[#EDF5FF]",
      border: "border-l-4 border-[#3E8BFF]",
      iconBg: "bg-[#3E8BFF]/10",
    },
    {
      id: "abroad",
      label: "বিদেশ যাত্রা",
      icon: Globe,
      path: "/student/abroad",
      color: "text-[#59C3D1]",
      bg: "bg-[#EFF9FA]",
      border: "border-l-4 border-[#59C3D1]",
      iconBg: "bg-[#59C3D1]/10",
      new: true,
    },
    {
      id: "progress",
      label: "প্রোগ্রেস",
      icon: TrendingUp,
      path: "/student/progress",
      color: "text-[#A461D8]",
      bg: "bg-[#F5F0FA]",
      border: "border-l-4 border-[#A461D8]",
      iconBg: "bg-[#A461D8]/10",
    },
    {
      id: "club",
      label: "ক্লাব",
      icon: Trophy,
      path: "/admin/club",
      color: "text-[#FFC224]",
      bg: "bg-[#FFF9EB]",
      border: "border-l-4 border-[#FFC224]",
      iconBg: "bg-[#FFC224]/10",
    },
  ];

  const bottomItems = [
    {
      label: "প্রোফাইল",
      icon: UserCircle,
      path: "/student/profile",
      color: "text-gray-600",
    },
    {
      label: "নোটিফিকেশন",
      icon: Bell,
      path: "/student/notifications",
      color: "text-gray-600",
      count: 12,
    },
    {
      label: "সেভ করা",
      icon: Bookmark,
      path: "/student/saved",
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
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-72 hidden lg:flex flex-col bg-white border-r border-gray-100 min-h-[calc(100vh-64px)] shadow-sm relative font-kalpurush"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F1EDFF] to-transparent rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#FFF2EE] to-transparent rounded-tr-full opacity-30"></div>

      {/* Student Profile Card */}
      <div className="p-6 border-b border-gray-100 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#8B7AE8] flex items-center justify-center text-white text-2xl font-bold shadow-lg cursor-pointer capitalize">
              {user?.username?.charAt(0) || "S"}
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg capitalize">
              {user?.username || "স্টুডেন্ট"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">
                {user?.userId || "ID"}
              </span>
              <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-[#FF754C] to-[#FF9E7D] text-white rounded-full shadow-sm">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto relative z-10">
        <div className="px-2 mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            প্রধান মেনু
          </p>
        </div>
        <div className="space-y-1">
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
                  onMouseEnter={() => setActiveHover(item.id)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? `${item.bg} ${item.border} shadow-md`
                          : "hover:bg-gray-50 border-l-4 border-transparent"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-current to-transparent opacity-30"
                          />
                        )}

                        {/* Hover Shine */}
                        {activeHover === item.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        )}

                        {/* Left Side */}
                        <div className="flex items-center gap-3 relative z-10">
                          <div className={`p-2.5 rounded-lg ${item.iconBg}`}>
                            <Icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <span className={`font-medium ${item.color}`}>
                            {item.label}
                          </span>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-2 relative z-10">
                          {item.count && (
                            <span className="px-2 py-1 text-xs font-bold bg-[#6C5DD3] text-white rounded-full min-w-6 text-center shadow-sm">
                              {item.count}
                            </span>
                          )}
                          {item.premium && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-[#FF754C] to-[#FF9E7D] text-white rounded-full shadow-sm">
                              PRO
                            </span>
                          )}
                          {item.new && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-[#59C3D1] to-[#8BD9E3] text-white rounded-full shadow-sm">
                              NEW
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-300 ${item.color} group-hover:translate-x-1`}
                          />
                        </div>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 relative z-10 bg-gradient-to-t from-white to-gray-50">
        <div className="space-y-1 mb-4">
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
                      `flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gray-100 text-gray-900 border-l-4 border-[#6C5DD3]"
                          : "text-gray-600 hover:bg-gray-100 border-l-4 border-transparent"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full min-w-6 text-center shadow-sm">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={() => dispatch(logoutUser())}
          whileHover={{ scale: 1.02, backgroundColor: "#FEE2E2" }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-white to-gray-50 text-red-600 hover:text-red-700 transition-all border border-gray-200 hover:border-red-200 cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut className="w-5 h-5" />
            </motion.div>
            <span className="font-medium">লগআউট</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-100 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-500" />
            <p className="text-xs text-gray-600">সুরক্ষিত সংযোগ</p>
          </div>
          <p className="text-xs text-gray-600">© ২০২৪ গ্র্যাভিটন একাডেমি</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
