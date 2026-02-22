const uploadPhotoToCloudinary = async (file, type = "image") => {
  if (!file) return null;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  
  // Note: 'type' parameter is removed because it's not allowed in unsigned uploads.
  // 'resource_type: auto' allows Cloudinary to detect the file type (PDF, image, video).
  const resourceType = "auto"; 

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary Error Detail:", data);
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    // Cloudinary returns 'pages' for PDFs. We fallback to 1 if not present.
    return {
      url: data.secure_url,
      public_id: data.public_id,
      pages: data.pages || 1, 
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return null;
  }
};

export default uploadPhotoToCloudinary;
