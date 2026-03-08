import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddModal from "../../components/AddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createClass,
  deleteClassById,
  getClasses,
} from "../../store/features/auth/classesSlice";
import { Trash2 } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

const MadeEasyManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModalWithId, setShowDeleteModalWithId] = useState(null);
  const [selectClass, setSelectClass] = useState("null");
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const handleAddClass = async (className) => {
    await dispatch(createClass({ name: className.toLowerCase() }));
    setShowAddModal(false);
  };
  const handleDeleteClass = async (id) => {
    const res = await dispatch(deleteClassById(id));
    if (res.meta.requestStatus === "fulfilled") {
      setShowDeleteModalWithId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">
              Made Easy Management
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl">
              Streamline your classroom management with our minimalist approach
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Management Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
            <h2 className="text-2xl font-medium text-gray-800">
              ক্লাস ম্যানেজমেন্ট
            </h2>
            <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">
              {classes?.length || 0} classes
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Class
          </button>
        </div>

        {/* Classes Grid */}
        {classes && classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {classes.map((cls, index) => (
              <div
                key={cls._id || index}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <button
                  onClick={() => {
                    (setShowDeleteModalWithId(cls._id),
                      setSelectClass(cls.name));
                  }}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <Trash2 size={16} color="red" />
                </button>
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Class Icon */}
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                    <span className="text-2xl font-light text-gray-600">
                      {cls.name?.charAt(0).toUpperCase() || "C"}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize">
                    ক্লাসের নামঃ {cls.name}
                  </h3>

                  <div className="w-12 h-0.5 bg-gray-200 rounded-full mb-4"></div>

                  <Link
                    to={`${cls._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full justify-center"
                  >
                    <span>Enter Class</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No classes yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Get started by creating your first class
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create First Class
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      {showAddModal && (
        <AddModal
          title="Add New Class"
          onSave={handleAddClass}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showDeleteModalWithId !== null && (
        <DeleteModal
          title={`Are You Sure You Want To Delete  Class ${selectClass}`}
          onDelete={handleDeleteClass}
          onClose={() => setShowDeleteModalWithId(null)}
          id={showDeleteModalWithId}
        />
      )}
    </div>
  );
};

export default MadeEasyManagement;
