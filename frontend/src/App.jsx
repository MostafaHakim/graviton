import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
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
import MadeEasy from "./pages/MadeEasy";
import AdmissionForm from "./components/AdmissionForm";
import FeedBack from "./pages/FeedBack";
import FlyToAbroad from "./pages/FlyToAbroad";
import Gallery from "./pages/Gallery";
import Membership from "./pages/Membership";
import AdminLayout from "./pages/admin/AdminLayout";
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./components/features/dashboard/StudentDashboard";
import MadeEasyManagement from "./pages/admin/MadeEasyManagement";
import AdmissionManagement from "./pages/admin/AdmissionManagement";
import AdmissionById from "./pages/admin/AdmissionById";
import AddSubject from "./components/features/subject/AddSubject";
import ChapterContentPage from "./components/ChapterContentPage";
import ChapterDetails from "./components/ChapterDetails";
import GalleryUpload from "./components/GalleryUpload";
import AdminGallery from "./pages/admin/AdminGallery";
import StudentManagement from "./pages/admin/StudentManagement";
import TeacherManagement from "./pages/admin/TeacherManagement";
import CreateExam from "./pages/exam/CreateExam";
import AdminExamManagement from "./pages/admin/AdminExamManagement";
import ExamDetail from "./pages/exam/ExamDetail";
import AddQuestion from "./pages/exam/AddQuestion";
import StudentStartExam from "./pages/exam/StudentStartExam";
import AllExamForAdmin from "./pages/exam/AllExamForAdmin";

const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);

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
          <Route path="madeeasy" element={<MadeEasy />} />
          <Route
            path="madeeasy/:subjectId/:classId/:paperId/:chapterIndex"
            element={<ChapterDetails />}
          />
          <Route path="club" element={<Club />} />
          <Route path="abroad" element={<FlyToAbroad />} />
          <Route path="abroad/exams/:id" element={<StudentStartExam />} />
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
          <Route path="exams" element={<AllExamForAdmin />} />
          <Route path="exams/add" element={<CreateExam />} />
          <Route path="exams/:id" element={<ExamDetail />} />
          <Route path="tests/:id" element={<AddQuestion />} />
          <Route path="teacher" element={<TeacherManagement />} />
          <Route path="madeeasy" element={<MadeEasyManagement />} />
          <Route path="admission" element={<AdmissionManagement />} />
          <Route path="admission/:id" element={<AdmissionById />} />
          <Route path="madeeasy/add" element={<AddSubject />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="gallery/upload" element={<GalleryUpload />} />
          <Route
            path="madeeasy/:subjectId/:classId/:paperId/:chapterIndex"
            element={<ChapterContentPage />}
          />
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
