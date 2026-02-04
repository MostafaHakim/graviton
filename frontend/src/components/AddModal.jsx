import { useState } from "react";

const AddModal = ({ title, onSave, onClose }) => {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3>{title}</h3>
        <input
          className="border p-2 w-full mt-2"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onSave(value)}
            className="bg-blue-600 text-white px-3 py-1"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
