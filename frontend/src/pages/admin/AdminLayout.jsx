import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

const AdminLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F7F8FA] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <AdminHeader />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1  p-4 overflow-scroll pb-20">
          <Outlet />
        </main>

        <AdminMobileNav />
      </div>
    </div>
  );
};

export default AdminLayout;
