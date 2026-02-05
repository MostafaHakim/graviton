const uploadAudio = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "exam_audio");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/${cloudName}/auto/upload",
    {
      method: "POST",
      body: data,
    },
  );

  return await res.json();
};
export default uploadAudio;
