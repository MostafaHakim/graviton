// import { Outlet } from "react-router-dom";

// import Navbar from "../../components/Navbar";
// import StudentSidebar from "./StudentSidebar";
// import StudentMobileNav from "./StudentMobileNav";

// const StudentLayout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-[#F7F8FA] overflow-hidden">
//       {/* Navbar */}
//       <div className="bg-white border-b border-gray-200 hidden lg:block sticky top-0 z-50">
//         <Navbar />
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div className="hidden lg:block">
//           <StudentSidebar />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 lg:p-4 overflow-y-auto">
//           <Outlet />
//         </main>

//         {/* Mobile Bottom Nav */}
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
      {/* flex-shrink-0 যোগ করা হলো যাতে হেডার কোনোভাবেই সংকুচিত না হয় */}
      <div className="bg-white border-b border-gray-200 hidden lg:block sticky top-0 z-50 flex-shrink-0">
        <Navbar />
      </div>

      {/* Body Container */}
      {/* স্ক্রল ঠিকমতো কাজ করার জন্য এখানে min-h-0 অত্যন্ত জরুরি */}
      <div className="flex flex-1  min-h-0">
        {/* Sidebar */}
        {/* সাইডবার যাতে জায়গা ছেড়ে না দেয় তাই flex-shrink-0 */}
        <div className="hidden lg:block flex-shrink-0">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        {/* মোবাইলের জন্য pb-20 রাখা হলো যাতে Bottom Nav এর নিচে কন্টেন্ট ঢাকা না পড়ে */}
        <main className="flex-1 lg:p-4 p-4 overflow-y-auto pb-20 lg:pb-4">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <StudentMobileNav />
      </div>
    </div>
  );
};

export default StudentLayout;
