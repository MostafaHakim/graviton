import React from "react";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Student Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Welcome, {user?.name}!</p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-teacher/10 text-teacher rounded-full font-medium">
              Student Account
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                My Classes
              </h3>
              <p className="text-4xl font-bold text-gray-800 mb-2">12</p>
              <p className="text-gray-600">Active classes this semester</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Students
              </h3>
              <p className="text-4xl font-bold text-gray-800 mb-2">245</p>
              <p className="text-gray-600">Total students enrolled</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pending Grades
              </h3>
              <p className="text-4xl font-bold text-gray-800 mb-2">47</p>
              <p className="text-gray-600">Assignments to grade</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-teacher text-white rounded-xl hover:bg-teacher/90 transition font-medium">
                Create Assignment
              </button>
              <button className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                Schedule Class
              </button>
              <button className="p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium">
                Upload Materials
              </button>
              <button className="p-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition font-medium">
                Grade Submissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
