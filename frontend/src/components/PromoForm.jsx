import React, { useState } from "react";

const PromoForm = ({ handelAddPromo }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountAmount: "",
    expireAt: "",
    usageLimit: "",
    isActive: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handelAddPromo(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          প্রোমো কোড <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="যেমন: SUMMER50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ডিসকাউন্ট পরিমাণ (টাকা) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="discountAmount"
          value={formData.discountAmount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="ডিসকাউন্ট এর পরিমান লিখুন"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          মেয়াদ শেষ হওয়ার তারিখ <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="expireAt"
          value={formData.expireAt}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          সর্বোচ্চ ব্যবহার সীমা <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="যেমন: ১০০"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          প্রোমো কোড সক্রিয় করুন
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          সংরক্ষণ করুন
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          বাতিল করুন
        </button>
      </div>
    </form>
  );
};

export default PromoForm;
