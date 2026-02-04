import React, { useState } from "react";
import uploadPhotoToCloudinary from "../utils/cloudinery";
import {
  Upload,
  Image,
  Video,
  Tag,
  BookOpen,
  Calendar,
  Award,
  Users,
  MapPin,
  Camera,
  Sparkles,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GalleryUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "events",
    type: "image",
    tags: "",
    date: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create preview URL
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("দয়া করে একটি ছবি বা ভিডিও নির্বাচন করুন");

    try {
      setLoading(true);

      const uploadData = await uploadPhotoToCloudinary(file);

      const payload = {
        ...formData,
        image: uploadData.secure_url,
        public_id: uploadData.public_id,
        tags: formData.tags.split(",").map((t) => t.trim()),
        likes: Math.floor(Math.random() * 300) + 50,
        comments: Math.floor(Math.random() * 50) + 5,
      };

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            message: "গ্যালারি আইটেম সফলভাবে যুক্ত হয়েছে!",
            type: "success",
          },
        }),
      );

      setFormData({
        title: "",
        description: "",
        category: "events",
        type: "image",
        tags: "",
        date: "",
      });
      setFile(null);
      setPreview(null);

      navigate(-1);
    } catch (err) {
      console.log(err);
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: { message: "আপলোড ব্যর্থ হয়েছে!", type: "error" },
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons = {
    events: Calendar,
    classes: BookOpen,
    achievements: Award,
    students: Users,
    campus: MapPin,
  };

  const categoryColors = {
    events: "from-blue-500 to-cyan-500",
    classes: "from-emerald-500 to-green-500",
    achievements: "from-amber-500 to-orange-500",
    students: "from-purple-500 to-pink-500",
    campus: "from-red-500 to-rose-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-gallery-upload"
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
          <rect
            width="100%"
            height="100%"
            fill="url(#mesh-grid-gallery-upload)"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            গ্যালারি আপলোড
            <span className="block text-[#3BD480]">স্মৃতি সংরক্ষণ করুন</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            আপনার মূল্যবান মুহূর্তগুলো আমাদের গ্যালারির সাথে শেয়ার করুন। ছবি বা
            ভিডিও আপলোড করে আমাদের ডিজিটাল সংগ্রহশালা সমৃদ্ধ করুন।
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-[#3BD480] via-[#134C45] to-[#17202F]">
            <div className="bg-[#17202F] p-6 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Two Column Grid for Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-white/80 font-kalpurush text-sm">
                      শিরোনাম
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="ইভেন্টের শিরোনাম লিখুন..."
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3BD480] transition-colors font-kalpurush"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="block text-white/80 font-kalpurush text-sm">
                      তারিখ
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#3BD480] transition-colors font-kalpurush"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-white/80 font-kalpurush text-sm">
                    বর্ণনা
                  </label>
                  <textarea
                    name="description"
                    placeholder="ইভেন্ট বা ছবির বিস্তারিত বর্ণনা লিখুন..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3BD480] transition-colors resize-none font-kalpurush"
                  />
                </div>

                {/* Category and Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-white/80 font-kalpurush text-sm">
                      ক্যাটাগরি
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(categoryIcons).map(([key, Icon]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, category: key })
                          }
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            formData.category === key
                              ? `bg-gradient-to-br ${categoryColors[key]} border-transparent text-white`
                              : "bg-white/5 border-white/20 text-white/70 hover:border-white/30"
                          }`}
                        >
                          <Icon className="w-5 h-5 mb-1" />
                          <span className="text-xs font-kalpurush">
                            {key === "events" && "ইভেন্টস"}
                            {key === "classes" && "ক্লাস"}
                            {key === "achievements" && "সাফল্য"}
                            {key === "students" && "শিক্ষার্থী"}
                            {key === "campus" && "ক্যাম্পাস"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Media Type */}
                  <div className="space-y-2">
                    <label className="block text-white/80 font-kalpurush text-sm">
                      মিডিয়া টাইপ
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: "image" })
                        }
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          formData.type === "image"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white"
                            : "bg-white/5 border-white/20 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <Image className="w-5 h-5" />
                        <span className="font-kalpurush">ছবি</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: "video" })
                        }
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          formData.type === "video"
                            ? "bg-gradient-to-r from-red-500 to-pink-500 border-transparent text-white"
                            : "bg-white/5 border-white/20 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <Video className="w-5 h-5" />
                        <span className="font-kalpurush">ভিডিও</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="block text-white/80 font-kalpurush text-sm">
                    ট্যাগ (কমা দ্বারা আলাদা করুন)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="tags"
                      placeholder="উদাহরণ: সাংস্কৃতি, নাচ, গান, প্রদর্শনী"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3BD480] transition-colors font-kalpurush"
                    />
                  </div>
                </div>

                {/* File Upload with Preview */}
                <div className="space-y-2">
                  <label className="block text-white/80 font-kalpurush text-sm">
                    ফাইল নির্বাচন করুন
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 hover:border-[#3BD480] transition-colors">
                    {preview ? (
                      <div className="space-y-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreview(null);
                              setFile(null);
                              document.getElementById("fileInput").value = "";
                            }}
                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-center text-white/70 text-sm font-kalpurush">
                          {file?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-white/80 mb-2 font-kalpurush">
                          ছবি বা ভিডিও ড্রপ করুন অথবা ব্রাউজ করুন
                        </p>
                        <p className="text-white/40 text-sm mb-4 font-kalpurush">
                          JPG, PNG, MP4 (সর্বোচ্চ 10MB)
                        </p>
                        <label className="inline-block px-6 py-2 bg-white/10 border border-white/20 text-white rounded-xl cursor-pointer hover:bg-white/20 transition-colors font-kalpurush">
                          <Camera className="w-4 h-4 inline mr-2" />
                          ফাইল নির্বাচন
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-kalpurush text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      আপলোড হচ্ছে...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      গ্যালারিতে সংরক্ষণ করুন
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Info Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Image className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-kalpurush font-medium">
                ছবির নির্দেশিকা
              </h3>
            </div>
            <p className="text-white/70 text-sm font-kalpurush">
              উচ্চ রেজুলেশনের ছবি (1920×1080) ব্যবহার করুন। JPG বা PNG ফরম্যাট
              উপযুক্ত।
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Video className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-kalpurush font-medium">
                ভিডিও নির্দেশিকা
              </h3>
            </div>
            <p className="text-white/70 text-sm font-kalpurush">
              MP4 ফরম্যাটে সর্বোচ্চ 10MB সাইজের ভিডিও। 1080p রেজুলেশন
              সুপারিশকৃত।
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Tag className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-kalpurush font-medium">
                ট্যাগ নির্দেশিকা
              </h3>
            </div>
            <p className="text-white/70 text-sm font-kalpurush">
              প্রাসঙ্গিক ট্যাগ যোগ করুন। কমা দ্বারা আলাদা করুন। সর্বোচ্চ ৫টি
              ট্যাগ।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;
