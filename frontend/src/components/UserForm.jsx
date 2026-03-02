import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Mail, Phone, Lock, User } from "lucide-react";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(createUser(formData));
      if (res.meta.requestStatus === "fulfilled") {
        setFormData({
          userId: "",
          username: "",
          email: "",
          password: "",
          phone: "",
        });
        navigate(`/admin/teacher`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md relative overflow-hidden">
        {/* Header with gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(`/admin/teacher`)}
          className="absolute top-4 left-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="p-8 pt-16">
          {/* Icon and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">
              Create New User
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new teacher or staff member
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* User ID (Auto-generated?) */}
            <div className="pt-2">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">User ID</p>
                <p className="text-sm font-mono text-gray-700">
                  {formData.userId || "Will be auto-generated"}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium mt-6 shadow-sm hover:shadow-md"
            >
              Create User
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-xs text-center text-gray-400 mt-6">
            All fields are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
