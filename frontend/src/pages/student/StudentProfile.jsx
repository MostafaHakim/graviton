import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsByStudentId,
  updatePassword,
  updateStudent,
} from "../../store/features/auth/studentsSlice";
import { checkExamByStudent } from "../../store/features/auth/attemptSlice";
import { Link, useNavigate } from "react-router-dom";
import { Edit, LogOut, Save, User, Camera, X, Loader } from "lucide-react";
import { logoutUser } from "../../store/features/auth/authSlice";
import ChangePassword from "../../components/ChangePassword";
import { toast } from "react-toastify";
import uploadPhotoToCloudinary from "../../utils/cloudinery";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const studentId = user?._id;

  const [showSetModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editData, setEditData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    class: "",
    schoolCollege: "",
    address: "",
    mobileNumber: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const { student, loading } = useSelector((state) => state.students);
  const { check } = useSelector((state) => state.attempt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!studentId) return;
    dispatch(getStudentsByStudentId(studentId));
    dispatch(checkExamByStudent(studentId));
  }, [studentId, dispatch]);

  // Initialize edit data when student loads
  useEffect(() => {
    if (student && edit) {
      setEditData({
        studentName: student.studentName || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        class: student.class || "",
        schoolCollege: student.schoolCollege || "",
        address: student.address || "",
        mobileNumber: student.mobileNumber || "",
      });
    }
  }, [student, edit]);

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only image files are allowed (JPEG, PNG, WEBP, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setSelectedPhoto(file);
  };

  const handleUpdateStudent = async () => {
    setUploading(true);

    try {
      let photoUrl = student?.photo;
      let publicId = student?.public_id;

      // Upload new photo to Cloudinary if selected
      if (selectedPhoto) {
        toast.info("Uploading photo...");
        const cloudinaryResult = await uploadPhotoToCloudinary(
          selectedPhoto,
          "image",
        );

        if (cloudinaryResult && cloudinaryResult.url) {
          photoUrl = cloudinaryResult.url;
          publicId = cloudinaryResult.public_id;
          toast.success("Photo uploaded successfully!");
        } else {
          toast.error("Failed to upload photo. Using existing photo.");
        }
      }

      // Prepare data for update
      const updatePayload = {
        ...editData,
        photo: photoUrl,
        public_id: publicId,
      };

      // Send update to backend
      const result = await dispatch(
        updateStudent({
          formData: updatePayload,
          id: studentId,
        }),
      );

      if (result.meta.requestStatus === "fulfilled") {
        setEdit(false);
        setSelectedPhoto(null);
        setPhotoPreview(null);
        // Refresh student data
        await dispatch(getStudentsByStudentId(studentId));
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    } finally {
      setUploading(false);
    }
  };

  const handelUpdatePassword = async (formData) => {
    const res = await dispatch(updatePassword({ formData, studentId }));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getStudentsByStudentId(studentId));
      setShowModal(false);
      toast.success("Password Update Successfully! Please Login Again");
      await dispatch(logoutUser());
    }
  };

  const cancelEdit = () => {
    setEdit(false);
    setSelectedPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      <div className="max-w-6xl mx-auto bg-white shadow-lg lg:rounded-xl p-6 pb-20 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 relative">
          <button
            onClick={() => dispatch(logoutUser())}
            className="lg:hidden absolute right-0 top-0 text-rose-500 cursor-pointer"
          >
            <LogOut size={16} />
          </button>

          {/* Profile Image with Edit Option */}
          <div className="relative group">
            <img
              src={photoPreview || student?.photo || "/default-avatar.png"}
              alt="student"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            {edit && !uploading && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors"
                  title="Change Photo"
                >
                  <Camera size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                  className="hidden"
                />
                {photoPreview && (
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      setPhotoPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-0 right-0 bg-red-500 p-1 rounded-full text-white hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Loader className="animate-spin text-white" size={24} />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left flex-1">
            {edit ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    name="studentName"
                    value={editData.studentName}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-md px-3 py-1 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Student Name"
                    disabled={uploading}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center md:justify-start space-x-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {student?.studentName}
                </h2>
              </div>
            )}
            <p className="text-gray-500 lowercase">{student?.email}</p>
            <p className="text-gray-600 mt-1">
              Student ID:{" "}
              <span className="font-semibold">{student?.studentId}</span>
            </p>

            {/* Status */}
            <span
              className={`inline-block my-2 px-3 py-1 text-sm rounded-full ${
                student?.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {student?.status?.toUpperCase()}
            </span>
            <div className="md:absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white  rounded cursor-pointer text-sm"
              >
                Change Password
              </button>
              {edit ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleUpdateStudent}
                    className="bg-green-500 hover:bg-green-600 text-white roundede py-1"
                    disabled={uploading}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white roundede py-1"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white  rounded cursor-pointer text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid Section with Edit Mode */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Personal Information
            </h3>
            {edit ? (
              <div className="space-y-3">
                <div>
                  <label className="font-semibold">Father Name:</label>
                  <input
                    name="fatherName"
                    value={editData.fatherName}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label className="font-semibold">Mother Name:</label>
                  <input
                    name="motherName"
                    value={editData.motherName}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label className="font-semibold">Class:</label>
                  <input
                    name="class"
                    value={editData.class}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label className="font-semibold">School/College:</label>
                  <input
                    name="schoolCollege"
                    value={editData.schoolCollege}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label className="font-semibold">Address:</label>
                  <input
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                  />
                </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>Father:</strong> {student?.fatherName || "N/A"}
                </p>
                <p>
                  <strong>Mother:</strong> {student?.motherName || "N/A"}
                </p>
                <p>
                  <strong>Class:</strong> {student?.class || "N/A"}
                </p>
                <p>
                  <strong>School/College:</strong>{" "}
                  {student?.schoolCollege || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {student?.address || "N/A"}
                </p>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Contact Information
            </h3>
            {edit ? (
              <div>
                <label className="font-semibold">Mobile Number:</label>
                <input
                  name="mobileNumber"
                  value={editData.mobileNumber}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={uploading}
                />
              </div>
            ) : (
              <>
                <p>
                  <strong>Mobile:</strong> {student?.mobileNumber || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <span className="lowercase">{student?.email || "N/A"}</span>
                </p>
              </>
            )}
          </div>

          {/* Courses */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Enrolled Courses
            </h3>
            <ul className="list-disc ml-5">
              {student?.courses?.length > 0 ? (
                student.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))
              ) : (
                <li>No courses enrolled</li>
              )}
            </ul>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">
              Payment Details
            </h3>
            <p>
              <strong>Payment Method:</strong> {student?.paymentMethod || "N/A"}
            </p>
            <p>
              <strong>Transaction ID:</strong> {student?.transactionId || "N/A"}
            </p>
            <p>
              <strong>Total Fee:</strong> ৳{student?.totalFee || 0}
            </p>
            <p>
              <strong>Discount:</strong> ৳{student?.discount || 0}
            </p>
            <p>
              <strong>Paid:</strong> ৳{student?.cashPayment || 0}
            </p>
            <p>
              <strong>Due:</strong> ৳{student?.duePayment || 0}
            </p>
            <p>
              <strong>Membership Card:</strong>{" "}
              {student?.membershipCard ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Exam Information */}
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

        {/* Important Links */}
        <div className="mt-6 block lg:hidden bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">
            Important Links
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-rose-50 p-4 rounded-lg shadow-sm">
            <Link
              to="/student"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative hover:shadow-lg transition-shadow"
            >
              Dashboard
            </Link>
            <Link
              to="/feedback"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative hover:shadow-lg transition-shadow"
            >
              Feedback
            </Link>
            <Link
              to="/gallery"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative hover:shadow-lg transition-shadow"
            >
              Gallery
            </Link>
            <Link
              to="/membership"
              className="col-span-1 bg-white p-4 rounded-lg shadow-md border relative hover:shadow-lg transition-shadow"
            >
              Membership
            </Link>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showSetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <ChangePassword
            handelUpdatePassword={handelUpdatePassword}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
