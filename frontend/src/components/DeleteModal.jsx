import DeleteIcon from "../assets/delete.png";

const DeleteModal = ({ title, onDelete, onClose, id }) => {
  return (
    <div className="fixed inset-0 bg-gray-500/90 flex flex-col items-center justify-center z-60">
      <div className="bg-white flex flex-col items-center justify-center p-6 rounded">
        <h3 className="uppercase text-center">{title}</h3>
        <img className="w-28" src={DeleteIcon} alt="" />
        <div className="mt-3 flex justify-center gap-4">
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
