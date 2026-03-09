import React, { useEffect, useState } from "react";
import PromoForm from "../../components/PromoForm";
import { useDispatch, useSelector } from "react-redux";
import { createPromo, getPromo } from "../../store/features/auth/promoSlice";
import { FaEdit, FaTrash, FaCopy, FaSearch } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const PromocodeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { promos } = useSelector((state) => state.promos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPromo());
  }, [dispatch]);

  const handelAddPromo = async (formData) => {
    const res = await dispatch(createPromo(formData));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getPromo());
      setShowModal(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // আপনি এখানে টোস্ট মেসেজ যোগ করতে পারেন
    alert("কপি করা হয়েছে!");
  };

  const getStatusBadge = (isActive, expireAt) => {
    const now = new Date();
    const expiry = new Date(expireAt);

    if (!isActive) {
      return (
        <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
          নিষ্ক্রিয়
        </span>
      );
    } else if (expiry < now) {
      return (
        <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
          মেয়াদোত্তীর্ণ
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
          সক্রিয়
        </span>
      );
    }
  };

  const filteredPromos = promos?.filter((promo) => {
    const code = promo?.code || "";

    const matchesSearch = code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? promo.isActive && new Date(promo.expireAt) > new Date()
          : filterStatus === "expired"
            ? new Date(promo.expireAt) < new Date()
            : filterStatus === "inactive"
              ? !promo.isActive
              : true;

    return matchesSearch && matchesFilter;
  });
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <MdOutlineDiscount className="text-blue-500" />
              প্রোমো কোড ম্যানেজমেন্ট
            </h1>
            <p className="text-gray-600 mt-1">
              মোট {promos?.length || 0}টি প্রোমো কোড রয়েছে
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            নতুন প্রোমো যোগ করুন
          </button>
        </div>

        {/* ফিল্টার এবং সার্চ সেকশন */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="প্রোমো কোড খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">সব প্রোমো</option>
            <option value="active">সক্রিয়</option>
            <option value="expired">মেয়াদোত্তীর্ণ</option>
            <option value="inactive">নিষ্ক্রিয়</option>
          </select>
        </div>
      </div>

      {/* টেবিল সেকশন */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  প্রোমো কোড
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ডিসকাউন্ট
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  মেয়াদ শেষ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ব্যবহার
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  স্ট্যাটাস
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  তৈরির তারিখ
                </th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  অ্যাকশন
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPromos?.length > 0 ? (
                filteredPromos.map((promo) => (
                  <tr
                    key={promo._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(promo.code)}
                          className="text-gray-500 hover:text-blue-500 transition-colors"
                          title="কপি করুন"
                        >
                          <FaCopy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600">
                        {promo.discountAmount} টাকা ছাড়
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(promo.expireAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(promo.usedCount / promo.usageLimit) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {promo.usedCount}/{promo.usageLimit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(promo.isActive, promo.expireAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(promo.createdAt).toLocaleDateString("bn-BD")}
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          title="এডিট করুন"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="ডিলিট করুন"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <MdOutlineDiscount size={48} className="text-gray-300" />
                      <p className="text-lg font-medium">
                        কোন প্রোমো কোড পাওয়া যায়নি
                      </p>
                      <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        প্রথম প্রোমো যোগ করুন
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* মডেল ফর্ম */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                নতুন প্রোমো কোড
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <PromoForm handelAddPromo={handelAddPromo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromocodeManagement;
