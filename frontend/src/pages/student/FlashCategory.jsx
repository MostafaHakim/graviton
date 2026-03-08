import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFlashCategory } from "../../store/features/auth/flashcardSlice";
import {
  BookOpen,
  Layers,
  ChevronRight,
  Loader2,
  Sparkles,
  BookMarked,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const FlashCategory = () => {
  const { flashCategorys, loading } = useSelector((state) => state.flashs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlashCategory());
  }, [dispatch]);

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
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm font-kalpurush">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <BookMarked className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2 font-kalpurush">
              শব্দ ভান্ডার
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl font-kalpurush">
              আপনার শব্দভাণ্ডার সমৃদ্ধ করতে বিভিন্ন ক্যাটাগরির ফ্ল্যাশকার্ড
            </p>

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <Layers size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700 font-kalpurush">
                মোট {flashCategorys?.length || 0} টি ক্যাটাগরি
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
          <h2 className="text-2xl font-medium text-gray-800 font-kalpurush">
            ফ্ল্যাশকার্ড ক্যাটাগরি
          </h2>
        </div>

        {/* Categories Grid */}
        {flashCategorys && flashCategorys.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {flashCategorys.map((category, index) => (
              <motion.div
                key={category._id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  to={`/student/flashs/${category._id}`}
                  className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Card Header with Gradient */}
                  <div className="h-2 bg-gradient-to-r from-gray-800 to-gray-600"></div>

                  <div className="p-6">
                    {/* Icon and Category Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-gray-300 transition-colors">
                        {index % 3 === 0 ? (
                          <BookOpen className="w-6 h-6 text-gray-700" />
                        ) : index % 3 === 1 ? (
                          <GraduationCap className="w-6 h-6 text-gray-700" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-gray-700" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-400">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Category Title */}
                    <h3 className="text-xl font-medium text-gray-900 mb-2 font-kalpurush">
                      {category.title}
                    </h3>

                    {/* Subtitle */}
                    {category.subTitle && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-kalpurush">
                        {category.subTitle}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {category.levelCount || 0} টি লেভেল
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        <span className="font-kalpurush">দেখুন</span>
                        <ChevronRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <BookMarked className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-kalpurush">
                কোনো ক্যাটাগরি নেই
              </h3>
              <p className="text-gray-500 text-sm mb-6 font-kalpurush">
                এখনও কোনো ফ্ল্যাশকার্ড ক্যাটাগরি তৈরি করা হয়নি
              </p>
            </div>
          </div>
        )}

        {/* Info Card */}
        {flashCategorys && flashCategorys.length > 0 && (
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BookOpen
                size={20}
                className="text-gray-500 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 font-kalpurush">
                  ফ্ল্যাশকার্ড ক্যাটাগরি সম্পর্কে
                </h4>
                <p className="text-sm text-gray-500 font-kalpurush">
                  বিভিন্ন ক্যাটাগরির ফ্ল্যাশকার্ড আপনার শব্দভাণ্ডার সমৃদ্ধ করতে
                  সাহায্য করে। প্রতিটি ক্যাটাগরিতে একাধিক লেভেল এবং ডেক থাকতে
                  পারে।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCategory;
