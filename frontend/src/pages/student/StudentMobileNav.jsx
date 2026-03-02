import { NavLink } from "react-router-dom";
import { Home, BookOpen, ClipboardCheck, User, Navigation } from "lucide-react";

const nav = [
  { path: "/", label: "Home", icon: Home },
  { path: "/student/madeeasy", label: "Made Easy", icon: BookOpen },
  { path: "/student/abroad", label: "Fly Abord", icon: Navigation },
  { path: "/student/profile", label: "Profile", icon: User },
];

const StudentMobileNav = () => {
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
