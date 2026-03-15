// import { LogOut } from "lucide-react";
// import Logo from "../../assets/logo.jpg";

// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AdminHeader = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 hidden lg:block">
//       <div className="flex justify-between items-center">
//         <div className="flex flex-row items-center justify-start space-x-2">
//           <img
//             className="w-12 h-12 rounded-lg"
//             src={Logo}
//             alt="গ্র্যাভিটন একাডেমি লোগো"
//           />
//           <div>
//             <h1 className="text-lg text-[#134C45]  font-kalpurush font-bold leading-tight">
//               গ্র্যাভিটন একাডেমি
//             </h1>
//             <h1 className="text-sm text-[#134C45]  font-kalpurush font-bold leading-tight">
//               Empowering Minds Through Modern Education
//             </h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/profile")}
//             className="relative p-2 rounded-lg hover:bg-gray-100"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src="https://picsum.photos/200/300"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="text-right">
//                 <p className="text-sm font-semibold capitalize">
//                   {user.username}
//                 </p>
//                 <p className="text-xs text-gray-400 capitalize">{user.role}</p>
//               </div>
//             </div>{" "}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

import { LogOut } from "lucide-react";
import Logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2 hidden lg:block">
      <div className="flex justify-between items-center">
        {/* Left side - Logo and Title */}
        <Link to="/" className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-lg object-cover"
            src={Logo}
            alt="গ্র্যাভিটন একাডেমি"
          />
          <div>
            <h1 className="text-base font-medium text-gray-900 font-kalpurush">
              গ্র্যাভিটন একাডেমি
            </h1>
            <p className="text-xs text-gray-500">
              Empowering Minds Through Modern Education
            </p>
          </div>
        </Link>

        {/* Right side - User Profile */}
        <div className="flex items-center">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "Admin"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              <img className="w-10 h-10 rounded-lg " src={user?.photo} alt="" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
