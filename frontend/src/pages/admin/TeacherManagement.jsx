import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  UpdateUserRole,
  UpdateUserStatus,
} from "../../store/features/auth/authSlice";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Activity,
  Calendar,
  Users,
} from "lucide-react";
import { useState } from "react";
import StatusModal from "../../components/StatusModal";
import { toast } from "react-toastify";

const TeacherManagement = () => {
  const { users, loading } = useSelector((state) => state.auth);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "block":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "teacher":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "student":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  const handleRoleUpdate = async (id) => {
    const res = await dispatch(UpdateUserRole(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(
        `${res.payload.username} is assaine as   ${res.payload.role}`,
      );
      await dispatch(getAllUser());
    }
  };

  const handleUpdate = async (status, id) => {
    const res = await dispatch(UpdateUserStatus({ status, id }));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(`${res.payload.username} is ${status} Successfully`);
      setSelectedUserId(null);
      await dispatch(getAllUser());
    }
  };

  const handelDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
      await dispatch(getAllUser());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Teacher & User Management
              </h1>
              <p className="text-gray-500 mt-1">
                Manage all users, their roles and permissions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                <Users size={18} className="text-blue-600" />
                <span className="text-blue-700 font-medium">
                  Total: {users.length}
                </span>
              </div>

              <Link
                to="add"
                className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <UserPlus
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
                Add New User
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-purple-600" />
                <span className="text-xs text-purple-600 font-medium">
                  Admins
                </span>
              </div>
              <span className="text-xl font-bold text-purple-700">
                {users &&
                  users.length > 0 &&
                  users?.filter((u) => u.role === "admin").length}
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">
                  Teachers
                </span>
              </div>
              <span className="text-xl font-bold text-blue-700">
                {users &&
                  users.length > 0 &&
                  users.filter((u) => u.role === "teacher").length}
              </span>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  Active
                </span>
              </div>
              <span className="text-xl font-bold text-green-700">
                {users &&
                  users.length > 0 &&
                  users.filter((u) => u.status === "active").length}
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-600" />
                <span className="text-xs text-amber-600 font-medium">
                  New (7d)
                </span>
              </div>
              <span className="text-xl font-bold text-amber-700">
                {users &&
                  users.length > 0 &&
                  users.filter(
                    (u) =>
                      new Date(u.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  ).length}
              </span>
            </div>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ">
          <div className="">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200"
                    >
                      <td className="px-6 py-4 font-mono text-sm font-medium text-gray-800">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {user.userId}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            <img
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold"
                              src={
                                user?.photo
                                  ? user.photo
                                  : "data:image/jpeg;base64,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"
                              }
                              alt="U"
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            {user.username}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.phone || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                              user.role,
                            )}`}
                          >
                            {user.role}
                          </span>
                          <button
                            onClick={() => handleRoleUpdate(user._id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            title="Toggle Role"
                          >
                            <Edit size={14} className="text-gray-500" />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 relative">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              user.status,
                            )}`}
                          >
                            <span className="flex items-center gap-1">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  user.status === "active"
                                    ? "bg-emerald-600 animate-pulse"
                                    : user.status === "block"
                                      ? "bg-rose-600"
                                      : "bg-amber-600"
                                }`}
                              ></span>
                              {user.status}
                            </span>
                          </span>
                          <button
                            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            onClick={() => setSelectedUserId(user._id)}
                          >
                            <Edit size={14} className="text-gray-500" />
                          </button>
                        </div>
                        {selectedUserId === user._id && (
                          <div className="absolute top-full left-0 mt-1 z-50">
                            <StatusModal
                              onClose={() => setSelectedUserId(null)}
                              presentStatus={user.status}
                              handleUpdate={handleUpdate}
                              id={user._id}
                            />
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handelDelete(user._id)}
                          className="p-2 hover:bg-rose-50 rounded-lg transition-colors group cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2
                            size={16}
                            className="text-rose-400 group-hover:text-rose-600 transition-colors"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Users size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No users found
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          Get started by adding a new user
                        </p>
                        <Link
                          to="add"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          <UserPlus size={16} />
                          Add User
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {users.length > 0 && (
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Showing <span className="font-semibold">{users.length}</span>{" "}
                  users
                </span>
                <span className="text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;
