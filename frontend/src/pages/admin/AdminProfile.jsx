import { useDispatch } from "react-redux";
import {
  logoutUser,
  UpdateUserPassword,
} from "../../store/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  LogOut,
  Edit,
  Award,
  Calendar,
  Clock,
} from "lucide-react";
import { useState } from "react";
import ChangePassword from "../../components/ChangePassword";

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/login`);
    }
  };

  const handelUpdatePassword = async (formData) => {
    const res = await dispatch(UpdateUserPassword(formData));
    if (res.meta.requestStatus === "fulfilled") {
      setShowModal(false);
      toast.success("🍿 Password Update Successfully");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-light text-gray-900 mb-2">
            No user found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please log in to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-4xl mx-auto relative">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm ">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    className="w-full h-full rounded-lg bg-gray-100  "
                    src={user?.photo}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className=" absolute px-6 py-2 text-white top-0 right-0 cursor-pointer"
            >
              Update Password
            </button>
          </div>

          {/* Profile Info */}
          <div className="pt-16 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-light text-gray-900 capitalize">
                  {user.username}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail size={14} />
                    {user.email}
                  </div>
                  {user.status && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-xs text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      {user.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit size={16} />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Account Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Key size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">User ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.userId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Mongo ID</p>
                      <p className="text-sm font-medium text-gray-900 break-all">
                        {user._id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Role</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Personal Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {user.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Member Since</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Stats (Optional) */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                Activity Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-xs text-gray-500">Papers Created</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-xs text-gray-500">Tests Taken</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-xs text-gray-500">Last Active</div>
                </div>
              </div>
            </div>
            {/* Importent Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                Importent Links
              </h3>
              <div className=" grid lg:hidden grid-cols-1 md:grid-cols-4 gap-4">
                <Link
                  to="/admin"
                  className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/admission"
                  className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                >
                  Admission
                </Link>
                <Link
                  to="/admin/student"
                  className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                >
                  Students
                </Link>
                <Link
                  to="/admin/teacher"
                  className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                >
                  Teachers
                </Link>
                <Link
                  to="/admin/gallery"
                  className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                >
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/50">
          <ChangePassword
            handelUpdatePassword={handelUpdatePassword}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
