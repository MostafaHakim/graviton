import React, { useState } from "react";
import { X, BookOpen } from "lucide-react";

const AddCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title: title.trim(), subTitle: subTitle.trim() });
    setTitle("");
    setSubTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Add Category</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter category title"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subtitle
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter subtitle (optional)"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
