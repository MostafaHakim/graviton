import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  createFlashCategory,
  getFlashCategory,
} from "../../store/features/auth/flashcardSlice";
import AddCategoryModal from "../../components/AddCategoryModal";
import {
  Plus,
  Search,
  Grid,
  Layers,
  ChevronRight,
  BookOpen,
  Clock,
  Edit3,
  Trash2,
  MoreVertical,
  Filter,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlashManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const { flashCategorys } = useSelector((state) => state.flashs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlashCategory());
  }, [dispatch]);

  const handleAddCategory = async (data) => {
    const res = await dispatch(createFlashCategory(data));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getFlashCategory());
      setOpenModal(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = flashCategorys?.filter(
    (cat) =>
      cat.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Flash Categories
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  মোট {flashCategorys?.length || 0} টি ক্যাটাগরি
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Layers size={18} />
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md"
              >
                <Plus size={18} />
                <span className="font-medium">Add Category</span>
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCategories?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category._id || index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={
                  viewMode === "grid"
                    ? "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    : "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                }
                onClick={() => navigate(`/admin/flash/${category._id}`)}
              >
                {viewMode === "grid" ? (
                  /* Grid View */
                  <div className="p-6">
                    {/* Category Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <BookOpen className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    {/* Category Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {category.subTitle || "No description"}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>12 cards</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Edit3 size={14} />
                        <span>5 sets</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-900 font-medium">0%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {category.subTitle || "No description"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        12 cards
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <Edit3 size={14} />5 sets
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-3xl mb-6">
              <Zap className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm ? "No categories found" : "No categories yet"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchTerm
                ? `No categories match "${searchTerm}". Try a different search term.`
                : "Get started by creating your first flashcard category."}
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
              >
                <Plus size={20} />
                <span>Create First Category</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Category Stats */}
        {filteredCategories?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {filteredCategories.length}
              </div>
              <div className="text-sm text-gray-500">Total Categories</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">—</div>
              <div className="text-sm text-gray-500">Total Cards</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">—</div>
              <div className="text-sm text-gray-500">Active Sets</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">—</div>
              <div className="text-sm text-gray-500">Completion Rate</div>
            </div>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddCategory}
      />
    </div>
  );
};

export default FlashManagement;
