import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  X,
  Upload,
  User,
  Mail,
  Phone,
  Fingerprint,
  UserCircle,
  FileText,
  Save,
  XCircle,
} from "lucide-react";
import uploadImageToCloudinary from "../utils/cloudinery";
const ShareholderAddModal = ({ setShowModal, handleAddShare }) => {
  // প্রপসের নাম ঠিক করলাম
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    father: "",
    email: "",
    mobile: "",
    nid: "",
    imageFile: null,
    imageUrl: "",
    publicUrl: "",
    about: "",
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "নাম আবশ্যক";
    }

    if (!formData.father?.trim()) {
      newErrors.father = "পিতার নাম আবশ্যক";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "ইমেইল আবশ্যক";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }

    if (!formData.mobile?.trim()) {
      newErrors.mobile = "মোবাইল নম্বর আবশ্যক";
    } else if (!/^01[3-9]\d{8}$/.test(formData.mobile)) {
      newErrors.mobile = "সঠিক মোবাইল নম্বর দিন (০১৩XXXXXXXX)";
    }

    if (!formData.nid?.trim()) {
      newErrors.nid = "এনআইডি আবশ্যক";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (files) {
      const file = files[0];

      // Validate file type and size
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("শুধুমাত্র ছবি আপলোড করুন");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          toast.error("ছবির সাইজ ২এমবির কম হতে হবে");
          return;
        }

        setFormData((prev) => ({
          ...prev,
          imageFile: file,
        }));

        // Clean up previous preview URL
        if (preview) {
          URL.revokeObjectURL(preview);
        }

        const newPreview = URL.createObjectURL(file);
        setPreview(newPreview);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("সঠিকভাবে ফর্ম পূরণ করুন");
      return;
    }

    setLoading(true);

    try {
      let imageData = null;

      if (formData.imageFile) {
        imageData = await uploadImageToCloudinary(formData.imageFile);
      }

      const data = {
        name: formData.name,
        father: formData.father,
        email: formData.email,
        mobile: formData.mobile,
        nid: formData.nid,
        about: formData.about || "",
        imageUrl: imageData?.url || "",
        publicUrl: imageData?.public_id || "",
      };

      await handleAddShare(data); // প্রপসের নাম ঠিক করলাম

      // Clean up preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      toast.success("শেয়ার হোল্ডার সফলভাবে যোগ করা হয়েছে");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err?.message || "কিছু সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Clean up preview URL before closing
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#134C45] to-[#3BD480] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCircle className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white font-kalpurush">
              নতুন শেয়ার হোল্ডার যোগ করুন
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <User className="w-4 h-4 text-[#134C45]" />
                নাম <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="শেয়ার হোল্ডারের নাম"
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all font-kalpurush`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-kalpurush">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Father's Name Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <User className="w-4 h-4 text-[#134C45]" />
                পিতার নাম <span className="text-red-500">*</span>
              </label>
              <input
                name="father"
                value={formData.father}
                onChange={handleChange}
                placeholder="পিতার নাম"
                className={`w-full border ${errors.father ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all font-kalpurush`}
              />
              {errors.father && (
                <p className="text-red-500 text-xs font-kalpurush">
                  {errors.father}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <Mail className="w-4 h-4 text-[#134C45]" />
                ইমেইল <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-kalpurush">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <Phone className="w-4 h-4 text-[#134C45]" />
                মোবাইল <span className="text-red-500">*</span>
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="০১৩XXXXXXXX"
                className={`w-full border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs font-kalpurush">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* NID Field */}
            <div className="space-y-1 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <Fingerprint className="w-4 h-4 text-[#134C45]" />
                এনআইডি <span className="text-red-500">*</span>
              </label>
              <input
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                placeholder="এনআইডি নম্বর"
                className={`w-full border ${errors.nid ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all`}
              />
              {errors.nid && (
                <p className="text-red-500 text-xs font-kalpurush">
                  {errors.nid}
                </p>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="space-y-1 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <Upload className="w-4 h-4 text-[#134C45]" />
                ছবি আপলোড
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border-2 border-dashed border-gray-300 hover:border-[#3BD480]">
                    <Upload className="w-5 h-5 text-[#134C45]" />
                    <span className="text-gray-600 font-kalpurush">
                      ছবি নির্বাচন করুন
                    </span>
                  </div>
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-[#3BD480] shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(preview);
                        setPreview(null);
                        setFormData((prev) => ({ ...prev, imageFile: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 font-kalpurush mt-1">
                সমর্থিত ফরম্যাট: JPG, PNG, GIF (সর্বোচ্চ ২এমবি)
              </p>
            </div>

            {/* About Field */}
            <div className="space-y-1 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-kalpurush">
                <FileText className="w-4 h-4 text-[#134C45]" />
                সম্পর্কে
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="শেয়ার হোল্ডার সম্পর্কে সংক্ষিপ্ত তথ্য দিন"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all font-kalpurush resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-kalpurush cursor-pointer flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              বাতিল
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-[#134C45] to-[#3BD480] text-white rounded-lg hover:opacity-90 transition-opacity font-kalpurush cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>সংরক্ষণ করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>সংরক্ষণ করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareholderAddModal;
