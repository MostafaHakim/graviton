import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomeContent from "./HomeContent";
import Footer from "../components/Footer";
import Teachers from "./Teachers";
const Home = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <div className="">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {!isHome && (
        <main className="bg-linear-to-l  mx-auto py-10 min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]  px-4 sm:px-6 lg:px-8 relative ">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
            linear-gradient(to right, rgba(59, 212, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 212, 128, 0.1) 1px, transparent 1px)
          `,
                backgroundSize: "40px 40px",
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#17202F]/80 via-[#134C45]/60 to-[#3BD480]/40"></div>
          </div>

          <Outlet />
        </main>
      )}

      {isHome && (
        <div className="bg-linear-to-l  mx-auto relative">
          {/* Background Grid Pattern */}

          <HomeContent />
          <Teachers />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
