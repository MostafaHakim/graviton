// import React from "react";

// const StatusModal = ({ presentStatus, handleUpdate, onClose, id }) => {
//   return (
//     <div className="flex flex-col items-center justify-center p-2 bg-stone-400 rounded z-40 absolute">
//       {presentStatus !== "active" ? (
//         <button
//           onClick={() => handleUpdate("active", id)}
//           className="bg-green-400 text-white w-16 py-1 cursor-pointer"
//         >
//           Active
//         </button>
//       ) : (
//         ""
//       )}

//       {presentStatus !== "block" ? (
//         <button
//           onClick={() => handleUpdate("block", id)}
//           className="bg-red-400 text-white w-16 py-1 cursor-pointer"
//         >
//           Block
//         </button>
//       ) : (
//         ""
//       )}
//       <button
//         className="bg-blue-400 text-white w-16 py-1 cursor-pointer"
//         onClick={() => onClose()}
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default StatusModal;

import React from "react";

const StatusModal = ({ presentStatus, handleUpdate, onClose, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-3 min-w-[140px] absolute z-50 border border-gray-200">
      {/* Modal Header */}
      <div className="text-xs font-semibold text-gray-500 mb-2 px-2">
        Change Status
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-1">
        {presentStatus !== "active" && (
          <button
            onClick={() => handleUpdate("active", id)}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 rounded-lg transition-all duration-200 group w-full"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 group-hover:animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
              Active
            </span>
          </button>
        )}

        {presentStatus !== "block" && (
          <button
            onClick={() => handleUpdate("block", id)}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-lg transition-all duration-200 group w-full"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
              Block
            </span>
          </button>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 my-1"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-all duration-200 group w-full"
        >
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">
            Close
          </span>
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
