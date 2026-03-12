// import React, { useEffect, useState } from "react";
// import ShareholderAddModal from "../components/ShareholderAddModal";
// import { useDispatch, useSelector } from "react-redux";
// import { createShare, getShare } from "../store/features/auth/shareSlice";
// import { toast } from "react-toastify";
// const Shareholder = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { share, loading } = useSelector((state) => state.share);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getShare());
//   }, [dispatch]);

//   const handelAddShare = async (formData) => {
//     const res = await dispatch(createShare(formData));

//     if (res.meta.requestStatus === "fulfilled") {
//       await dispatch(getShare());
//       setShowModal(false);
//     }
//   };
//   console.log(share);

//   if (loading) {
//     return (
//       <div>
//         <h2>Loding...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl m-auto bg-white font-kalpurush">
//       <div className="flex flex-row items-center justify-between p-6">
//         <h2>শেয়ার হোল্ডার</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-2 bg-blue-500 text-white rounded-full cursor-pointer"
//         >
//           Add Shareholder
//         </button>
//       </div>

//       <div>
//         {share &&
//           share.map((sha) => (
//             <div>
//               <h2>{sha.name}</h2>
//               <h2>{sha.father}</h2>
//               <h2>{sha.email}</h2>
//               <h2>{sha.mobile}</h2>
//               <img src={sha.imageUrl} alt="" />

//               <h2>{sha.nid}</h2>
//               <h2>{sha.about}</h2>
//             </div>
//           ))}
//       </div>
//       {showModal && (
//         <ShareholderAddModal
//           handelAddShare={handelAddShare}
//           setShowModal={setShowModal}
//         />
//       )}
//     </div>
//   );
// };

// export default Shareholder;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShareholderAddModal from "../../components/ShareholderAddModal";
import { createShare, getShare } from "../../store/features/auth/shareSlice";

const Shareholder = () => {
  const [showModal, setShowModal] = useState(false);
  const { share, loading } = useSelector((state) => state.share);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShare());
  }, [dispatch]);

  const handleAddShare = async (formData) => {
    const res = await dispatch(createShare(formData));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getShare());
      setShowModal(false);
      toast.success("শেয়ার হোল্ডার সফলভাবে যোগ করা হয়েছে");
    } else {
      toast.error("শেয়ার হোল্ডার যোগ করা যায়নি");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-600">লোড হচ্ছে...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto  font-kalpurush p-6">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">শেয়ার হোল্ডার</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer transition-colors duration-200 font-semibold shadow-md"
        >
          + Add Shareholder
        </button>
      </div>

      {/* Shareholders Grid */}
      {share && share.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {share.map((shareholder, index) => (
            <div
              key={shareholder.id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Image Section */}
              {shareholder.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={shareholder.imageUrl}
                    alt={shareholder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {shareholder.name}
                </h3>

                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-semibold">পিতা:</span>{" "}
                    {shareholder.father}
                  </p>
                  <p>
                    <span className="font-semibold">ইমেইল:</span>{" "}
                    <a
                      href={`mailto:${shareholder.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {shareholder.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">মোবাইল:</span>{" "}
                    <a
                      href={`tel:${shareholder.mobile}`}
                      className="text-blue-500 hover:underline"
                    >
                      {shareholder.mobile}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">এনআইডি:</span>{" "}
                    {shareholder.nid}
                  </p>
                  {shareholder.about && (
                    <p>
                      <span className="font-semibold">সম্পর্কে:</span>{" "}
                      <span className="text-sm">{shareholder.about}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            কোন শেয়ার হোল্ডার নেই
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            নতুন শেয়ার হোল্ডার যোগ করতে "Add Shareholder" বাটনে ক্লিক করুন।
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ShareholderAddModal
          handleAddShare={handleAddShare}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Shareholder;
