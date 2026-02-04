import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { logoutUser } from "../store/features/auth/authSlice";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "হোম" },
    { path: "/club", label: "ক্লাব" },
    { path: "/feedback", label: "ফিডব্যাক" },
    { path: "/studyabroad", label: "বিদেশ পড়াশুনা" },
    { path: "/gallery", label: "গ্যালারি" },
    { path: "/membership", label: "মেম্বারশিপ" },
  ];

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* লোগো */}
          <div className="flex flex-row items-center justify-start space-x-2">
            <img
              className="w-12 h-12 rounded-lg"
              src={Logo}
              alt="গ্র্যাভিটন একাডেমি লোগো"
            />
            <div>
              <h1 className="text-lg text-[#134C45]  font-kalpurush font-bold leading-tight">
                গ্র্যাভিটন একাডেমি
              </h1>
              <h1 className="text-sm text-[#134C45]  font-kalpurush font-bold leading-tight">
                Empowering Minds Through Modern Education
              </h1>
            </div>
          </div>
          {/* নেভিগেশন লিংক */}
          <div className="uppercase text-lg transition-all duration-500 font-kalpurush">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-5 transition-all duration-300 ${
                    isActive
                      ? "bg-[#3BD480]/20  font-bold"
                      : "hover:bg-[#3BD480]/20  text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          {!user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-[#134C45]  border-2 border-[#134C45 ] rounded-lg hover:bg-[#134C45] hover:text-white font-kalpurush transition duration-300 cursor-pointer font-medium"
              >
                লগইন
              </Link>
            </div>
          )}
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to={`/${user.role}`}
                className="px-6 py-2 text-[#134C45]  border-2 border-[#134C45 ] rounded-lg hover:bg-[#134C45] hover:text-white font-kalpurush transition duration-300 cursor-pointer font-medium"
              >
                ড্যাশবোর্ড
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
