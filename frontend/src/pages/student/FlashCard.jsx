import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFlashCardsByDeckId,
  getFlashDackByLevelId,
} from "../../store/features/auth/flashcardSlice";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Volume2,
  RotateCw,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const FlashCard = () => {
  const { deckId, levelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cards, dacks, loading } = useSelector((state) => state.flashs);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!deckId || !levelId) return;

    dispatch(getFlashCardsByDeckId(deckId));
    dispatch(getFlashDackByLevelId(levelId));
  }, [deckId, levelId, dispatch]);

  const selectedDeck = dacks?.find((d) => d._id === deckId);
  const currentCard = cards?.[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const getProgressColor = (index) => {
    const percentage = (index + 1) / cards?.length;
    if (percentage < 0.3) return "from-amber-500 to-orange-500";
    if (percentage < 0.7) return "from-blue-500 to-indigo-500";
    return "from-emerald-500 to-teal-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <BookOpen className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-indigo-600 font-medium">
            Loading flashcards...
          </p>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
          <BookOpen className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-gray-800 mb-2">
            No flashcards found
          </h2>
          <p className="text-gray-500 mb-6">
            This deck is empty. Add some cards to start learning.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-indigo-100 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back</span>
            </button>

            <div className="text-center">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {selectedDeck?.title + " " + selectedDeck.deckNumber ||
                  "Flashcards"}
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-1 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                {currentIndex + 1} / {cards.length}
              </p>
            </div>

            <div className="w-12 flex justify-end">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>

          {/* Progress */}
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getProgressColor(currentIndex)}`}
              animate={{
                width: `${((currentIndex + 1) / cards.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Card Area */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3 }}
          >
            {/* Flip Card */}
            <div
              className="relative h-[420px] cursor-pointer perspective"
              onClick={handleFlip}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-white to-indigo-50/50 border-2 border-indigo-100 rounded-t-2xl  flex flex-col items-center justify-center px-10"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-600">
                      {currentIndex + 1}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-4">
                    WORD
                  </p>

                  <h2 className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 text-center mb-4">
                    {currentCard?.word}
                  </h2>

                  <p className="text-sm text-indigo-400 mt-2 italic">
                    {currentCard?.meaning}
                  </p>

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs text-gray-400">
                    <RotateCw size={14} />
                    Click to flip
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-100 rounded-t-2xl  p-8 overflow-y-auto"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>

                  <div className="mt-8 mb-6">
                    <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-4">
                      WORD
                    </p>

                    <h2 className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 mb-4">
                      {currentCard?.word}
                    </h2>
                    <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      Definition
                    </p>

                    <p className="text-gray-700 leading-relaxed bg-white/50 p-4 rounded-xl border border-purple-100">
                      {currentCard?.example}
                    </p>
                  </div>

                  {currentCard?.synonyms?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        Examples
                      </p>

                      <div className="flex flex-col gap-2">
                        {currentCard.synonyms.map((syn, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded text-sm border border-purple-200 shadow-sm"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="grid grid-cols-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-indigo-200  text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
            <span className="font-medium">I don't know this word</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center justify-end gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white  hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md "
          >
            <span className="font-medium">I know this word</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress Stats */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-indigo-600">
                {cards.length - currentIndex - 1}
              </span>{" "}
              cards remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
