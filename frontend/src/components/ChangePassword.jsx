import { useState } from "react";
import { Eye, EyeOff, Lock, Key, CheckCircle, XCircle, X } from "lucide-react";

const ChangePassword = ({ handelUpdatePassword, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check password strength when new password changes
    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
    });
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setMessage({ type: "error", text: "সব ফিল্ড পূরণ করুন" });
      return false;
    }

    // Check if new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি",
      });
      return false;
    }

    // Check if new password is same as current password
    if (formData.currentPassword === formData.newPassword) {
      setMessage({
        type: "error",
        text: "নতুন পাসওয়ার্ড পুরাতন পাসওয়ার্ডের মতো হতে পারবে না",
      });
      return false;
    }

    // Check password strength
    const strengthChecks =
      Object.values(passwordStrength).filter(Boolean).length;
    if (strengthChecks < 3) {
      setMessage({ type: "error", text: "পাসওয়ার্ডটি যথেষ্ট শক্তিশালী নয়" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await handelUpdatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setMessage({
        type: "success",
        text: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে",
      });

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Reset password strength
      setPasswordStrength({
        length: false,
        number: false,
        special: false,
        uppercase: false,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength percentage
  const getPasswordStrengthPercentage = () => {
    const checks = Object.values(passwordStrength).filter(Boolean).length;
    return (checks / 4) * 100;
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    const percentage = getPasswordStrengthPercentage();
    if (percentage <= 25)
      return { color: "bg-red-500", text: "দুর্বল", textColor: "text-red-500" };
    if (percentage <= 50)
      return {
        color: "bg-orange-500",
        text: "মাঝারি",
        textColor: "text-orange-500",
      };
    if (percentage <= 75)
      return {
        color: "bg-yellow-500",
        text: "ভাল",
        textColor: "text-yellow-500",
      };
    return {
      color: "bg-green-500",
      text: "শক্তিশালী",
      textColor: "text-green-500",
    };
  };

  const strengthInfo = getPasswordStrengthInfo();

  return (
    <div className=" bg-gradient-to-br from-[#f8fafc] to-white p-4 rounded-2xl relative">
      <button
        onClick={() => onClose()}
        className="absolute top-0 right-0 p-4 text-[#134C45] cursor-pointer"
      >
        <X />{" "}
      </button>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-r from-[#134C45] to-[#3BD480] rounded-2xl shadow-lg mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#134C45] font-kalpurush mb-2">
            পাসওয়ার্ড পরিবর্তন করুন
          </h2>
          <p className="text-gray-600 font-kalpurush">
            আপনার অ্যাকাউন্টের নিরাপত্তার জন্য পাসওয়ার্ড পরিবর্তন করুন
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 font-kalpurush">
                  <Key className="w-4 h-4 text-[#134C45]" />
                  বর্তমান পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                    placeholder="আপনার বর্তমান পাসওয়ার্ড দিন"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#134C45] transition-colors"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 font-kalpurush">
                  <Lock className="w-4 h-4 text-[#134C45]" />
                  নতুন পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                    placeholder="নতুন পাসওয়ার্ড দিন"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#134C45] transition-colors"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-kalpurush">
                        পাসওয়ার্ড শক্তি:
                      </span>
                      <span
                        className={`text-sm font-semibold ${strengthInfo.textColor} font-kalpurush`}
                      >
                        {strengthInfo.text}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthInfo.color} transition-all duration-300`}
                        style={{ width: `${getPasswordStrengthPercentage()}%` }}
                      ></div>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        {passwordStrength.length ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span
                          className={
                            passwordStrength.length
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          কমপক্ষে ৮ অক্ষর
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {passwordStrength.number ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span
                          className={
                            passwordStrength.number
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          একটি সংখ্যা
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {passwordStrength.special ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span
                          className={
                            passwordStrength.special
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          বিশেষ ক্যারেক্টার
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {passwordStrength.uppercase ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span
                          className={
                            passwordStrength.uppercase
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          বড় হাতের অক্ষর
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 font-kalpurush">
                  <Lock className="w-4 h-4 text-[#134C45]" />
                  কনফার্ম পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all"
                    placeholder="আবার নতুন পাসওয়ার্ড দিন"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#134C45] transition-colors"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    {formData.newPassword === formData.confirmPassword ? (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        পাসওয়ার্ড মিলেছে
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        পাসওয়ার্ড মেলেনি
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Message */}
              {message.text && (
                <div
                  className={`p-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <p className="text-sm font-kalpurush text-center">
                    {message.text}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#134C45] to-[#3BD480] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-kalpurush">আপডেট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span className="font-kalpurush">
                      পাসওয়ার্ড আপডেট করুন
                    </span>
                  </>
                )}
              </button>

              {/* Password Tips */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-[#134C45] mb-2 font-kalpurush flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  পাসওয়ার্ড টিপস:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 font-kalpurush list-disc list-inside">
                  <li>প্রতি ৩ মাস অন্তর পাসওয়ার্ড পরিবর্তন করুন</li>
                  <li>সহজ অনুমেয় পাসওয়ার্ড ব্যবহার করবেন না</li>
                  <li>পাসওয়ার্ড কারো সাথে শেয়ার করবেন না</li>
                  <li>
                    প্রতিটি অ্যাকাউন্টের জন্য আলাদা পাসওয়ার্ড ব্যবহার করুন
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
