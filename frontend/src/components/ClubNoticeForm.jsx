// import React, { useState } from "react";
// import uploadPhotoToCloudinary from "../utils/cloudinery";

// const ClubNoticeForm = ({ clubId, handeleAddNotice, loading }) => {
//   console.log("club iD check", clubId);
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     imageUrl: "",
//     public_id: "",
//     imageFile: null,
//   });

//   // Input handle
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // File handle
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let imageData = null;

//       if (formData.imageFile) {
//         imageData = await uploadPhotoToCloudinary(formData.imageFile);
//         // console.log(imageData); // Debugging এর জন্য
//       }

//       const payload = {
//         title: formData.title,
//         subtitle: formData.subtitle,
//         discription: formData.description,
//         clubId,
//         imageUrl: imageData ? imageData.url : "", // Cloudinary থেকে URL
//         public_id: imageData ? imageData.public_id : "",
//       };

//       await handeleAddNotice(payload);

//       setFormData({
//         title: "",
//         subtitle: "",
//         description: "",
//         imageUrl: "",
//         public_id: "",
//         imageFile: null,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Create Club Notice</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Subtitle</label>
//           <input
//             type="text"
//             name="subtitle"
//             value={formData.subtitle}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             rows={4}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">
//             Image Upload (Optional)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Submitting..." : "Create Notice"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ClubNoticeForm;

import React, { useState } from "react";
import uploadPhotoToCloudinary from "../utils/cloudinery";

const ClubNoticeForm = ({ clubId, handeleAddNotice }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    public_id: "",
    file: null,
    fileType: "", // 'image' or 'video'
  });

  // Input handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File handle
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : "image";
    setFormData((prev) => ({
      ...prev,
      file,
      fileType: type,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let uploadData = null;

      if (formData.file) {
        uploadData = await uploadPhotoToCloudinary(formData.file);
      }

      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        discription: formData.description,
        clubId,
        imageUrl:
          formData.fileType === "image" && uploadData ? uploadData.url : "",
        videoUrl:
          formData.fileType === "video" && uploadData ? uploadData.url : "",
        public_id: uploadData ? uploadData.public_id : "",
      };

      await handeleAddNotice(payload);

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        imageUrl: "",
        videoUrl: "",
        public_id: "",
        file: null,
        fileType: "",
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Club Notice</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Upload Image or Video (Optional)
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Submitting..." : "Create Notice"}
        </button>
      </form>
    </div>
  );
};

export default ClubNoticeForm;
