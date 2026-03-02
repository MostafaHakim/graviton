import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMember, getAllMember } from "../store/features/auth/memberSlice";
import { useNavigate } from "react-router-dom";

export default function PremiumMemberForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMember());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    planName: "",
    price: "",
    durationInDays: "",
    method: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(formData.durationInDays));

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subscription: {
        planName: formData.planName,
        price: Number(formData.price),
        startDate,
        expiryDate,
        durationInDays: Number(formData.durationInDays),
      },
      paymentInfo: {
        method: formData.method,
        transactionId: formData.transactionId,
      },
    };

    try {
      const res = await dispatch(createMember(payload));

      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/membership`);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating member");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
        Create Premium Member
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Plan Name */}
        <input
          type="text"
          name="planName"
          placeholder="Plan Name (Gold / Silver)"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Plan Price"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Duration */}
        <input
          type="number"
          name="durationInDays"
          placeholder="Duration (Days)"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Payment Method */}
        <select
          name="method"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        >
          <option value="">Select Payment Method</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>

        {/* Transaction ID */}
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Create Premium Member
        </button>
      </form>
    </div>
  );
}
