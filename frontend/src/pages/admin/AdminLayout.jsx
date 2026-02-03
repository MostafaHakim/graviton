import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

const AdminLayout = () => {
  return (
    <div className="w-full flex flex-col  min-h-screen bg-[#F7F8FA] ">
      <AdminHeader />

      <div className=" flex flex-row">
        <AdminSidebar />

        <main className="flex-1 p-4 ">
          <Outlet />
        </main>

        <AdminMobileNav />
      </div>
    </div>
  );
};

export default AdminLayout;
