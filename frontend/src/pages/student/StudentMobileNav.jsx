import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  User,
  Navigation,
  LayoutGrid,
  Image,
  Users2,
  MessageSquareHeart,
  LogIn,
} from "lucide-react";

const StudentMobileNav = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const nav = [
    { path: "/", label: "Home", icon: Home },
    {
      path: `/${user !== null ? "student/madeeasy" : "gallery"}`,
      label: user !== null ? "Made Easy" : "Gallery",
      icon: user !== null ? BookOpen : Image,
    },
    {
      path: `/${user !== null ? "student" : "membership"}`,
      label: user !== null ? "Dashboard" : "Membership",
      icon: user !== null ? LayoutGrid : Users2,
    },
    {
      path: `/${user !== null ? "student/abroad" : "feedback"}`,
      label: user !== null ? "Fly Abord" : "Feedback",
      icon: user !== null ? Navigation : MessageSquareHeart,
    },
    {
      path: `/${user !== null ? "student/profile" : "login"}`,
      label: user !== null ? "Profile" : "Login",
      icon: user !== null ? User : LogIn,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex justify-around py-2 items-center">
        {nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.to === "/student"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#6C5DD3]" : "text-gray-400"
              }`
            }
          >
            <item.icon size={22} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default StudentMobileNav;
