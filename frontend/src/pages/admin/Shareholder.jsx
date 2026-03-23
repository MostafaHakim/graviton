import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShareholderAddModal from "../../components/ShareholderAddModal";
import {
  createShare,
  deleteShare,
  getShare,
  updateShare,
} from "../../store/features/auth/shareSlice";
import DeleteModal from "../../components/DeleteModal";
import ShareholderEditModal from "../../components/ShareholderEditModal";

const Shareholder = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
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

  const handleUpdateShare = async (id, formData) => {
    const res = await dispatch(updateShare({ id, formData }));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getShare());
      setEditData(null);
    }
  };

  const handelDelete = async (id) => {
    const res = await dispatch(deleteShare(id));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getShare());
      setShowDeleteModal(null);
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
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEditData(shareholder)}
                    className="text-white py-1 rounded-md hover:bg-green-600 bg-green-500 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(shareholder._id)}
                    className="text-white py-1 hover:bg-red-600 rounded-md bg-red-500 cursor-pointer"
                  >
                    Delete
                  </button>
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
      {editData && (
        <ShareholderEditModal
          setShowModal={setEditData}
          editData={editData}
          handleUpdateShare={handleUpdateShare}
        />
      )}
      {showDeleteModal !== null && (
        <DeleteModal
          title="Are you sure to delete this shareholder"
          onDelete={handelDelete}
          onClose={() => setShowDeleteModal(null)}
          id={showDeleteModal}
        />
      )}
    </div>
  );
};

export default Shareholder;
