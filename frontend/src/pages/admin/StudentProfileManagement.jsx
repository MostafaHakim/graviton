import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createPayment,
  getStudentsByStudentId,
} from "../../store/features/auth/studentsSlice";
import { checkExamByStudent } from "../../store/features/auth/attemptSlice";
import { useState } from "react";
import GetStudentPaymentModal from "../../components/GetStudentPaymentModal";
import { toast } from "react-toastify";
import IdCard from "../../components/IdCard";

const StudentProfileManagement = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const { studentId } = useParams();
  const { student } = useSelector((state) => state.students);
  const { check } = useSelector((state) => state.attempt);
  const [showModal, setShowModal] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!studentId) return;
    dispatch(getStudentsByStudentId(studentId));
    dispatch(checkExamByStudent(studentId));
  }, [studentId, dispatch]);

  const handelSubmil = async (formData) => {
    const res = await dispatch(createPayment(formData));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Payment Received Successfully");
      await dispatch(getStudentsByStudentId(studentId));
    }
  };

  if (!student) {
    return <div>No Student Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 capitalize font-kalpurush relative">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 relative">
        <button
          onClick={() => setShowIdCard(true)}
          className="cursor-pointer transition-all duration-300 absolute top-0 right-0 px-6 py-1 border-2 rounded-full font-bold text-[#144F46] border-[#144F46] m-6 hover:bg-[#144F46] hover:text-white "
        >
          Id Card
        </button>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          {/* Profile Image */}
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
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                      <th className="px-4 py-3 border">Date</th>
                      <th className="px-4 py-3 border">Amount</th>
                      <th className="px-4 py-3 border">Type</th>
                      <th className="px-4 py-3 border">Received By</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm text-gray-700">
                    {student && student.afterPayment.length > 0 ? (
                      student.afterPayment.map((payment, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-2 border">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-2 border font-semibold text-green-600">
                            ৳ {payment.paymentAmount}
                          </td>

                          <td className="px-4 py-2 border capitalize">
                            {payment.paymentType}
                          </td>

                          <td className="px-4 py-2 border">
                            {payment.receivedBy?.username || "N/A"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-4 text-gray-500"
                        >
                          No Payment History Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mt-2"
              >
                Add Payment
              </button>
            </div>
          </div>
          {/* Payment Info */}
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
      </div>
      {showModal && (
        <div className="absolute top-0 left-0 right-0">
          <GetStudentPaymentModal
            onClose={() => {
              setShowModal(false);
            }}
            onSubmit={handelSubmil}
            receivedBy={user?._id}
            id={studentId && studentId}
          />
        </div>
      )}
      {showIdCard && (
        <div className="absolute top-0 left-0 right-0">
          <IdCard student={student} />
        </div>
      )}
    </div>
  );
};

export default StudentProfileManagement;
