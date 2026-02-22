import { useState } from "react";

const AddSubjectModal = ({ onClose, onSave, classId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classId,
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3>Add New Subject</h3>
        <input
          className="border p-2 w-full mt-2"
          placeholder="Enter subject name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Enter subject description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
