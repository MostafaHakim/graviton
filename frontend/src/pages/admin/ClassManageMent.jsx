import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../store/features/auth/classesSlice";
import AddSubjectModal from "../../components/AddSubjectModal";
import { createSubject } from "../../store/features/auth/subjectSlice";

const ClassManageMent = () => {
  const { classId } = useParams();
  const { class: selectedClass, loading } = useSelector(
    (state) => state.classes,
  );

  const dispatch = useDispatch();

  const [showAddSubjectModal, setShowAddSubjectModal] = React.useState(false);

  useEffect(() => {
    dispatch(getClassById(classId));
  }, [classId, dispatch]);

  const handleAddSubject = async (subjectData) => {
    const res = await dispatch(createSubject(subjectData));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getClassById(classId)); // 🔥 refresh class
      setShowAddSubjectModal(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading class details...</p>}
      {!loading && (
        <div>
          <div className="flex flex-col items-center justify-center">
            <h2>Class Management</h2>
            {selectedClass && <p>Name: {selectedClass.name}</p>}
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
              <h2 className="">Select Subject</h2>
              <button
                onClick={() => setShowAddSubjectModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Subject
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
              {selectedClass?.subjects?.map((subject, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between border p-4 rounded space-y-2"
                >
                  <p className="text-2xl">{subject.name}</p>
                  <Link
                    to={subject._id}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Select
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Add Modal */}
          {showAddSubjectModal && (
            <AddSubjectModal
              onClose={() => setShowAddSubjectModal(false)}
              onSave={handleAddSubject}
              classId={classId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ClassManageMent;
