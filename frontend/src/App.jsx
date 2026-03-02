import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Import Components
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// ===============================Dashboard==========================

import TeacherDashboard from "./components/features/dashboard/TeacherDashboard";
import ManagementDashboard from "./components/features/dashboard/AdminDashboard";

// =============================Pages===================
import Home from "./pages/Home";
import Club from "./pages/Club";
import AdmissionForm from "./components/AdmissionForm";
import FeedBack from "./pages/FeedBack";
import FlyToAbroad from "./pages/FlyToAbroad";
import Gallery from "./pages/Gallery";
import Membership from "./pages/Membership";
import AdminLayout from "./pages/admin/AdminLayout";
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./components/features/dashboard/StudentDashboard";
import AdmissionManagement from "./pages/admin/AdmissionManagement";
import AdmissionById from "./pages/admin/AdmissionById";
import GalleryUpload from "./components/GalleryUpload";
import AdminGallery from "./pages/admin/AdminGallery";
import StudentManagement from "./pages/admin/StudentManagement";
import TeacherManagement from "./pages/admin/TeacherManagement";
import MadeEasyManagement from "./pages/admin/MadeEasyManagement";
import ClassManageMent from "./pages/admin/ClassManageMent";
import SubjectManagement from "./pages/admin/SubjectManagement";
import ChapterManagement from "./pages/admin/ChapterManagement";
import AdminTestManagement from "./components/AdminTestManagement";
import TestDetails from "./pages/admin/TestDetails";
import StudentClassWise from "./pages/admin/StudentClassWise";
import CreatePaper from "./components/CreatePaper";
import PaperList from "./components/PaperList";
import MadeEasy from "./pages/student/MadeEasy";
import Subject from "./pages/student/Subject";
import Chapter from "./pages/student/Chapter";
import TestGuidLine from "./pages/student/TestGuidLine";
import Exam from "./pages/student/Exam";
import StudentProfile from "./pages/student/StudentProfile";
import StudentProfileManagement from "./pages/admin/StudentProfileManagement";
import AdmissionPrint from "./components/AdmissionPrint";
import PremiumMemberForm from "./components/PremiumMemberForm";
import AbordTest from "./pages/student/AbordTest";
import AbordTestManagement from "./pages/admin/AbordTestManagement";
import SkillManagement from "./pages/admin/SkillManagement";
import SkillTypeManagement from "./pages/admin/SkillTypeManagement";
import PartManagement from "./pages/admin/PartManagement";
import AdminPartManagement from "./components/AdminPartManagement";
import PartDetails from "./pages/admin/PartDetails";
import CreatePaperForPart from "./components/CreatePaperForPart";
import PartPaperList from "./components/PartPaperList";
import AdminProfile from "./pages/admin/AdminProfile";
import UserForm from "./components/UserForm";
import TeacherLayout from "./pages/teacher/TeacherLayout";
import ClubManagement from "./pages/admin/ClubManagement";

// =======================Admin Student=======================

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />}>
          <Route path="club" element={<Club />} />
          <Route path="admission" element={<AdmissionForm />} />
          <Route path="view/:admissionId" element={<AdmissionPrint />} />
          <Route path="feedback" element={<FeedBack />} />
          <Route path="studyabroad" element={<FlyToAbroad />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="membership" element={<Membership />} />
          <Route path="membership/create" element={<PremiumMemberForm />} />
        </Route>

        {/* ========================Student===================================== */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="club" element={<Club />} />
          <Route path="abroad" element={<AbordTest />} />
          <Route path="madeeasy" element={<MadeEasy />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="madeeasy/subject/:subjectId" element={<Subject />} />
          <Route
            path="madeeasy/subject/:subjectId/:chapterId"
            element={<Chapter />}
          />
          <Route
            path="madeeasy/subject/:subjectId/:chapterId/:paperId/guidline"
            element={<TestGuidLine />}
          />
          <Route path="madeeasy/:paperId/start" element={<Exam />} />
        </Route>
        {/* ******************************************************************************************************************************************************** */}
        {/* ============================================================================== */}
        {/* ========================Teacher===================================== */}
        {/* ============================================================================ */}
        {/* ************************************************************************************************************************************************************ */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
        </Route>

        {/* ===================================================================================== */}
        {/* ========================Amin Section Management===================================== */}
        {/* ======================================================================================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagementDashboard />} />
          {/* ========================Student Management By Admin====================== */}
          <Route path="profile" element={<AdminProfile />} />

          <Route path="student" element={<StudentManagement />} />
          <Route path="student/:classId" element={<StudentClassWise />} />
          <Route
            path="student/:classId/:studentId"
            element={<StudentProfileManagement />}
          />

          {/* ========================Made Easy Management with Class Subject=================== */}

          <Route path="madeeasy" element={<MadeEasyManagement />} />
          <Route path="madeeasy/:classId" element={<ClassManageMent />} />
          <Route
            path="madeeasy/:classId/:subjectId"
            element={<SubjectManagement />}
          />
          <Route
            path="madeeasy/:classId/:subjectId/:chapterId"
            element={<ChapterManagement />}
          />
          <Route
            path="madeeasy/:classId/:subjectId/:chapterId/newtest"
            element={<AdminTestManagement />}
          />
          <Route
            path="madeeasy/:classId/:subjectId/:chapterId/:testId"
            element={<TestDetails />}
          />
          <Route
            path="madeeasy/:classId/:subjectId/:chapterId/:testId/create-paper"
            element={<CreatePaper />}
          />
          <Route path="madeeasy/paper" element={<PaperList />} />

          {/* =============================END====================================== */}

          {/* =============================Abord Management====================================== */}
          <Route path="abord" element={<AbordTestManagement />} />
          <Route path="abord/:classId" element={<SkillManagement />} />
          <Route
            path="abord/:classId/:subjectId"
            element={<SkillTypeManagement />}
          />
          <Route
            path="abord/:classId/:subjectId/:chapterId"
            element={<PartManagement />}
          />

          <Route
            path="abord/:classId/:subjectId/:chapterId/newtest"
            element={<AdminPartManagement />}
          />
          <Route
            path="abord/:classId/:subjectId/:chapterId/:testId"
            element={<PartDetails />}
          />
          <Route
            path="abord/:classId/:subjectId/:chapterId/:testId/create-paper"
            element={<CreatePaperForPart />}
          />
          <Route path="abord/paper" element={<PartPaperList />} />

          {/* ======================================================================= */}
          {/* =============================Teacher Management====================================== */}
          {/* =============================Start====================================== */}

          <Route path="teacher" element={<TeacherManagement />} />
          <Route path="teacher/add" element={<UserForm />} />

          {/* ======================================================================= */}
          {/* =============================Club Management====================================== */}
          {/* =============================Start====================================== */}
          <Route path="club" element={<ClubManagement />} />
          {/* ======================================================================= */}
          {/* =============================Club Management====================================== */}
          {/* =============================Start====================================== */}
          <Route path="admission" element={<AdmissionManagement />} />
          <Route path="admission/:id" element={<AdmissionById />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="gallery/upload" element={<GalleryUpload />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
}

export default App;
