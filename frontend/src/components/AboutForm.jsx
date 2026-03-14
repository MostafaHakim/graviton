import React, { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";

const AboutForm = ({ handleAddAbout, initialData, isEdit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    valus: [{ title: "", description: "" }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        valus:
          initialData.valus?.length > 0
            ? initialData.valus
            : [{ title: "", description: "" }],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValueChange = (index, field, value) => {
    const updatedValues = [...formData.valus];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      valus: updatedValues,
    });
  };

  const addValue = () => {
    setFormData({
      ...formData,
      valus: [...formData.valus, { title: "", description: "" }],
    });
  };

  const removeValue = (index) => {
    if (formData.valus.length > 1) {
      const updatedValues = formData.valus.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        valus: updatedValues,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAbout(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Our Values, Our Mission, etc."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter a unique name for this section
        </p>
      </div>

      {/* Values Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Values <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={addValue}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Value
          </button>
        </div>

        <div className="space-y-4">
          {formData.valus.map((value, index) => (
            <div
              key={index}
              className="relative bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              {formData.valus.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors shadow-sm"
                  title="Remove value"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <p className="text-xs font-medium text-gray-500 mb-3">
                Value #{index + 1}
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) =>
                      handleValueChange(index, "title", e.target.value)
                    }
                    required
                    placeholder="Enter value title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Description
                  </label>
                  <textarea
                    value={value.description}
                    onChange={(e) =>
                      handleValueChange(index, "description", e.target.value)
                    }
                    required
                    rows="3"
                    placeholder="Enter value description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
        >
          {isEdit ? "Update Content" : "Save Content"}
        </button>
      </div>
    </form>
  );
};

export default AboutForm;
