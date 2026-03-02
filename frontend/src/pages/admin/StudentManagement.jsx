// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getClasses } from "../../store/features/auth/classesSlice";
// import { Link } from "react-router-dom";

// const StudentManagement = () => {
//   const { classes } = useSelector((state) => state.classes);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getClasses());
//   }, [dispatch]);
//   return (
//     <div className="flex flex-col space-y-4 font-kalpurush p-8 bg-white rounded-2xl min-h-screen">
//       <h2 className="text-center text-2xl"> ক্লাস মেনেজমেন্ট</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center">
//         {classes.map((cls, i) => (
//           <Link
//             to={cls._id}
//             key={i}
//             className="border rounded px-4 py-2 capitalize font-kalpurush hover:scale-105 transition-all duration-300"
//           >
//             <h2>{cls.name}</h2>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentManagement;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/features/auth/classesSlice";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  ChevronRight,
  Loader2,
  Users,
} from "lucide-react";

const StudentManagement = () => {
  const { classes, loading } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
          <p className="text-gray-600 text-sm">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <Users className="w-10 h-10 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2 font-kalpurush">
              স্টুডেন্ট ম্যানেজমেন্ট
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl">
              Select a class to manage students and view class details
            </p>

            {/* Stats Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <GraduationCap size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700 font-kalpurush">
                মোট ক্লাস: {classes?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gray-800 rounded-full"></div>
          <h2 className="text-2xl font-medium text-gray-800 font-kalpurush">
            ক্লাস ম্যানেজমেন্ট
          </h2>
        </div>

        {/* Classes Grid */}
        {classes && classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {classes.map((cls, i) => (
              <Link
                to={cls._id}
                key={cls._id || i}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Class Icon */}
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                    <span className="text-2xl font-light text-gray-600 capitalize">
                      {cls.name?.charAt(0) || "C"}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize font-kalpurush">
                    {cls.name}
                  </h3>

                  <div className="w-12 h-0.5 bg-gray-200 rounded-full mb-4"></div>

                  <div className="inline-flex items-center gap-2 text-sm text-gray-500 group-hover/link:text-gray-700 transition-colors">
                    <span className="font-kalpurush">ক্লাস দেখুন</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-kalpurush">
                কোনো ক্লাস নেই
              </h3>
              <p className="text-gray-500 text-sm mb-6 font-kalpurush">
                এখনও কোনো ক্লাস তৈরি করা হয়নি
              </p>
            </div>
          </div>
        )}

        {/* Quick Info Section */}
        {classes && classes.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">
                      {classes.length}
                    </div>
                    <div className="text-sm text-gray-500 font-kalpurush">
                      মোট ক্লাস
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">—</div>
                    <div className="text-sm text-gray-500 font-kalpurush">
                      মোট শিক্ষার্থী
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gray-900">—</div>
                    <div className="text-sm text-gray-500 font-kalpurush">
                      সক্রিয় ক্লাস
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
