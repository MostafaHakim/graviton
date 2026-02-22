import React, { use } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../../store/features/auth/subjectSlice";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddChapterModal from "../../components/AddChapterModal";
import { createChapter } from "../../store/features/auth/chapterSlice";

const SubjectManagement = () => {
  const { classId, subjectId } = useParams();
  const { class: currentClass } = useSelector((state) => state.classes);
  const { subject, loading } = useSelector((state) => state.subjects);

  const dispatch = useDispatch();

  const [isAddChapterModalOpen, setIsAddChapterModalOpen] =
    React.useState(false);

  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    }
  }, [classId, dispatch]);

  useEffect(() => {
    if (subjectId) {
      dispatch(getSubjectById(subjectId));
    }
  }, [subjectId, dispatch]);

  const handleAddChapter = async (formData) => {
    const res = await dispatch(
      createChapter({ ...formData, subject: subjectId }),
    );
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getSubjectById(subjectId));
      setIsAddChapterModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h2>Subject Management</h2>
        {loading && <p>Loading subject details...</p>}

        {!loading && subject && (
          <div className="flex flex-col items-center justify-center">
            <p>Class : {currentClass?.name}</p>
            <p>Subject: {subject.name}</p>
            <p>Description: {subject.description}</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Add Chapter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subject?.chapter?.map((chapter, index) => (
            <Link
              key={index}
              to={chapter._id}
              className="border p-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{chapter.title}</h3>
            </Link>
          ))}
        </div>
      </div>
      {/* ADD CHAPTER MODEL */}
      {isAddChapterModalOpen && (
        <AddChapterModal
          isOpen={isAddChapterModalOpen}
          onClose={() => setIsAddChapterModalOpen(false)}
          onSubmit={handleAddChapter}
        />
      )}
    </div>
  );
};

export default SubjectManagement;
