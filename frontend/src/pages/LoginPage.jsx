import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../store/features/auth/authSlice";
import { User, Lock, LogIn, ArrowRight, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const data = {
      ...formData,
      username: formData.username.toLowerCase(),
    };

    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      setFormData({ username: "", password: "" });
      navigate(`/${result.payload.user.role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(59, 212, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 212, 128, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#17202F]/80 via-[#134C45]/60 to-[#3BD480]/40"></div>
      </div>
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-login"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid-login)" />
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-white font-kalpurush font-bold mb-2">
            গ্র্যাভিটন একাডেমি
            <span className="block text-[#3BD480]">লগইন পোর্টাল</span>
          </h1>

          <p className="text-white/80 font-kalpurush">
            আপনার অ্যাকাউন্টে প্রবেশ করুন এবং বিশেষ সুবিধা পান
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                <User className="w-4 h-4 inline mr-2" />
                ব্যবহারকারী নাম
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition text-white placeholder-white/50"
                placeholder="আপনার ব্যবহারকারী নাম লিখুন"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                <Lock className="w-4 h-4 inline mr-2" />
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition text-white placeholder-white/50"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-kalpurush">{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 font-kalpurush ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#3BD480] to-[#134C45] hover:opacity-90 hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  লগইন করা হচ্ছে...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  লগইন করুন
                </span>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm font-kalpurush">
              কোনো সমস্যা হলে সাপোর্টে যোগাযোগ করুন
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="mt-2 text-[#3BD480] hover:text-[#2da866] text-sm font-medium flex items-center justify-center gap-1 mx-auto font-kalpurush"
            >
              সাপোর্টে যান
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs font-kalpurush">
            © ২০২৪ গ্র্যাভিটন একাডেমি। সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
