import React, { useState } from "react";
import uploadToCloudinary from "../utils/cloudinery";

const AddChapterModal = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: {
      name: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      pdfUrl: "",
      publicUrl: "",
      pageCount: 1, // Default page count
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("content.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const result = await uploadToCloudinary(file, type);

    if (result) {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [`${type}Url`]: result.url,
          publicUrl: result.url,
          pageCount: result.pages || prev.content.pageCount, // Store detected pages
        },
      }));
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Chapter</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <hr />

          <h3 className="font-semibold">Content Details</h3>

          <input
            type="text"
            name="content.name"
            placeholder="Content Name"
            value={formData.content.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="content.description"
            placeholder="Description"
            value={formData.content.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Image */}
          <div className="border p-3 rounded bg-gray-50">
            <label className="block font-medium mb-1 italic text-blue-600">Upload Image / Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="text-sm"
            />
            {formData.content.imageUrl && (
              <img
                src={formData.content.imageUrl}
                alt="preview"
                className="mt-2 h-24 rounded border-2 border-white shadow"
              />
            )}
          </div>

          {/* Video */}
          <div className="border p-3 rounded bg-gray-50">
            <label className="block font-medium mb-1 italic text-blue-600">Upload Video Lecture</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="text-sm"
            />
            {formData.content.videoUrl && (
              <p className="text-green-600 text-sm mt-1 font-bold">✓ Video Uploaded</p>
            )}
          </div>

          {/* PDF */}
          <div className="border p-3 rounded bg-gray-50">
            <label className="block font-medium mb-1 italic text-blue-600">Upload PDF Study Material</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, "pdf")}
              className="text-sm"
            />
            {formData.content.pdfUrl && (
              <div className="mt-1 flex items-center justify-between">
                <p className="text-green-600 text-sm font-bold">✓ PDF Uploaded</p>
                <p className="text-blue-600 text-xs font-bold uppercase">
                  Pages detected: {formData.content.pageCount}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold disabled:bg-blue-300"
            >
              {loading ? "Uploading..." : "Add Chapter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChapterModal;
