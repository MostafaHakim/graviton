import React from "react";

const StatusModal = ({ presentStatus, handleUpdate, onClose, id }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-stone-400 rounded z-40 absolute">
      {presentStatus !== "active" ? (
        <button
          onClick={() => handleUpdate("active", id)}
          className="bg-green-400 text-white w-16 py-1"
        >
          Active
        </button>
      ) : (
        ""
      )}

      {presentStatus !== "block" ? (
        <button
          onClick={() => handleUpdate("block", id)}
          className="bg-red-400 text-white w-16 py-1"
        >
          Block
        </button>
      ) : (
        ""
      )}
      <button
        className="bg-blue-400 text-white w-16 py-1"
        onClick={() => onClose()}
      >
        Close
      </button>
    </div>
  );
};

export default StatusModal;
