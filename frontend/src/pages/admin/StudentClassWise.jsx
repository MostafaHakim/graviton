import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getClassById } from "../../store/features/auth/classesSlice";
import { getStudentsByClassId } from "../../store/features/auth/studentsSlice";
import { Delete, EyeIcon, Trash2, View } from "lucide-react";

const StudentClassWise = () => {
  const { classId } = useParams();
  const { class: selectClass } = useSelector((state) => state.classes);
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassById(classId));
  }, [classId, dispatch]);

  useEffect(() => {
    if (selectClass?.name) {
      dispatch(getStudentsByClassId(selectClass.name.toLowerCase()));
    }
  }, [selectClass, dispatch]);

  return (
    <div className="font-kalpurush p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">
          ক্লাসঃ {selectClass?.name}
        </h2>
      </div>

      {/* Student List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Student ID</th>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-left">Father Name</th>
              <th className="py-3 px-4 text-left">School/College</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {student.studentId}
                  </td>
                  <td className="py-3 px-4">{student.studentName}</td>
                  <td className="py-3 px-4">{student.fatherName}</td>
                  <td className="py-3 px-4">{student.schoolCollege}</td>
                  <td className="py-3 px-4 flex flex-row gap-4">
                    <Link to={student._id}>
                      <EyeIcon className="text-green-500" />
                    </Link>
                    <button onClick={() => alert("delete")}>
                      <Trash2 className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  কোনো ছাত্র পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentClassWise;
