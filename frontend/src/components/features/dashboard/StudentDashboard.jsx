import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkExamByStudent } from "../../../store/features/auth/attemptSlice";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { check } = useSelector((state) => state.attempt);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user._id) return;
    dispatch(checkExamByStudent(user._id));
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white p-4 font-kalpurush rounded-2xl">
      <div className="">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
                স্বাগতম, <span className="capitalize">{user.studentName}</span>{" "}
                !
              </h1>
              <p className="text-gray-600 mt-2">
                আপনার শিক্ষা যাত্রায় এগিয়ে যান
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Course Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  কোর্সসমূহ{" "}
                  <span className="py-2 px-4 text-sm lg:text-md rounded-full border border-blue-600 text-blue-600 ml-4">
                    {user && user.courses.length}
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                আপনার এনরোলকৃত কোর্স এবং শিক্ষণ সামগ্রী অ্যাক্সেস করুন
              </p>
              <div className="flex flex-col space-y-2">
                {user &&
                  user.courses.map((cours) => (
                    <p
                      key={cours._id}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition capitalize"
                    >
                      {cours}
                    </p>
                  ))}
              </div>
            </div>

            {/* Assignment Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-2 lg:p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 flex flex-row">
                  পরিক্ষায় সমূহ{" "}
                  <span className="py-2 px-4 text-sm lg:text-md rounded-full border border-green-600 text-green-600 ml-4">
                    {check && check.length}
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                আপনি যে সকল পরিক্ষায় অংশগ্রহন করেছেন
              </p>
              <div className="flex flex-col space-y-2">
                {check &&
                  check.map((exam) => (
                    <p className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      {exam.paper.title}
                    </p>
                  ))}
              </div>
            </div>

            {/* Grades Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">পেমেন্ট</h3>
              </div>
              <p className="text-gray-600 mb-4">আপনার পেমেন্ট এবং বকেয়া</p>
              <div className="flex flex-col space-y-2">
                {user && (
                  <div className="flex flex-col space-y-2">
                    <p className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      মোটঃ {user.cashPayment} টাকা
                    </p>
                    <p className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      ডিস্কাউন্টঃ {user.discount} টাকা
                    </p>
                    <p className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      বকেয়াঃ {user.duePayment} টাকা
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
