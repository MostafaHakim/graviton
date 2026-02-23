const DeleteModal = ({ title, onDelete, onClose, id }) => {
  return (
    <div className="fixed inset-0 bg-gray-500/90 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3>{title}</h3>
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onDelete(id)}
            className="bg-blue-600 text-white px-3 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
