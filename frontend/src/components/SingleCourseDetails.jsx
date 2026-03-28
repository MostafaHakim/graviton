import { X } from "lucide-react";
import React from "react";

const SingleCourseDetails = ({ course, onClose }) => {
  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center  absolute top-0 left-0 bottom-0 right-0 p-6">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-lg  relative p-6 ">
        <button
          onClick={() => onClose()}
          className="absolute top-0 right-0 p-4"
        >
          <X size={16} />{" "}
        </button>
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 whitespace-pre-wrap">
          {course.name}
        </h1>

        {/* Status */}
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            course.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {course.status}
        </span>

        {/* About */}
        <p className="text-gray-600 mt-6 leading-relaxed text-justify whitespace-pre-wrap">
          {course.about}
        </p>

        {/* Fee */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-blue-600">
            কোর্স ফিঃ ৳ {course.fee}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseDetails;
