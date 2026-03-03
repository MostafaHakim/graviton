import { NavLink } from "react-router-dom";
import { Home, BookOpen, ClipboardCheck, User, LayoutGrid } from "lucide-react";

const AdminMobileNav = () => {
  const nav = [
    { path: "/", label: "Home", icon: Home },
    { path: "/admin/madeeasy", label: "Made Easy", icon: BookOpen },
    { path: "/admin", label: "Dashboard", icon: LayoutGrid },
    { path: "/admin/abord", label: "Fly Abord", icon: ClipboardCheck },
    { path: "/admin/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-2 items-center">
        {nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#6C5DD3]" : "text-gray-400"
              }`
            }
          >
            <item.icon size={22} />
            {item.label}
            {console.log(item.label)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminMobileNav;
