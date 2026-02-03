import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import StudentSidebar from "./StudentSidebar";
import AdminMobileNav from "../admin/AdminMobileNav";
import AdminHeader from "../admin/AdminHeader";

const StudentLayout = () => {
  return (
    <div className=" flex flex-col  min-h-screen bg-[#F7F8FA] ">
      <div className="bg-white border-b border-gray-200  hidden lg:block">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-row">
        <StudentSidebar />

        <main className="flex-1 p-4 ">
          <Outlet />
        </main>

        <AdminMobileNav />
      </div>
    </div>
  );
};

export default StudentLayout;
