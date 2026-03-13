import React, { useState } from "react";

const ClubForm = ({ handleAddClub, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    tech: "",
    activity: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddClub(formData);
    setFormData({
      name: "",
      tech: "",
      activity: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Club</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Club Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Technology</label>
          <input
            type="text"
            name="tech"
            value={formData.tech}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Activity</label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Club"}
        </button>
      </form>
    </div>
  );
};

export default ClubForm;
