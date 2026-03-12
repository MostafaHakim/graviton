import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getClassById } from "../../store/features/auth/classesSlice";
import {
  deleteStudent,
  getStudentsByClassId,
  updateStudentStatus,
} from "../../store/features/auth/studentsSlice";
import {
  Eye,
  Trash2,
  Users,
  Search,
  ArrowLeft,
  ChevronRight,
  Loader2,
  GraduationCap,
  School,
  User,
  Download,
  Edit,
} from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

const StudentClassWise = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { class: selectClass, loading: classLoading } = useSelector(
    (state) => state.classes,
  );
  const { students, loading: studentsLoading } = useSelector(
    (state) => state.students,
  );
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    dispatch(getClassById(classId));
  }, [classId, dispatch]);

  useEffect(() => {
    if (selectClass?.name) {
      dispatch(getStudentsByClassId(selectClass.name.toLowerCase()));
    }
  }, [selectClass, dispatch]);

  const selectedStudent = students?.find(
    (student) => student._id === selectedStudentId,
  );

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteStudent(id));

    if (res.meta.requestStatus === "fulfilled") {
      console.log("fulfilled");
      await dispatch(getStudentsByClassId(selectClass.name.toLowerCase()));

      setShowDeleteModal(false);
      setSelectedStudentId(null);
    }
  };

  const handleUpdateStatus = async (id) => {
    const std = students.find((student) => student._id === id);

    const status = std.status === "active" ? "block" : "active";

    const res = await dispatch(updateStudentStatus({ status, id }));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getClassById(classId));
    }
  };

  // Filter students based on search
  const filteredStudents = students?.filter(
    (student) =>
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.schoolCollege?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (classLoading || studentsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm font-kalpurush">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span className="font-kalpurush">পিছনে</span>
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium font-kalpurush">
              ছাত্র তালিকা
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <Users className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2 font-kalpurush">
              ছাত্র তালিকা
            </h1>
            {selectClass && (
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap size={20} className="text-gray-500" />
                <span className="text-xl font-medium text-gray-900 font-kalpurush capitalize">
                  ক্লাসঃ {selectClass.name}
                </span>
              </div>
            )}

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <Users size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700 font-kalpurush">
                মোট ছাত্র: {students?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="নাম, আইডি বা স্কুল দ্বারা খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all font-kalpurush"
            />
          </div>

          <button
            onClick={() => {
              /* Implement export */
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors font-kalpurush"
          >
            <Download size={16} />
            এক্সপোর্ট
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    ছাত্র আইডি
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    ছাত্রের নাম
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    পিতার নাম
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    স্কুল/কলেজ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-kalpurush">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents && filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-kalpurush">
                        {student.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-kalpurush">
                        {student.fatherName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-kalpurush">
                        {student.schoolCollege}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Link
                            to={student._id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <Eye size={14} />
                            <span className="font-kalpurush">দেখুন</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(student._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                            <span className="font-kalpurush">মুছুন</span>
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(student._id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 ${student.status === "active" ? "bg-green-50 border border-green-200 text-green-700" : "bg-rose-50 border border-rose-200 text-rose-700"} text-xs font-medium rounded-lg hover:bg-red-100 transition-colors`}
                          >
                            <Edit size={14} />
                            <span className="capitalize">{student.status}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 font-kalpurush">
                          {searchTerm
                            ? "কোনো ছাত্র পাওয়া যায়নি"
                            : "কোনো ছাত্র নেই"}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 font-kalpurush">
                          {searchTerm
                            ? "আপনার সার্চের সাথে মিলে এমন কোনো ছাত্র নেই"
                            : "এই ক্লাসে এখনও কোনো ছাত্র যোগ করা হয়নি"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          {filteredStudents && filteredStudents.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-kalpurush">
                  মোট {filteredStudents.length} জন ছাত্র দেখানো হচ্ছে
                  {searchTerm && ` (${students.length} এর মধ্যে)`}
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-gray-500 hover:text-gray-700 transition-colors font-kalpurush"
                  >
                    সার্চ ক্লিয়ার
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {students && students.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900">
                    {students.length}
                  </div>
                  <div className="text-sm text-gray-500 font-kalpurush">
                    মোট ছাত্র
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-sm text-gray-500 font-kalpurush">
                    ছেলে
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <School size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900">—</div>
                  <div className="text-sm text-gray-500 font-kalpurush">
                    স্কুল
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedStudent && (
        <DeleteModal
          title={`আপনি কি ${selectedStudent?.studentName} কে ডিলিট করতে চান`}
          message="আপনি কি নিশ্চিত যে এই ছাত্রকে মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।"
          onDelete={handleDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedStudentId(null);
          }}
          id={selectedStudentId}
        />
      )}
    </div>
  );
};

export default StudentClassWise;
