import { Outlet } from "react-router-dom";
import AdminMobileNav from "../admin/AdminMobileNav";
import TeacherHeader from "./TeacherHeader";
import TeacherSidebar from "./TeacherSidebar";

const TeacherLayout = () => {
  return (
    <div className="w-full flex flex-col  min-h-screen bg-[#F7F8FA] ">
      <TeacherHeader />

      <div className=" flex flex-row">
        <TeacherSidebar />

        <main className="flex-1 p-4 ">
          <Outlet />
        </main>

        <AdminMobileNav />
      </div>
    </div>
  );
};

export default TeacherLayout;
