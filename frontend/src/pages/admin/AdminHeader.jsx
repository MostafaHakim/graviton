import { LogOut } from "lucide-react";
import Logo from "../../assets/logo.jpg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 hidden lg:block">
      <div className="flex justify-between items-center">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="relative p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/200/300"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-right">
                <p className="text-sm font-semibold capitalize">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>{" "}
          </button>

          <button
            onClick={() => {
              dispatch(logoutUser());
            }}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
