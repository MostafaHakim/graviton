// import { useSelector } from "react-redux";

// const StudentDashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log(user);
//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-white p-4 font-kalpurush">
//       <div className="">
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 capitalize">
//                 স্বাগতম, {user.username} !
//               </h1>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 bg-blue-100 rounded-lg mr-4">
//                   <svg
//                     className="w-6 h-6 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800">কোর্স</h3>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 Access your enrolled courses and learning materials
//               </p>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                 View Courses
//               </button>
//             </div>

//             <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 bg-green-100 rounded-lg mr-4">
//                   <svg
//                     className="w-6 h-6 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   Assignments
//                 </h3>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 Check assignments and submit your work
//               </p>
//               <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//                 View Assignments
//               </button>
//             </div>

//             <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 bg-purple-100 rounded-lg mr-4">
//                   <svg
//                     className="w-6 h-6 text-purple-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800">Grades</h3>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 View your grades and academic progress
//               </p>
//               <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
//                 Check Grades
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Recent Activities
//           </h2>
//           <div className="space-y-4">
//             {[
//               "Mathematics Assignment Submitted",
//               "Physics Class Attended",
//               "Chemistry Lab Completed",
//               "English Essay Graded",
//             ].map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition"
//               >
//                 <div className="w-3 h-3 bg-student rounded-full mr-4"></div>
//                 <div className="flex-1">
//                   <p className="text-gray-800">{activity}</p>
//                   <p className="text-sm text-gray-500">2 hours ago</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white p-4 font-kalpurush rounded-2xl">
      <div className="">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
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
                  কোর্সসমূহ
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                আপনার এনরোলকৃত কোর্স এবং শিক্ষণ সামগ্রী অ্যাক্সেস করুন
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                কোর্স দেখুন
              </button>
            </div>

            {/* Assignment Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
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
                <h3 className="text-xl font-semibold text-gray-800">
                  অ্যাসাইনমেন্ট
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                অ্যাসাইনমেন্ট চেক করুন এবং আপনার কাজ জমা দিন
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                অ্যাসাইনমেন্ট দেখুন
              </button>
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
                <h3 className="text-xl font-semibold text-gray-800">গ্রেড</h3>
              </div>
              <p className="text-gray-600 mb-4">
                আপনার গ্রেড এবং একাডেমিক অগ্রগতি দেখুন
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                গ্রেড চেক করুন
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            সাম্প্রতিক কার্যক্রম
          </h2>
          <div className="space-y-4">
            {[
              {
                activity: "গণিত অ্যাসাইনমেন্ট জমা দেওয়া হয়েছে",
                time: "২ ঘণ্টা আগে",
              },
              {
                activity: "পদার্থবিজ্ঞান ক্লাসে অংশগ্রহণ",
                time: "৩ ঘণ্টা আগে",
              },
              {
                activity: "রসায়ন ল্যাব সম্পন্ন হয়েছে",
                time: "৫ ঘণ্টা আগে",
              },
              {
                activity: "ইংরেজি রচনা গ্রেডেড হয়েছে",
                time: "১ দিন আগে",
              },
              {
                activity: "জীববিজ্ঞান কুইজ দেওয়া হয়েছে",
                time: "২ দিন আগে",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-gray-800">{item.activity}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">০৫</p>
                <p className="text-gray-600">এনরোলকৃত কোর্স</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">১২</p>
                <p className="text-gray-600">সম্পন্ন অ্যাসাইনমেন্ট</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">৮৫%</p>
                <p className="text-gray-600">সামগ্রিক স্কোর</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
