import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import uploadImageToCloudinary from "../utils/cloudinery";

const ShareholderEditModal = ({
  setShowModal,
  handleUpdateShare,
  editData,
}) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    father: "",
    email: "",
    mobile: "",
    nid: "",
    imageFile: null,
    imageUrl: "",
    publicUrl: "",
    about: "",
  });

  // ====== load edit data ======
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        father: editData.father || "",
        email: editData.email || "",
        mobile: editData.mobile || "",
        nid: editData.nid || "",
        imageFile: null,
        imageUrl: editData.imageUrl || "",
        publicUrl: editData.publicUrl || "",
        about: editData.about || "",
      });

      if (editData.imageUrl) {
        setPreview(editData.imageUrl);
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (file) {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
        }));

        const newPreview = URL.createObjectURL(file);
        setPreview(newPreview);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageData = null;

      if (formData.imageFile) {
        imageData = await uploadImageToCloudinary(formData.imageFile);
      }

      const data = {
        name: formData.name,
        father: formData.father,
        email: formData.email,
        mobile: formData.mobile,
        nid: formData.nid,
        about: formData.about,
        imageUrl: imageData?.url || formData.imageUrl,
        publicUrl: imageData?.public_id || formData.publicUrl,
      };

      await handleUpdateShare(editData._id, data);

      toast.success("Shareholder updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl">
        {/* header */}
        <div className="bg-green-600 text-white p-4 flex justify-between">
          <h2>Edit Shareholder</h2>
          <button onClick={() => setShowModal(false)}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="father"
            value={formData.father}
            onChange={handleChange}
            placeholder="Father"
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full border p-2 rounded"
          />

          <input
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            placeholder="NID"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About"
            className="w-full border p-2 rounded"
          />

          {/* preview */}
          {preview && (
            <img src={preview} className="w-24 h-24 object-cover rounded" />
          )}

          <input type="file" onChange={handleChange} />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareholderEditModal;
