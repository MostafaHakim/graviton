// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteUser,
//   getAllUser,
//   UpdateUserRole,
//   UpdateUserStatus,
// } from "../../store/features/auth/authSlice";
// import { Link } from "react-router-dom";
// import { Edit, Edit2, Trash2 } from "lucide-react";
// import { useState } from "react";
// import StatusModal from "../../components/StatusModal";

// const TeacherManagement = () => {
//   const { users, loading } = useSelector((state) => state.auth);

//   const [selectedUserId, setSelectedUserId] = useState(null);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllUser());
//   }, [dispatch]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-700";
//       case "block":
//         return "bg-red-100 text-red-700";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const getRoleColor = (role) => {
//     return role === "admin"
//       ? "bg-purple-100 text-purple-700"
//       : "bg-blue-100 text-blue-700";
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   const handleRoleUpdate = async (id) => {
//     await dispatch(UpdateUserRole(id));
//     await dispatch(getAllUser());
//   };

//   const handleUpdate = async (status, id) => {
//     await dispatch(UpdateUserStatus({ status, id }));
//     setSelectedUserId(null);
//     await dispatch(getAllUser());
//   };

//   const handelDelete = async (id) => {
//     await dispatch(deleteUser(id));
//     await dispatch(getAllUser());
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//         <div className="p-4 border-b flex flex-row items-center justify-between">
//           <h2 className="text-xl font-bold text-gray-700">User List</h2>
//           <Link
//             to="add"
//             className="transition-all duration-500 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
//           >
//             Add User
//           </Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">User ID</th>
//                 <th className="px-6 py-3">Name</th>
//                 <th className="px-6 py-3">Email</th>
//                 <th className="px-6 py-3">Phone</th>
//                 <th className="px-6 py-3">Role</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Created</th>
//                 <th className="px-6 py-3">Delete</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {users &&
//                 users.length > 0 &&
//                 users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="hover:bg-gray-50 transition z-10"
//                   >
//                     <td className="px-6 py-4 font-medium text-gray-800">
//                       {user.userId}
//                     </td>

//                     <td className="px-6 py-4">{user.username}</td>

//                     <td className="px-6 py-4">{user.email}</td>

//                     <td className="px-6 py-4">{user.phone}</td>

//                     <td className="px-6 py-4 ">
//                       <div className="flex flex-row items-center space-x-2">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
//                             user.role,
//                           )}`}
//                         >
//                           {user.role}
//                         </span>
//                         <button
//                           onClick={() => {
//                             handleRoleUpdate(user._id);
//                           }}
//                           className="cursor-pointer"
//                         >
//                           <Edit size={12} />
//                         </button>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 relative">
//                       <div className="flex flex-row items-center space-x-2">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                             user.status,
//                           )}`}
//                         >
//                           {user.status}
//                         </span>
//                         <button
//                           className="cursor-pointer"
//                           onClick={() => {
//                             setSelectedUserId(user._id);
//                           }}
//                         >
//                           <Edit size={12} />
//                         </button>
//                       </div>
//                       {selectedUserId === user._id && (
//                         <div className="absolute top-0">
//                           <StatusModal
//                             onClose={() => setSelectedUserId(null)}
//                             presentStatus={user.status}
//                             handleUpdate={handleUpdate}
//                             id={user._id}
//                           />
//                         </div>
//                       )}
//                     </td>

//                     <td className="px-6 py-4 text-gray-500">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-gray-500">
//                       <button
//                         onClick={() => handelDelete(user._id)}
//                         className="cursor-pointer"
//                       >
//                         <Trash2 className="text-red-500" size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         {users.length === 0 && (
//           <div className="text-center py-6 text-gray-500">No users found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherManagement;

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
    await dispatch(UpdateUserRole(id));
    await dispatch(getAllUser());
  };

  const handleUpdate = async (status, id) => {
    await dispatch(UpdateUserStatus({ status, id }));
    setSelectedUserId(null);
    await dispatch(getAllUser());
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
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
                            {user.username?.charAt(0).toUpperCase()}
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
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
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
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
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
                          className="p-2 hover:bg-rose-50 rounded-lg transition-colors group"
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
