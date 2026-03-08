import React, { useEffect, useState } from "react";
import FlashcardForm from "../../components/FlashcardForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createFlashCard,
  getFlashCardsByDeckId,
} from "../../store/features/auth/flashcardSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Loader2,
  BookOpen,
  Layers,
  ChevronRight,
  Hash,
  BookMarked,
  FileText,
  MessageSquare,
  Copy,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const FlashCardManagement = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { cards, loading } = useSelector((state) => state.flashs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!deckId) return;
    dispatch(getFlashCardsByDeckId(deckId));
  }, [deckId, dispatch]);

  const handleAddCard = async (data) => {
    const res = await dispatch(createFlashCard(data));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getFlashCardsByDeckId(deckId));
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
          <p className="text-gray-600 text-sm">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Decks
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">
              Flashcard Management
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Flashcard Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <BookMarked className="w-10 h-10 text-gray-700" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Flashcard Management
            </h1>

            <p className="text-gray-500 text-sm max-w-2xl mb-4">
              Create and manage flashcards for this deck
            </p>

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <Layers size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {cards?.length || 0} Flashcards
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
            <h2 className="text-2xl font-medium text-gray-800">Flashcards</h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Flashcard
          </button>
        </div>

        {/* Flashcards Grid */}
        {cards && cards.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <div
                key={card._id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6">
                  {/* Header with Number and Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">Flashcard</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} className="text-gray-500" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Word Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash size={16} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Word
                      </span>
                    </div>
                    <p className="text-xl font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {card.word}
                    </p>
                  </div>

                  {/* Meaning Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={16} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </span>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {card.meaning}
                    </p>
                  </div>

                  {/* Example Section */}
                  {card.example && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={16} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Defination
                        </span>
                      </div>
                      <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                        "{card.example}"
                      </p>
                    </div>
                  )}

                  {/* Synonyms Section */}
                  {card.synonyms && card.synonyms.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Copy size={16} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Example
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {card.synonyms.map((syn, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded border border-gray-200"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Metadata */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>ID: {card._id.slice(-6)}</span>
                    <span>
                      Created: {new Date(card.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <BookMarked className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No flashcards yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Start building your vocabulary by adding your first flashcard
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Add First Flashcard
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        {cards && cards.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">
                  {cards.length}
                </div>
                <div className="text-sm text-gray-500">Total Cards</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Mastered</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Learning</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-light text-gray-900">—</div>
                <div className="text-sm text-gray-500">Review</div>
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
                About Flashcards
              </h4>
              <p className="text-sm text-gray-500">
                Each flashcard contains a word, its meaning, example sentence,
                and synonyms. Use them to build your vocabulary and test your
                knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Flashcard Modal */}
      {showModal && (
        <div className="absolute top-0 bottom-0 left-0 right-0   flex flex-col items-center justify-center">
          <FlashcardForm
            onClose={() => setShowModal(false)}
            handleAddCard={handleAddCard}
            deckId={deckId}
          />
        </div>
      )}
    </div>
  );
};

export default FlashCardManagement;
