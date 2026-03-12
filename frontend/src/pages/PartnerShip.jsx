import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShare } from "../store/features/auth/shareSlice";

const PartnerShip = () => {
  const { share, loading } = useSelector((state) => state.share);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShare());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#134C45] to-[#0d362f]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3BD480] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-white font-kalpurush">লোড হচ্ছে...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#134C45] to-[#0d362f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-kalpurush">
            আমাদের শেয়ার হোল্ডার
          </h1>
          <div className="w-20 h-1 bg-[#3BD480] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-3 text-base font-kalpurush">
            মোট {share?.length || 0} জন সম্মানিত শেয়ার হোল্ডার
          </p>
        </div>

        {/* Shareholders Grid - 4 cards per row */}
        {share && share.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {share.map((shareholder, index) => (
              <div
                key={shareholder.id || index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header with Gradient */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>

                {/* Profile Image - Circular and centered */}
                <div className="relative z-10 flex justify-center mt-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      {shareholder.imageUrl ? (
                        <img
                          src={shareholder.imageUrl}
                          alt={shareholder.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#134C45] to-[#3BD480] flex items-center justify-center">
                          <span className="text-3xl text-white font-bold">
                            {shareholder.name?.charAt(0) || "S"}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#3BD480] border-2 border-white rounded-full"></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-4 pb-5 pt-3 text-center">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-[#134C45] mb-1 font-kalpurush truncate">
                    {shareholder.name}
                  </h3>

                  {/* Designation/Father's Name */}
                  <p className="text-xs text-gray-500 mb-3 font-kalpurush truncate">
                    পিতা: {shareholder.father}
                  </p>

                  {/* Info Items in 2 Columns */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {/* NID */}
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-[10px] text-[#134C45] font-kalpurush">
                        এনআইডি
                      </p>
                      <p className="text-xs font-semibold text-gray-700 truncate">
                        {shareholder.nid}
                      </p>
                    </div>

                    {/* Mobile */}
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-[10px] text-[#134C45] font-kalpurush">
                        মোবাইল
                      </p>
                      <p className="text-xs font-semibold text-gray-700 truncate">
                        {shareholder.mobile}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mt-2 bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-[#134C45] font-kalpurush">
                      ইমেইল
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {shareholder.email}
                    </p>
                  </div>

                  {/* About Section - Show if exists */}
                  {shareholder.about && (
                    <div className="mt-2">
                      <p className="text-[10px] text-[#134C45] font-kalpurush mb-1">
                        সম্পর্কে
                      </p>
                      <p className="text-[10px] text-gray-500 line-clamp-2 font-kalpurush">
                        {shareholder.about}
                      </p>
                    </div>
                  )}

                  {/* View Profile Button */}
                  <button className="mt-3 w-full bg-gradient-to-r from-[#134C45] to-[#3BD480] text-white text-xs py-2 rounded-lg font-kalpurush hover:opacity-90 transition-opacity duration-200">
                    গ্র্যাভিটন একাডেমি
                  </button>
                </div>

                {/* Serial Number Badge */}
                <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-2xl">
            <svg
              className="mx-auto h-16 w-16 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-white font-kalpurush">
              কোনো শেয়ার হোল্ডার নেই
            </h3>
            <p className="mt-2 text-sm text-gray-300 font-kalpurush">
              শীঘ্রই শেয়ার হোল্ডারদের তথ্য যুক্ত করা হবে
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerShip;
