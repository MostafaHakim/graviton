const ConfirmBox = ({ message, onYes, onNo }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow">
        <p>{message}</p>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onNo}>Cancel</button>
          <button onClick={onYes} className="bg-red-500 text-white px-3 py-1">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
