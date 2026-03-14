import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomeContent from "./HomeContent";
import Footer from "../components/Footer";
import Teachers from "./Teachers";
import AdminMobileNav from "./admin/AdminMobileNav";
import StudentMobileNav from "./student/StudentMobileNav";
import PartnerShip from "./PartnerShip";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import MadeEasySection from "../components/MadeEasySection";
import SuccessGuarantee from "../components/SuccessGuarantee";
import TargetEducation from "../components/TargetEducation";
import TalentHuntSection from "../components/TalentHuntSection";
const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const scrollToSection = (id) => {
    lenisRef.current?.scrollTo(id);
  };

  return (
    <div className="">
      <div className="hidden md:block sticky top-0 z-50">
        <Navbar />
      </div>
      {!isHome && (
        <main className="bg-linear-to-l  mx-auto py-10 min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]  px-4 sm:px-6 lg:px-8 relative ">
          <Outlet />
        </main>
      )}

      {isHome && (
        <div className="bg-linear-to-l  mx-auto relative">
          {/* Background Grid Pattern */}

          <HomeContent scrollToSection={scrollToSection} />
          <TalentHuntSection />
          <MadeEasySection />
          <TargetEducation />
          <PartnerShip />
          <SuccessGuarantee />
          <Teachers />
        </div>
      )}
      <div>
        <Footer />
      </div>
      {user && user.role === "admin" ? (
        <AdminMobileNav />
      ) : user && user.role === "teacher" ? (
        <AdminMobileNav />
      ) : (
        <StudentMobileNav />
      )}
    </div>
  );
};

export default Home;
