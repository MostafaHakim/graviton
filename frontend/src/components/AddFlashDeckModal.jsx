import React, { useState } from "react";

const AddFlashDeckModal = ({ onClose, levelId, handleAddDack }) => {
  const [deckNumber, setDeckNumber] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      level: levelId,
      deckNumber,
      title,
    };
    await handleAddDack(body);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-5">Add Flash Deck</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Deck Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Deck Number
            </label>
            <input
              type="number"
              value={deckNumber}
              onChange={(e) => setDeckNumber(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter deck number"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Deck Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter deck title"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlashDeckModal;
