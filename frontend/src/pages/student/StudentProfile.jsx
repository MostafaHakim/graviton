import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByStudentId } from "../../store/features/auth/studentsSlice";
import { checkExamByStudent } from "../../store/features/auth/attemptSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../store/features/auth/authSlice";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const studentId = user._id;

  const { student } = useSelector((state) => state.students);
  const { check } = useSelector((state) => state.attempt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!studentId) return;
    dispatch(getStudentsByStudentId(studentId));
    dispatch(checkExamByStudent(studentId));
  }, [studentId, dispatch]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-light text-gray-900 mb-2">
            No user found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please log in to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 lg:p-6 capitalize font-kalpurush">
      <div className="max-w-6xl mx-auto bg-white shadow-lg lg:rounded-xl p-6 pb-20  ">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 relative">
          {/* Profile Image */}
          <button
            onClick={() => {
              dispatch(logoutUser());
            }}
            className="lg:hidden absolute right-0 top-0 text-rose-500  cursor-pointer"
          >
            <LogOut size={16} />
          </button>
          <img
            src={student?.photo}
            alt="student"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />

          {/* Basic Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {student?.studentName}
            </h2>
            <p className="text-gray-500 lowercase">{student?.email}</p>
            <p className="text-gray-600 mt-1">
              Student ID:{" "}
              <span className="font-semibold">{student?.studentId}</span>
            </p>

            {/* Status */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                student?.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {student?.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Personal Information
            </h3>
            <p>
              <strong>Father:</strong> {student?.fatherName}
            </p>
            <p>
              <strong>Mother:</strong> {student?.motherName}
            </p>
            <p>
              <strong>Class:</strong> {student?.class}
            </p>
            <p>
              <strong>School/College:</strong> {student?.schoolCollege}
            </p>
            <p>
              <strong>Address:</strong> {student?.address}
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Contact Information
            </h3>
            <p>
              <strong>Mobile:</strong> {student.mobileNumber}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="lowercase">{student.email}</span>
            </p>
          </div>

          {/* Courses */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Enrolled Courses
            </h3>
            <ul className="list-disc ml-5">
              {student.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Payment Details
            </h3>
            <p>
              <strong>Payment Method:</strong> {student.paymentMethod}
            </p>
            <p>
              <strong>Transaction ID:</strong> {student.transactionId}
            </p>
            <p>
              <strong>Total Fee:</strong> ৳{student.totalFee}
            </p>
            <p>
              <strong>Discount:</strong> ৳{student.discount}
            </p>
            <p>
              <strong>Paid:</strong> ৳{student.cashPayment}
            </p>
            <p>
              <strong>Due:</strong> ৳{student.duePayment}
            </p>
            <p>
              <strong>Membership Card:</strong>{" "}
              {student.membershipCard ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">
            Exam Information
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-rose-50 p-4 rounded-lg shadow-sm">
            {check && check.length > 0 ? (
              check.map((exam) => {
                const percentage =
                  (exam.obtainedMarks / exam.paper?.totalMarks) * 100;

                const isPass = percentage >= 40;

                return (
                  <div
                    key={exam._id}
                    className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
                  >
                    {/* Pass / Fail Badge */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                        isPass
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isPass ? "PASS" : "FAIL"}
                    </span>

                    <h2 className="font-bold text-gray-800 text-lg">
                      {exam.paper?.title}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      Total Marks: {exam.paper?.totalMarks}
                    </p>

                    <p className="text-sm text-gray-600">
                      Obtained Marks: {exam.obtainedMarks}
                    </p>

                    <p className="text-sm text-gray-600">
                      Percentage: {percentage.toFixed(2)}%
                    </p>

                    <p className="text-sm text-gray-600">
                      Duration: {exam.paper?.duration} min
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      Attempt Date:{" "}
                      {new Date(exam.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No Exam Attempt Found</p>
            )}
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">
            Importent Links
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-rose-50 p-4 rounded-lg shadow-sm">
            <Link
              to="/student"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
            >
              Dashboard
            </Link>
            <Link
              to="/feedback"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
            >
              Feedback
            </Link>
            <Link
              to="/gallery"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
            >
              Gallery
            </Link>
            <Link
              to="/membership"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative"
            >
              Membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
