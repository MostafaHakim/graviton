import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  Shield,
  TrendingUp,
  Activity,
  Clock,
  Award,
  Menu,
  Bell,
  Search,
  Download,
  Filter,
  User,
  BrickWallFire,
  AArrowUp,
  Boxes,
  Atom,
} from "lucide-react";
import { useEffect } from "react";
import { getAllStudents } from "../../../store/features/auth/studentsSlice";
import { getTeachers } from "../../../store/features/auth/authSlice";
import { getCourses } from "../../../store/features/auth/courseSlice";
import { getClubs } from "../../../store/features/auth/clubSlice";
import { getAdmission } from "../../../store/features/auth/admissionSlice";
import { getClasses } from "../../../store/features/auth/classesSlice";
import { getShare } from "../../../store/features/auth/shareSlice";

const AdminDashboard = () => {
  const { user, teachers } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);
  const { courses } = useSelector((state) => state.courses);
  const { clubs } = useSelector((state) => state.clubs);
  const { admissions } = useSelector((state) => state.admissions);
  const { classes } = useSelector((state) => state.classes);
  const { share } = useSelector((state) => state.share);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getTeachers());
    dispatch(getCourses());
    dispatch(getClubs());
    dispatch(getAdmission());
    dispatch(getClasses());
    dispatch(getShare());
  }, [dispatch]);

  const stats = [
    {
      label: "মোট শিক্ষার্থী",
      value: students?.length,
      change: "+১২%",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      label: "মোট শিক্ষক",
      value: teachers?.length,
      change: "+৫%",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      label: "মোট ক্লাস",
      value: classes?.length,
      change: "+৮%",
      icon: BookOpen,
      color: "from-yellow-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      label: "সক্রিয় কোর্স",
      value: courses?.length,
      change: "+৮%",
      icon: Atom,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      label: "আমাদের ক্লাব",
      value: clubs?.length,
      change: "+২৩%",
      icon: BrickWallFire,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
    },
    {
      label: "ভর্তি",
      value: admissions?.length,
      change: `নতুন ভর্তি ${
        admissions?.filter((admission) => admission.status === "pending")
          ?.length
      }`,
      icon: AArrowUp,
      color: "from-rose-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
    },
    {
      label: "শেয়ার হোল্ডার",
      value: share?.length,
      change: "+২৩%",
      icon: Boxes,
      color: "from-lime-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 lg:rounded-2xl pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3BD480]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#134C45]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-kalpurush">
                এডমিন ড্যাশবোর্ড
              </h1>
              <p className="text-gray-300 mt-2">
                স্বাগতম,{" "}
                <span className="text-[#3BD480] font-semibold">
                  {user?.username || "এডমিন"}!
                </span>
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 text-xs font-medium">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-200 text-sm">{stat.label}</p>
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} w-3/4`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
