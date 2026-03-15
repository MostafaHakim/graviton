import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

const AdminLayout = () => {
  return (
    // মেইন র‍্যাপারে overflow-hidden দেওয়া হলো
    <div className="h-screen flex flex-col bg-[#F7F8FA] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <AdminHeader />
      </div>

      {/* Body */}
      {/* এখানে min-h-0 যোগ করা খুবই জরুরি, যাতে এটি কন্টেন্টের কারণে বড় না হয়ে যায় */}
      <div className="flex flex-1  min-h-0">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        {/* overflow-y-scroll এর বদলে overflow-y-auto ব্যবহার করুন */}
        <main className="flex-1 lg:p-4 overflow-y-auto pb-20">
          <Outlet />
        </main>

        <AdminMobileNav />
      </div>
    </div>
  );
};

export default AdminLayout;
