import React, { useEffect } from "react";
import {
  Users,
  Award,
  BookOpen,
  Star,
  GraduationCap,
  Clock,
  MessageSquare,
  Sparkles,
  Trophy,
  Globe,
  Heart,
  Calendar,
  Zap,
  Target,
  Lightbulb,
  Shield,
  ChevronRight,
  Mail,
  Phone,
  Briefcase,
  BookMarked,
  Medal,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../store/features/auth/authSlice";

const TeachersPage = () => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const teachers = users.filter((user) => user.role === "teacher");

  // Stats calculation from actual data
  const totalTeachers = teachers.length;
  const avgRating = 4.9; // You can calculate this from actual data if available
  const totalExperience = teachers.reduce((acc, teacher) => {
    const exp = parseInt(teacher.experience) || 0;
    return acc + exp;
  }, 0);
  const totalStudents = teachers.reduce(
    (acc, teacher) => acc + (teacher.students || 0),
    0,
  );

  const stats = [
    {
      label: "সর্বমোট শিক্ষক",
      value: totalTeachers + "+",
      icon: Users,
      color: "text-[#134C45]",
      bg: "bg-[#134C45]/10",
    },
    {
      label: "সর্বোচ্চ রেটিং",
      value: "৪.৯/৫.০",
      icon: Star,
      color: "text-[#3BD480]",
      bg: "bg-[#3BD480]/10",
    },
    {
      label: "মোট অভিজ্ঞতা",
      value: totalExperience + "+ বছর",
      icon: Clock,
      color: "text-[#134C45]",
      bg: "bg-[#134C45]/10",
    },
    {
      label: "সফল শিক্ষার্থী",
      value: "১০,০০০+",
      icon: GraduationCap,
      color: "text-[#3BD480]",
      bg: "bg-[#3BD480]/10",
    },
  ];

  const teachingMethodologies = [
    {
      title: "ইন্টার‍্যাকটিভ লার্নিং",
      description:
        "ইন্টার‍্যাকটিভ ক্লাসের মাধ্যমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ",
      icon: Zap,
      color: "text-[#134C45]",
      bg: "bg-[#134C45]/10",
    },
    {
      title: "ব্যক্তিগত মনোযোগ",
      description: "প্রতিটি শিক্ষার্থীর জন্য আলাদা মনোযোগ ও গাইডেন্স",
      icon: Heart,
      color: "text-[#3BD480]",
      bg: "bg-[#3BD480]/10",
    },
    {
      title: "বাস্তব উদাহরণ",
      description: "বাস্তব জীবনের উদাহরণ দিয়ে জটিল বিষয় সহজে বোঝানো",
      icon: Target,
      color: "text-[#134C45]",
      bg: "bg-[#134C45]/10",
    },
    {
      title: "মডার্ন টেকনোলজি",
      description: "আধুনিক প্রযুক্তি ব্যবহার করে আকর্ষণীয় ক্লাস",
      icon: Lightbulb,
      color: "text-[#3BD480]",
      bg: "bg-[#3BD480]/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#134C45]/10 px-4 py-2 rounded-full mb-4">
            <Medal className="w-5 h-5 text-[#134C45]" />
            <span className="text-[#134C45] font-semibold font-kalpurush">
              এক্সপার্ট টিচার্স টিম
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#17202F] mb-4 font-kalpurush">
            আমাদের শিক্ষকমণ্ডলী
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#134C45] to-[#3BD480] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalpurush">
            দেশের খ্যাতনামা বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী, অভিজ্ঞ ও
            প্রশিক্ষিত শিক্ষকদের নিয়ে গঠিত আমাদের দক্ষ টিম। প্রতিটি শিক্ষক
            শিক্ষার্থীদের সাফল্যের জন্য নিবেদিতপ্রাণ।
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#134C45] to-[#3BD480]"></div>
              <div className="p-6 text-center">
                <div
                  className={`inline-flex p-3 ${stat.bg} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-[#134C45] mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-kalpurush">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teachers.map((teacher, index) => (
            <div
              key={teacher._id || index}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#134C45] to-[#3BD480]"></div>

              {/* Profile Image Section */}
              <div className="relative pt-8 px-6 pb-4">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#134C45]/5 rounded-full -mr-8 -mt-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#3BD480]/5 rounded-full -ml-8 -mb-8"></div>

                {/* Profile Image */}
                <div className="relative mx-auto mb-4">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                    {teacher.photo ? (
                      <img
                        src={teacher.photo}
                        alt={teacher.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#134C45] to-[#3BD480] flex items-center justify-center">
                        <span className="text-4xl text-white font-bold">
                          {teacher.username?.charAt(0) || "T"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full font-kalpurush ${
                        teacher.status === "active"
                          ? "bg-green-100 text-green-700"
                          : teacher.status === "block"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {teacher.status === "active"
                        ? "সক্রিয়"
                        : teacher.status === "block"
                          ? "ব্লক"
                          : "পেন্ডিং"}
                    </span>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-[#134C45] mb-1 font-kalpurush">
                    {teacher.username}
                  </h3>

                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#3BD480]/10 rounded-full mb-2">
                    <Briefcase className="w-3 h-3 text-[#3BD480]" />
                    <p className="text-sm font-medium text-[#3BD480] font-kalpurush">
                      {teacher.designation || "শিক্ষক"}
                    </p>
                  </div>

                  {/* Teacher ID */}
                  <p className="text-xs text-gray-500 font-mono mb-2">
                    ID: {teacher.userId || teacher._id?.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="px-6 pb-6 space-y-3">
                {/* Experience & Qualification */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#134C45]/5 rounded-lg p-2 text-center">
                    <Clock className="w-4 h-4 text-[#134C45] mx-auto mb-1" />
                    <p className="text-xs text-gray-600 font-kalpurush">
                      অভিজ্ঞতা
                    </p>
                    <p className="text-sm font-bold text-[#134C45]">
                      {teacher.experience || "N/A"}
                    </p>
                  </div>
                  <div className="bg-[#3BD480]/5 rounded-lg p-2 text-center">
                    <GraduationCap className="w-4 h-4 text-[#3BD480] mx-auto mb-1" />
                    <p className="text-xs text-gray-600 font-kalpurush">
                      শিক্ষাগত যোগ্যতা
                    </p>
                    <p className="text-xs font-bold text-[#3BD480] truncate">
                      {teacher.qualification || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                {teacher.specialization &&
                  teacher.specialization.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2 font-kalpurush">
                        বিশেষায়িত ক্ষেত্র:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specialization.map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-kalpurush"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Achievements */}
                {teacher.achievements && (
                  <div className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg">
                    <Trophy className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 font-kalpurush">
                      {teacher.achievements}
                    </p>
                  </div>
                )}

                {/* Contact Info */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex flex-col items-start justify-between text-xs text-gray-500 space-y-1">
                    <div className="flex items-start gap-1 bg-[#3BD480]/20 p-2 rounded w-full">
                      <Mail className="w-3 h-3" />
                      <span className="truncate ">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#fdcb6e]/20 p-2 rounded w-full">
                      <Phone className="w-3 h-3" />
                      <span>{teacher.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-[#134C45] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Teaching Methodologies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#134C45] mb-4 font-kalpurush">
            আমাদের শিক্ষাদান পদ্ধতি
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#134C45] to-[#3BD480] mx-auto mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingMethodologies.map((method, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#134C45] to-[#3BD480]`}
                ></div>
                <div className="p-6">
                  <div
                    className={`inline-flex p-3 ${method.bg} rounded-xl mb-4`}
                  >
                    <method.icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#134C45] mb-2 font-kalpurush">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-kalpurush">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
