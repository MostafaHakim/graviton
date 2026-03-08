import React, { useState } from "react";

const FlashCardLevelModal = ({ categoryId, onClose, handleAddLevel }) => {
  const [level, setLevel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      level,
      category: categoryId,
    };
    await handleAddLevel(body);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-5">Add Flash Card Level</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Level */}
          <div>
            <label className="block text-sm mb-1 font-medium">Level Name</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter level"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => onClose(false)}
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

export default FlashCardLevelModal;
