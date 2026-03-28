import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  Calendar,
  DollarSign,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Clock,
  Users,
  Star,
  Award,
  PlayCircle,
  FileText,
  Heart,
  Share2,
  Bookmark,
  Zap,
} from "lucide-react";

import { toast } from "react-toastify";
import { getCourseById } from "../store/features/auth/courseSlice";

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { course, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#134C45] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-[#134C45] font-kalpurush">
            লোড হচ্ছে...
          </h2>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-[#134C45] mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-[#134C45] font-kalpurush mb-2">
            কোর্স পাওয়া যায়নি
          </h2>
          <p className="text-gray-600 font-kalpurush">
            আপনি যে কোর্স খুঁজছেন তা বিদ্যমান নেই
          </p>
        </div>
      </div>
    );
  }

  // Format date in Bengali
  const formattedDate = new Date(course.createdAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#134C45] to-[#3BD480] text-white">
        <div className="w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1  items-center">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/80 mb-4 text-sm">
                <span>হোম</span>
                <ChevronRight className="w-4 h-4" />
                <span>কোর্স সমূহ</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-semibold whitespace-pre-wrap">
                  {course.name}
                </span>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-kalpurush leading-tight">
                {course.name}
              </h1>

              {/* Course Status Badge */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    course.status === "active"
                      ? "bg-[#3BD480] text-[#134C45]"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {course.status === "active" ? "চলমান" : "আসন্ন"}
                </span>
                <span className="flex items-center gap-2 text-white/90">
                  <Calendar className="w-4 h-4" />
                  <span className="font-kalpurush">{formattedDate}</span>
                </span>
              </div>

              {/* Course Description */}
              {course.about && (
                <p className="text-lg text-white/90 mb-8 font-kalpurush leading-relaxed whitespace-pre-wrap">
                  {course.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
