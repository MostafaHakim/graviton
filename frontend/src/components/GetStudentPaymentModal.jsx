import React, { useState } from "react";

const GetStudentPaymentModal = ({ onClose, onSubmit, receivedBy, id }) => {
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentType: "cash",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paymentAmount || formData.paymentAmount <= 0) {
      alert("Enter valid payment amount");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        ...formData,
        paymentAmount: Number(formData.paymentAmount),
        receivedBy,
        id,
      });

      setFormData({
        paymentAmount: "",
        paymentType: "cash",
        date: new Date().toISOString().split("T")[0],
      });

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
        {/* payment */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Amount
            </label>
            <input
              type="number"
              name="paymentAmount"
              value={formData.paymentAmount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Type
            </label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cash">Cash</option>
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStudentPaymentModal;
