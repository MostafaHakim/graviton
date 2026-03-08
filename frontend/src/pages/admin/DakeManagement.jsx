import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createFlashDack,
  getFlashDackByLevelId,
  getFlashLevelById,
} from "../../store/features/auth/flashcardSlice";
import {
  ArrowLeft,
  Layers,
  Plus,
  ChevronRight,
  Loader2,
  BookOpen,
  Grid,
  FolderOpen,
  Layers3,
} from "lucide-react";
import AddFlashDeckModal from "../../components/AddFlashDeckModal";

const DakeManagement = () => {
  const { levelId, id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { dacks, levels, loading } = useSelector((state) => state.flashs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!levelId || !id) return;
    dispatch(getFlashLevelById(id));
    dispatch(getFlashDackByLevelId(levelId));
  }, [levelId, id, dispatch]);

  const currentLevel = levels.find((lvl) => lvl._id === levelId);

  const handleAddDack = async (data) => {
    const res = await dispatch(createFlashDack(data));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getFlashDackByLevelId(levelId));
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading decks...</p>
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
              Back to Levels
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Deck Management</span>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Level Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <Layers3 className="w-10 h-10 text-gray-700" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Level {currentLevel?.level || "Flashcard Level"}
            </h1>

            {currentLevel?.description && (
              <p className="text-gray-500 text-sm max-w-2xl mb-4">
                {currentLevel.description}
              </p>
            )}

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <FolderOpen size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {dacks?.length || 0} Decks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
            <h2 className="text-2xl font-medium text-gray-800">
              Flashcard Decks
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Deck
          </button>
        </div>

        {/* Decks Grid */}
        {dacks && dacks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {dacks.map((deck) => (
              <Link
                to={deck._id}
                key={deck._id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6">
                  {/* Deck Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl text-lg font-medium text-gray-700">
                      {deck.deckNumber}
                    </span>
                    <ChevronRight
                      size={20}
                      className="text-gray-300 group-hover:text-gray-400 transition-colors"
                    />
                  </div>

                  {/* Deck Icon */}
                  <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                    <BookOpen className="w-7 h-7 text-gray-500" />
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                    {deck.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    Deck {deck.deckNumber}
                  </p>

                  {deck.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {deck.description}
                    </p>
                  )}

                  {/* Deck Stats */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Flashcards</span>
                      <span className="text-gray-600">
                        {deck.flashcardCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <FolderOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No decks yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Start by creating your first flashcard deck for Level{" "}
                {currentLevel?.level}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Add First Deck
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        {dacks && dacks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {dacks.length}
                </div>
                <div className="text-sm text-gray-500">Total Decks</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Flashcards</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Mastered</div>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <BookOpen
              size={20}
              className="text-gray-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                About Flashcard Decks
              </h4>
              <p className="text-sm text-gray-500">
                Decks are collections of flashcards within a level. Create
                multiple decks to organize your flashcards by topic, chapter, or
                any other criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Deck Modal */}
      {showModal && (
        <AddFlashDeckModal
          onClose={() => setShowModal(false)}
          levelId={levelId}
          handleAddDeck={handleAddDack}
        />
      )}
    </div>
  );
};

export default DakeManagement;
