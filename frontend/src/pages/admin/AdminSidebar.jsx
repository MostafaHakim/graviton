import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Home,
  Globe,
  UserCircle,
  LogOut,
  Users,
  GraduationCap,
  Target,
  Trophy,
  BookCopy,
  ShieldCheck,
  ShipWheel,
  Megaphone,
  Share2,
  Codesandbox,
  Binoculars,
  Cable,
  CloudSync,
  HandCoins,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navItems = [
    {
      id: "dashboard",
      label: "ড্যাশবোর্ড",
      icon: Home,
      path: "/admin",
    },
    {
      id: "madeeasy",
      label: "মেড ইজি",
      icon: BookOpen,
      path: "/admin/madeeasy",
    },
    {
      id: "admission",
      label: "ভর্তি",
      icon: ShieldCheck,
      path: "/admin/admission",
    },
    {
      id: "student",
      label: "স্টুডেন্ট",
      icon: Users,
      path: "/admin/student",
    },
    {
      id: "teacher",
      label: "শিক্ষক",
      icon: GraduationCap,
      path: "/admin/teacher",
    },
    {
      id: "gallery",
      label: "গ্যালারী",
      icon: Target,
      path: "/admin/gallery",
    },
    {
      id: "abroad",
      label: "বিদেশ যাত্রা",
      icon: Globe,
      path: "/admin/abord",
    },
    {
      id: "course",
      label: "কোর্স",
      icon: Trophy,
      path: "/admin/course",
    },
    {
      id: "flash",
      label: "শব্দ ভান্ডার",
      icon: BookCopy,
      path: "/admin/flash",
    },
    {
      id: "promo",
      label: "প্রোমো কোড",
      icon: Megaphone,
      path: "/admin/promo",
    },
    {
      id: "shareholder",
      label: "শেয়ার হোল্ডার",
      icon: Share2,
      path: "/admin/shareholder",
    },
    {
      id: "club",
      label: "ক্লাব",
      icon: Codesandbox,
      path: "/admin/clubs",
    },
    {
      id: "talent",
      label: "ট্যালেন্ট হান্ট",
      icon: Binoculars,
      path: "/admin/talent",
    },
    {
      id: "message",
      label: "ম্যাসেজ",
      icon: Cable,
      path: "/admin/message",
    },
    {
      id: "about",
      label: "অ্যাবউটস",
      icon: CloudSync,
      path: "/admin/about",
    },
    {
      id: "feedbacks",
      label: "ফিডব্যাক",
      icon: HandCoins,
      path: "/admin/feedbacks",
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-64 hidden lg:flex flex-col bg-white border-r border-gray-200 h-full font-kalpurush">
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
            <img className="w-10 h-10 rounded-lg " src={user?.photo} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {user?.username || "User"}
            </h3>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto min-h-0">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 pb-6 border-t border-gray-200 flex-shrink-0">
        {/* Profile Link */}
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <UserCircle size={18} />
          <span className="text-sm">প্রোফাইল</span>
        </NavLink>
        {/* Settings Link */}
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <ShipWheel size={18} />
          <span className="text-sm">সেটিংস</span>
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">লগআউট</span>
        </button>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">© ২০২৬ গ্র্যাভিটন</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
