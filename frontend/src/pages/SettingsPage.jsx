import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSetting,
  updateSetting,
} from "../store/features/auth/settingsSlice";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
  Save,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const SettingsPage = () => {
  const { settings, isLoading, error } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const [saveStatus, setSaveStatus] = useState({
    show: false,
    type: "",
    message: "",
  });

  // settings fetch
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  // redux data → form state
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaveStatus({ show: false, type: "", message: "" });

    const res = await dispatch(updateSetting(formData));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getSetting());
      setSaveStatus({
        show: true,
        type: "success",
        message: "Settings updated successfully! ✅",
      });

      // Auto hide after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, type: "", message: "" });
      }, 3000);
    } else {
      setSaveStatus({
        show: true,
        type: "error",
        message: "Failed to update settings. Please try again.",
      });
    }
  };

  const socialLinks = [
    {
      name: "facebook",
      icon: Facebook,
      color: "hover:text-blue-600",
      placeholder: "Facebook Profile URL",
    },
    {
      name: "youtube",
      icon: Youtube,
      color: "hover:text-red-600",
      placeholder: "YouTube Channel URL",
    },
    {
      name: "instagram",
      icon: Instagram,
      color: "hover:text-pink-600",
      placeholder: "Instagram Profile URL",
    },
  ];

  const basicInfo = [
    {
      name: "name",
      icon: Building2,
      type: "text",
      placeholder: "Website/Business Name",
    },
    { name: "email", icon: Mail, type: "email", placeholder: "Email Address" },
    { name: "mobile", icon: Phone, type: "tel", placeholder: "Mobile Number" },
    {
      name: "address",
      icon: MapPin,
      type: "text",
      placeholder: "Full Address",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Website Settings
          </h1>
          <p className="text-gray-600">
            Manage your website information and social media links
          </p>
        </div>

        {/* Status Alert */}
        {saveStatus.show && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-slideDown ${
              saveStatus.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="flex-1">{saveStatus.message}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !settings && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading settings...</p>
          </div>
        )}

        {/* Main Form */}
        {!isLoading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Basic Information
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {basicInfo.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.name} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          {field.name}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Instagram className="w-5 h-5" />
                  Social Media Links
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <div key={social.name} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                          <Icon
                            className={`w-4 h-4 transition-colors ${social.color}`}
                          />
                          {social.name}
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            name={social.name}
                            placeholder={social.placeholder}
                            value={formData[social.name] || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 pl-10"
                          />
                          <Icon
                            className={`absolute left-3 top-2.5 w-4 h-4 text-gray-400 transition-colors ${social.color}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 bg-white rounded-xl shadow-lg p-6">
              <button
                type="button"
                onClick={() => setFormData(settings || {})}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Changes will be reflected immediately on your website</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
