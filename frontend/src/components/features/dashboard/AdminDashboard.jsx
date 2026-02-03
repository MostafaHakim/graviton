import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      label: "Total Students",
      value: "2,845",
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      label: "Total Teachers",
      value: "156",
      change: "+5%",
      color: "bg-green-500",
    },
    {
      label: "Active Courses",
      value: "89",
      change: "+8%",
      color: "bg-purple-500",
    },
    { label: "Revenue", value: "$245K", change: "+23%", color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 p-6">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Welcome, {user?.name}!</p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-management/10 text-management rounded-full font-medium">
              Admin Account
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                System Analytics
              </h2>
              <div className="space-y-4">
                {[
                  "User Activity",
                  "Course Enrollment",
                  "Revenue Trends",
                  "Performance Metrics",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-white/50 rounded-lg transition"
                  >
                    <span className="text-gray-700">{item}</span>
                    <button className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                      View Report
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Administrative Tools
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-management text-white rounded-xl hover:bg-management/90 transition font-medium">
                  User Management
                </button>
                <button className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                  Course Management
                </button>
                <button className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium">
                  Financial Reports
                </button>
                <button className="p-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition font-medium">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
