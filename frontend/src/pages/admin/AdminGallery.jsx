import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Eye,
  Filter,
  Search,
  Grid,
  List,
  Image as ImageIcon,
  Video,
  Calendar,
  Users,
  Award,
  BookOpen,
  MapPin,
  Download,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  X,
  Heart,
  MessageCircle,
  Share2,
  BookPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    videos: 0,
    lastUpdated: "",
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/gallery`);
      const data = await res.json();
      setGalleryItems(data);

      // Calculate stats
      const imageCount = data.filter((item) => item.type === "image").length;
      const videoCount = data.filter((item) => item.type === "video").length;

      setStats({
        total: data.length,
        images: imageCount,
        videos: videoCount,
        lastUpdated: new Date().toLocaleDateString("bn-BD"),
      });
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const item = galleryItems.find((i) => i._id === id);

      if (!item) return;

      if (item.public_id) {
        await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/gallery/cloudinary/${item.public_id}`,
          { method: "DELETE" },
        );
      }

      await fetch(`${import.meta.env.VITE_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });

      setGalleryItems((prev) => prev.filter((i) => i._id !== id));

      setStats((prev) => {
        const key = item.type === "image" ? "images" : "videos";
        return {
          ...prev,
          total: prev.total - 1,
          [key]: prev[key] - 1,
        };
      });

      showToast("আইটেম সফলভাবে ডিলিট করা হয়েছে!", "success");
    } catch (error) {
      console.error(error);
      showToast("ডিলিট ব্যর্থ হয়েছে!", "error");
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      showToast("দয়া করে আইটেম সিলেক্ট করুন!", "warning");
      return;
    }

    try {
      // Delete all selected items
      for (const id of selectedItems) {
        const item = galleryItems.find((item) => item.id === id);
        if (item?.public_id) {
          await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/gallery/cloudinary/${item.public_id}`,
            {
              method: "DELETE",
            },
          );
        }

        await fetch(`${import.meta.env.VITE_BASE_URL}/api/gallery/${id}`, {
          method: "DELETE",
        });
      }

      // Update local state
      setGalleryItems(
        galleryItems.filter((item) => !selectedItems.includes(item._id)),
      );
      setSelectedItems([]);
      showToast(
        `${selectedItems.length} টি আইটেম সফলভাবে ডিলিট করা হয়েছে!`,
        "success",
      );
    } catch (error) {
      console.error("Error bulk deleting items:", error);
      showToast("বাল্ক ডিলিট ব্যর্থ হয়েছে!", "error");
    }
  };

  const showToast = (message, type = "success") => {
    // Create toast event
    const toastEvent = new CustomEvent("showToast", {
      detail: {
        message,
        type,
      },
    });
    window.dispatchEvent(toastEvent);
  };

  const categories = [
    { id: "all", label: "সব", icon: Grid, color: "text-gray-600" },
    { id: "events", label: "ইভেন্টস", icon: Calendar, color: "text-blue-500" },
    {
      id: "classes",
      label: "ক্লাস",
      icon: BookOpen,
      color: "text-emerald-500",
    },
    {
      id: "achievements",
      label: "সাফল্য",
      icon: Award,
      color: "text-amber-500",
    },
    {
      id: "students",
      label: "শিক্ষার্থী",
      icon: Users,
      color: "text-purple-500",
    },
    { id: "campus", label: "ক্যাম্পাস", icon: MapPin, color: "text-red-500" },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] p-4 md:p-6 rounded-2xl">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-admin"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-admin)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-kalpurush">
              গ্যালারি ম্যানেজমেন্ট
            </h1>
            <p className="text-white/70 font-kalpurush">
              সব গ্যালারি আইটেম দেখুন, ম্যানেজ করুন এবং ডিলিট করুন
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="upload"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#2da866] text-[#17202F] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/30 transition-all duration-300"
            >
              <BookPlus className="w-5 h-5" />
              নতুন আইটেম
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-kalpurush">
                  মোট আইটেম
                </p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Grid className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-kalpurush">ছবি</p>
                <p className="text-2xl font-bold text-white">{stats.images}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/20">
                <ImageIcon className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-kalpurush">ভিডিও</p>
                <p className="text-2xl font-bold text-white">{stats.videos}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Video className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-kalpurush">
                  সর্বশেষ আপডেট
                </p>
                <p className="text-lg font-bold text-white font-kalpurush">
                  {stats.lastUpdated}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/20">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="সার্চ করুন (শিরোনাম, বর্ণনা, ট্যাগ)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#3BD480] font-kalpurush"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3BD480] appearance-none font-kalpurush"
                >
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="bg-[#17202F]"
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3BD480] font-kalpurush"
              >
                <option value="all" className="bg-[#17202F]">
                  সব টাইপ
                </option>
                <option value="image" className="bg-[#17202F]">
                  ছবি
                </option>
                <option value="video" className="bg-[#17202F]">
                  ভিডিও
                </option>
              </select>

              {/* View Mode */}
              <div className="flex bg-white/5 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#3BD480] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-[#3BD480] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-white font-kalpurush">
                    {selectedItems.length} টি আইটেম সিলেক্ট করা হয়েছে
                  </span>
                </div>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-kalpurush"
                >
                  <Trash2 className="w-4 h-4" />
                  সিলেক্টেড আইটেম ডিলিট করুন
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Items */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BD480]"></div>
            <p className="mt-4 text-white/70 font-kalpurush">লোড হচ্ছে...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
            <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 font-kalpurush">
              কোনো আইটেম পাওয়া যায়নি
            </h3>
            <p className="text-white/70 font-kalpurush">
              দুঃখিত, আপনার সার্চের সাথে মিলে এমন কোনো আইটেম নেই
            </p>
          </div>
        ) : (
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}
          >
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-[#3BD480]/50 transition-all duration-300 ${
                  selectedItems.includes(item._id)
                    ? "ring-2 ring-[#3BD480]"
                    : ""
                } ${viewMode === "list" ? "flex" : ""}`}
              >
                {/* Checkbox for selection */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item._id]);
                      } else {
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item._id),
                        );
                      }
                    }}
                    className="w-5 h-5 rounded border-white/30 bg-white/10 checked:bg-[#3BD480] focus:ring-[#3BD480]"
                  />
                </div>

                {/* Thumbnail */}
                <div
                  className={`relative ${viewMode === "list" ? "w-1/3" : "aspect-video"}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === "video"
                          ? "bg-red-500/90 text-white"
                          : "bg-blue-500/90 text-white"
                      }`}
                    >
                      {item.type === "video" ? (
                        <div className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          ভিডিও
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          ছবি
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      {React.createElement(
                        categories.find((c) => c.id === item.category)?.icon ||
                          Grid,
                        { className: "w-3 h-3 text-white" },
                      )}
                      <span className="text-xs text-white font-kalpurush">
                        {categories.find((c) => c.id === item.category)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white font-kalpurush line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          // View action
                          window.open(item.image, "_blank");
                        }}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="দেখুন"
                      >
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(item);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 hover:bg-red-500/10 rounded transition-colors"
                        title="ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3 font-kalpurush line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded font-kalpurush"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 text-white/40 text-xs rounded">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats and Date */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-white/60">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{item.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{item.comments || 0}</span>
                      </div>
                    </div>

                    <div className="text-xs text-white/60 font-kalpurush">
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredItems.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-white/70 font-kalpurush">
              মোট {filteredItems.length} টি আইটেম দেখানো হচ্ছে
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors font-kalpurush">
                পূর্ববর্তী
              </button>
              <button className="px-4 py-2 bg-[#3BD480] border border-[#3BD480] rounded-lg text-white hover:bg-[#2da866] transition-colors font-kalpurush">
                পরবর্তী
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white font-kalpurush">
                ডিলিট নিশ্চিত করুন
              </h3>
            </div>

            <p className="text-white/70 mb-6 font-kalpurush">
              আপনি কি "{itemToDelete.title}" ডিলিট করতে নিশ্চিত? এই কাজটি
              পূর্বাবস্থায় ফেরানো যাবে না।
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setItemToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors font-kalpurush"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(itemToDelete._id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-kalpurush"
              >
                <Trash2 className="w-4 h-4" />
                ডিলিট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
