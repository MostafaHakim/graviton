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
  ChevronLeft,
  ChevronRight,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

      alert("আইটেম সফলভাবে ডিলিট করা হয়েছে!");
    } catch (error) {
      console.error(error);
      alert("ডিলিট ব্যর্থ হয়েছে!");
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      alert("দয়া করে আইটেম সিলেক্ট করুন!");
      return;
    }

    try {
      for (const id of selectedItems) {
        const item = galleryItems.find((item) => item._id === id);
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

      setGalleryItems(
        galleryItems.filter((item) => !selectedItems.includes(item._id)),
      );
      setSelectedItems([]);
      alert(`${selectedItems.length} টি আইটেম সফলভাবে ডিলিট করা হয়েছে!`);
    } catch (error) {
      console.error("Error bulk deleting items:", error);
      alert("বাল্ক ডিলিট ব্যর্থ হয়েছে!");
    }
  };

  const categories = [
    { id: "all", label: "সব", icon: Grid },
    { id: "events", label: "ইভেন্টস", icon: Calendar },
    { id: "classes", label: "ক্লাস", icon: BookOpen },
    { id: "achievements", label: "সাফল্য", icon: Award },
    { id: "students", label: "শিক্ষার্থী", icon: Users },
    { id: "campus", label: "ক্যাম্পাস", icon: MapPin },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-gray-800 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 font-kalpurush">
              গ্যালারি ম্যানেজমেন্ট
            </h1>
          </div>
          <p className="text-gray-500 font-kalpurush ml-4">
            সব গ্যালারি আইটেম দেখুন, ম্যানেজ করুন এবং ডিলিট করুন
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-kalpurush">
                  মোট আইটেম
                </p>
                <p className="text-2xl font-light text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Grid className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-kalpurush">ছবি</p>
                <p className="text-2xl font-light text-gray-900">
                  {stats.images}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-kalpurush">ভিডিও</p>
                <p className="text-2xl font-light text-gray-900">
                  {stats.videos}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Video className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-kalpurush">
                  সর্বশেষ আপডেট
                </p>
                <p className="text-lg font-light text-gray-900 font-kalpurush">
                  {stats.lastUpdated}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="সার্চ করুন (শিরোনাম, বর্ণনা, ট্যাগ)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all font-kalpurush"
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
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white font-kalpurush"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white font-kalpurush"
              >
                <option value="all">সব টাইপ</option>
                <option value="image">ছবি</option>
                <option value="video">ভিডিও</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Add New Button */}
              <Link
                to="upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-kalpurush"
              >
                <BookPlus className="w-5 h-5" />
                নতুন আইটেম
              </Link>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-gray-900 font-kalpurush">
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
            <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-kalpurush">লোড হচ্ছে...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-light text-gray-900 mb-2 font-kalpurush">
              কোনো আইটেম পাওয়া যায়নি
            </h3>
            <p className="text-gray-500 font-kalpurush">
              {searchTerm
                ? "আপনার সার্চের সাথে মিলে এমন কোনো আইটেম নেই"
                : "গ্যালারিতে এখনও কোনো আইটেম নেই"}
            </p>
          </div>
        ) : (
          <>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}
            >
              {currentItems.map((item) => (
                <div
                  key={item._id}
                  className={`group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    selectedItems.includes(item._id)
                      ? "ring-2 ring-gray-900"
                      : ""
                  } ${viewMode === "list" ? "flex" : ""}`}
                >
                  {/* Checkbox */}
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
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                  </div>

                  {/* Thumbnail */}
                  <div
                    className={`${
                      viewMode === "list" ? "w-1/3" : "aspect-square"
                    } relative overflow-hidden bg-gray-100`}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.image}
                        className="w-full h-full object-cover"
                        controls
                        poster={item.thumbnail || ""}
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 left-10">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "video"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {item.type === "video" ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <ImageIcon className="w-3 h-3" />
                          )}
                          <span className="font-kalpurush">
                            {item.type === "video" ? "ভিডিও" : "ছবি"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200">
                        {React.createElement(
                          categories.find((c) => c.id === item.category)
                            ?.icon || Grid,
                          { className: "w-3 h-3 text-gray-600" },
                        )}
                        <span className="text-xs text-gray-700 font-kalpurush">
                          {
                            categories.find((c) => c.id === item.category)
                              ?.label
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-medium text-gray-900 font-kalpurush line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => window.open(item.image, "_blank")}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="দেখুন"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(item);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                          title="ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-3 font-kalpurush line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-kalpurush"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats and Date */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Heart className="w-3 h-3" />
                          <span className="text-xs">{item.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <MessageCircle className="w-3 h-3" />
                          <span className="text-xs">{item.comments || 0}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 font-kalpurush">
                        {formatDate(item.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-gray-500 font-kalpurush">
                  মোট {filteredItems.length} টি আইটেমের মধ্যে{" "}
                  {indexOfFirstItem + 1} -{" "}
                  {Math.min(indexOfLastItem, filteredItems.length)} দেখানো হচ্ছে
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border border-gray-200 rounded-lg transition-colors font-kalpurush ${
                      currentPage === 1
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" />
                      পূর্ববর্তী
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border border-gray-200 rounded-lg transition-colors font-kalpurush ${
                      currentPage === totalPages
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      পরবর্তী
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-light text-gray-900 font-kalpurush">
                ডিলিট নিশ্চিত করুন
              </h3>
            </div>

            <p className="text-gray-600 mb-6 font-kalpurush">
              আপনি কি "{itemToDelete.title}" ডিলিট করতে নিশ্চিত? এই কাজটি
              পূর্বাবস্থায় ফেরানো যাবে না।
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setItemToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-kalpurush"
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
