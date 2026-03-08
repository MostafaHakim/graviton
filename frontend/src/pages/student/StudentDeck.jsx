import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getFlashDackByLevelId,
  getFlashLevelById,
} from "../../store/features/auth/flashcardSlice";
import {
  ArrowLeft,
  Layers,
  Loader2,
  BookOpen,
  ChevronRight,
  Target,
  Sparkles,
  Clock,
  BookMarked,
  Grid,
  FolderOpen,
} from "lucide-react";

const StudentDeck = () => {
  const { id, levelId } = useParams();
  const navigate = useNavigate();
  const { dacks, levels, loading } = useSelector((state) => state.flashs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id || !levelId) return;
    dispatch(getFlashDackByLevelId(levelId));
    dispatch(getFlashLevelById(id));
  }, [id, levelId, dispatch]);

  const selectedLevel = levels?.find((lvl) => lvl._id === levelId);

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
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span className="font-kalpurush">পিছনে</span>
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Level Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <FolderOpen className="w-10 h-10 text-gray-700" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2 font-kalpurush">
              লেভেল {selectedLevel?.level || "ফ্ল্যাশকার্ড"}
            </h1>

            {selectedLevel?.description && (
              <p className="text-gray-500 text-sm max-w-2xl mb-4 font-kalpurush">
                {selectedLevel.description}
              </p>
            )}

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <Grid size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700 font-kalpurush">
                {dacks?.length || 0} টি ডেক
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
            ফ্ল্যাশকার্ড ডেক সমূহ
          </h2>
        </div>

        {/* Decks Grid */}
        {dacks && dacks.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {dacks.map((deck, index) => (
              <motion.div
                key={deck._id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  to={deck._id}
                  className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Card Header with Deck Number */}
                  <div className="relative h-2 bg-gradient-to-r from-gray-800 to-gray-600">
                    <div className="absolute -top-3 right-4 w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-sm font-medium text-gray-700">
                        {deck.deckNumber}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pt-4">
                    {/* Deck Icon */}
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4 border border-gray-200">
                      <BookMarked className="w-7 h-7 text-gray-700" />
                    </div>

                    {/* Deck Title */}
                    <h3 className="text-xl font-medium text-gray-900 mb-2 font-kalpurush line-clamp-1">
                      {deck.title + " " + deck.deckNumber}
                    </h3>

                    {/* Deck Description */}
                    {deck.description && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-kalpurush">
                        {deck.description}
                      </p>
                    )}

                    {/* Deck Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Target size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {deck.cardCount || 0} কার্ড
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {deck.masteredCount || 0} আয়ত্ত
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-300" />
                        <span className="text-xs text-gray-400">
                          {deck.timeEstimate || "১০-১৫"} মিনিট
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        <span className="font-kalpurush">শুরু করুন</span>
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
                <FolderOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-kalpurush">
                কোনো ডেক নেই
              </h3>
              <p className="text-gray-500 text-sm mb-6 font-kalpurush">
                লেভেল {selectedLevel?.level} এর জন্য এখনও কোনো ফ্ল্যাশকার্ড ডেক
                তৈরি করা হয়নি
              </p>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-kalpurush"
              >
                <ArrowLeft size={16} />
                পিছনে যান
              </button>
            </div>
          </div>
        )}

        {/* Info Card */}
        {dacks && dacks.length > 0 && (
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BookOpen
                size={20}
                className="text-gray-500 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 font-kalpurush">
                  ডেক সম্পর্কে
                </h4>
                <p className="text-sm text-gray-500 font-kalpurush">
                  প্রতিটি ডেকে নির্দিষ্ট সংখ্যক ফ্ল্যাশকার্ড থাকে। আপনি আপনার
                  শেখার অগ্রগতি অনুযায়ী ডেক থেকে ডেকে যেতে পারেন।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDeck;
