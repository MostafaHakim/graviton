import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Import Components
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// ===============================Dashboard==========================

import TeacherDashboard from "./components/features/dashboard/StudentDashboard";
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
import TestGuidLine from "./pages/admin/TestGuidLine";
import TestDetails from "./pages/admin/TestDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />}>
          <Route path="club" element={<Club />} />
          <Route path="admission" element={<AdmissionForm />} />
          <Route path="feedback" element={<FeedBack />} />
          <Route path="studyabroad" element={<FlyToAbroad />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="membership" element={<Membership />} />
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
          <Route path="abroad" element={<FlyToAbroad />} />
        </Route>
        {/* ========================Teacher===================================== */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        {/* ========================Management===================================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagementDashboard />} />
          <Route path="student" element={<StudentManagement />} />

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
          <Route path="madeeasy/tests/:testId" element={<TestDetails />} />

          {/* =============================END====================================== */}

          <Route path="teacher" element={<TeacherManagement />} />
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
    </Provider>
  );
}

export default App;
