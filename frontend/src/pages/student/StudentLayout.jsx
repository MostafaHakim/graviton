// import { Outlet } from "react-router-dom";

// import Navbar from "../../components/Navbar";
// import StudentSidebar from "./StudentSidebar";
// import StudentMobileNav from "./StudentMobileNav";

// const StudentLayout = () => {
//   return (
//     <div className=" flex flex-col  min-h-screen bg-[#F7F8FA] ">
//       <div className="bg-white border-b border-gray-200  hidden lg:block">
//         <Navbar />
//       </div>

//       <div className="flex-1 flex flex-row">
//         <StudentSidebar />

//         <main className="flex-1 lg:p-4 ">
//           <Outlet />
//         </main>

//         <StudentMobileNav />
//       </div>
//     </div>
//   );
// };

// export default StudentLayout;

import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import StudentSidebar from "./StudentSidebar";
import StudentMobileNav from "./StudentMobileNav";

const StudentLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA] overflow-hidden">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 hidden lg:block sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:p-4 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <StudentMobileNav />
      </div>
    </div>
  );
};

export default StudentLayout;
