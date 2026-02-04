import { useSelector } from "react-redux";
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
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      label: "মোট শিক্ষার্থী",
      value: "২,৮৪৫",
      change: "+১২%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      label: "মোট শিক্ষক",
      value: "১৫৬",
      change: "+৫%",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      label: "সক্রিয় কোর্স",
      value: "৮৯",
      change: "+৮%",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      label: "মোট আয়",
      value: "২৪৫K",
      change: "+২৩%",
      icon: DollarSign,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
    },
  ];

  const recentActivities = [
    {
      user: "আহমেদ রহমান",
      action: "নতুন কোর্স এনরোল করেছেন",
      time: "৫ মিনিট আগে",
      status: "success",
    },
    {
      user: "ফারহানা ইসলাম",
      action: "কোর্স সম্পন্ন করেছেন",
      time: "১ ঘন্টা আগে",
      status: "complete",
    },
    {
      user: "করিম উল্লাহ",
      action: "পেমেন্ট সম্পন্ন করেছেন",
      time: "২ ঘন্টা আগে",
      status: "payment",
    },
    {
      user: "সাবরিনা সুলতানা",
      action: "প্রোফাইল আপডেট করেছেন",
      time: "৩ ঘন্টা আগে",
      status: "update",
    },
    {
      user: "রফিকুল ইসলাম",
      action: "নতুন অ্যাসাইনমেন্ট জমা দিয়েছেন",
      time: "৫ ঘন্টা আগে",
      status: "assignment",
    },
  ];

  const quickActions = [
    {
      title: "ব্যবহারকারী ব্যবস্থাপনা",
      icon: Users,
      color: "from-blue-600 to-cyan-600",
      path: "/admin/users",
    },
    {
      title: "কোর্স ব্যবস্থাপনা",
      icon: BookOpen,
      color: "from-purple-600 to-pink-600",
      path: "/admin/courses",
    },
    {
      title: "ফাইনান্সিয়াল রিপোর্ট",
      icon: DollarSign,
      color: "from-green-600 to-emerald-600",
      path: "/admin/finance",
    },
    {
      title: "সিস্টেম সেটিংস",
      icon: Settings,
      color: "from-amber-600 to-orange-600",
      path: "/admin/settings",
    },
  ];

  const systemMetrics = [
    { label: "সিস্টেম আপটাইম", value: "99.8%", icon: Activity, trend: "up" },
    { label: "সার্ভার লোড", value: "42%", icon: BarChart3, trend: "stable" },
    { label: "ডাটাবেজ সাইজ", value: "2.4 GB", icon: Database, trend: "up" },
    { label: "সক্রিয় সেশন", value: "1,245", icon: Users, trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 rounded-2xl">
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
                  {user?.name || "এডমিন"}!
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  className="pl-12 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent w-64"
                />
              </div>
              <button className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <div className="px-4 py-2 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold">
                এডমিন একাউন্ট
              </div>
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
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <stat.icon
                      className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    />
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
                <p className="text-gray-300 text-sm">{stat.label}</p>
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} w-3/4`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#3BD480]" />
                  সিস্টেম এনালাইটিক্স
                </h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    ফিল্টার
                  </button>
                  <button className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    রিপোর্ট
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon
                        className={`w-4 h-4 ${
                          metric.trend === "up"
                            ? "text-green-500"
                            : metric.trend === "down"
                              ? "text-red-500"
                              : "text-yellow-500"
                        }`}
                      />
                      <div
                        className={`flex items-center gap-1 ${metric.trend === "up" ? "text-green-500" : "text-yellow-500"}`}
                      >
                        {metric.trend === "up"
                          ? "↑"
                          : metric.trend === "down"
                            ? "↓"
                            : "→"}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">
                      {metric.value}
                    </p>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick Reports */}
              <div className="space-y-3">
                {[
                  { label: "ব্যবহারকারী কার্যকলাপ", progress: 75 },
                  { label: "কোর্স এনরোলমেন্ট", progress: 60 },
                  { label: "আয়ের প্রবণতা", progress: 85 },
                  { label: "পারফরম্যান্স মেট্রিক্স", progress: 45 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all duration-300"
                  >
                    <span className="text-gray-300">{item.label}</span>
                    <button className="px-4 py-1.5 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300">
                      রিপোর্ট দেখুন
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-[#3BD480]" />
                সাম্প্রতিক কার্যকলাপ
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.status === "success"
                            ? "bg-green-500/20"
                            : activity.status === "complete"
                              ? "bg-blue-500/20"
                              : activity.status === "payment"
                                ? "bg-amber-500/20"
                                : "bg-purple-500/20"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 ${
                            activity.status === "success"
                              ? "text-green-500"
                              : activity.status === "complete"
                                ? "text-blue-500"
                                : activity.status === "payment"
                                  ? "text-amber-500"
                                  : "text-purple-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {activity.user}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {activity.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Administrative Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#3BD480]" />
                প্রশাসনিক টুলস
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 bg-gradient-to-br ${action.color} text-white rounded-xl hover:shadow-lg hover:shadow-${action.color.split(" ")[1]}/30 transition-all duration-300 flex flex-col items-center justify-center gap-2`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-medium text-center">
                      {action.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-[#3BD480]" />
                সিস্টেম স্ট্যাটাস
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "ডাটাবেজ সংযোগ",
                    status: "সক্রিয়",
                    color: "bg-green-500",
                  },
                  {
                    label: "API সার্ভিস",
                    status: "সক্রিয়",
                    color: "bg-green-500",
                  },
                  {
                    label: "স্টোরেজ",
                    status: "৭৮% ব্যবহৃত",
                    color: "bg-amber-500",
                  },
                  {
                    label: "ব্যাকআপ",
                    status: "২৪ ঘন্টা আগে",
                    color: "bg-blue-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-gray-300">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 ${item.color} rounded-full`}
                      ></div>
                      <span className="text-white text-sm">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-[#3BD480]" />
                পারফরম্যান্স সারাংশ
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">আজকের ভিজিটর</span>
                  <span className="text-white font-semibold">১,২৪৫</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">নতুন নিবন্ধন</span>
                  <span className="text-white font-semibold">৮৯</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">কোর্স বিক্রয়</span>
                  <span className="text-white font-semibold">৪২</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">সর্বোচ্চ রেটিং</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-3 h-3 bg-amber-500 rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                নিয়মিত ব্যাকআপ চালু আছে
              </h3>
              <p className="text-gray-400 text-sm">
                সর্বশেষ ব্যাকআপ: আজ সকাল ০৩:০০ টায় | পরবর্তী ব্যাকআপ: আগামীকাল
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                ম্যানুয়াল ব্যাকআপ
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300">
                সিস্টেম চেকআপ
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Database icon component
const Database = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </svg>
);

export default AdminDashboard;
