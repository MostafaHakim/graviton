import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddModal from "../../components/AddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createClass,
  getClasses,
} from "../../store/features/auth/classesSlice";

const MadeEasyManagement = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch classes when the component mounts
    dispatch(getClasses());
  }, [dispatch]);

  const handleAddClass = (className) => {
    dispatch(createClass({ name: className }));
    console.log("Adding class:", className);
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center relative">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Made Easy Management</h1>
          <p className="text-gray-600">
            This is the Made Easy Management page.
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2>ক্লাস ম্যানেজমেন্ট</h2>{" "}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Class
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="border p-4 mb-2 flex flex-col items-center space-y-2"
            >
              <h3 className="font-semibold">ক্লাসের নামঃ {cls.name}</h3>
              <Link
                to={`${cls._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Enter Your Class
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Adding Class */}
      {showAddModal && (
        <AddModal
          title="Add Class"
          onSave={handleAddClass}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default MadeEasyManagement;
