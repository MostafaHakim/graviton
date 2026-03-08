import {
  X,
  FileText,
  Layers,
  Upload,
  Type,
  Hash,
  BookOpen,
  MessageSquare,
  Copy,
  Plus,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

const FlashcardForm = ({ deckId, onClose, handleAddCard }) => {
  const [mode, setMode] = useState("single");

  const [singleData, setSingleData] = useState({
    word: "",
    meaning: "",
    example: "",
    synonyms: [],
  });

  const [bulkData, setBulkData] = useState("");

  // Single submit
  const handleSingleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      deck: deckId,
      word: singleData.word,
      meaning: singleData.meaning,
      example: singleData.example,
      synonyms: singleData.synonyms,
    };

    await handleAddCard(body);

    setSingleData({
      word: "",
      meaning: "",
      example: "",
      synonyms: [],
    });
    onClose();
  };

  // Bulk submit
  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    const lines = bulkData.split("\n").filter((line) => line.trim());

    const cards = lines.map((line) => {
      const [word, meaning, example, synonyms] = line
        .split("|")
        .map((s) => s.trim());

      return {
        deck: deckId,
        word,
        meaning,
        example,
        synonyms: synonyms
          ? synonyms
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [],
      };
    });

    await handleAddCard(cards);
    setBulkData("");
    onClose();
  };

  // Add synonym
  const addSynonym = () => {
    setSingleData({
      ...singleData,
      synonyms: [...singleData.synonyms, ""],
    });
  };

  // Update synonym
  const updateSynonym = (index, value) => {
    const updatedSynonyms = [...singleData.synonyms];
    updatedSynonyms[index] = value;
    setSingleData({
      ...singleData,
      synonyms: updatedSynonyms,
    });
  };

  // Remove synonym
  const removeSynonym = (index) => {
    const updatedSynonyms = singleData.synonyms.filter((_, i) => i !== index);
    setSingleData({
      ...singleData,
      synonyms: updatedSynonyms,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-light text-gray-900">
              Add New Flashcards
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create flashcards for your deck
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-6 pb-0 sticky top-[88px] bg-white z-10 border-b border-gray-100">
          <button
            onClick={() => setMode("single")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "single"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Type size={16} />
            Single Entry
          </button>

          <button
            onClick={() => setMode("bulk")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "bulk"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Layers size={16} />
            Bulk Entry
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* SINGLE ENTRY */}
          {mode === "single" && (
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              {/* Word */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Hash size={16} className="text-gray-400" />
                    Word <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Abandon"
                  value={singleData.word}
                  onChange={(e) =>
                    setSingleData({ ...singleData, word: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-400" />
                    Type <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Adjective, Verb, Preposition"
                  value={singleData.meaning}
                  onChange={(e) =>
                    setSingleData({ ...singleData, meaning: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Definition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-gray-400" />
                    Definition
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="e.g., To leave something or someone behind"
                  value={singleData.example}
                  onChange={(e) =>
                    setSingleData({ ...singleData, example: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Synonyms - Dynamic List */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Copy size={16} className="text-gray-400" />
                    Examples
                  </div>
                </label>

                <div className="space-y-2">
                  {singleData.synonyms.map((synonym, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Synonym ${index + 1}`}
                        value={synonym}
                        onChange={(e) => updateSynonym(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => removeSynonym(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addSynonym}
                  className="mt-2 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus size={16} />
                  Add another Examples
                </button>

                <p className="text-xs text-gray-400 mt-2">
                  Add Examples one by one. Click the + button to add more.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-6"
              >
                Save Flashcard
              </button>
            </form>
          )}

          {/* BULK ENTRY */}
          {mode === "bulk" && (
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              {/* Format Guide */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-gray-500" />
                  Format Guide
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  Each line should follow this format:
                </p>
                <code className="block bg-white p-3 rounded border border-gray-200 text-xs font-mono text-gray-700">
                  word|type|definition|synonym1,synonym2
                </code>
                <div className="mt-3 text-xs text-gray-500">
                  <p className="font-medium text-gray-700 mb-1">Example:</p>
                  <pre className="bg-white p-3 rounded border border-gray-200 text-xs font-mono text-gray-600 whitespace-pre-wrap">
                    abandon|verb|To leave something|quit,leave
                    ability|noun|Power to do something|skill,talent
                    abroad|adverb|In a foreign country|overseas
                  </pre>
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    Bulk Data <span className="text-red-500">*</span>
                  </div>
                </label>
                <textarea
                  rows="8"
                  placeholder="word|type|definition|syn1,syn2"
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all font-mono text-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                Upload Bulk Flashcards
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
