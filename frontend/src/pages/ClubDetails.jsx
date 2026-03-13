// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getClubById, getClubNotice } from "../store/features/auth/clubSlice";

// const ClubDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { club, notices, loading, error } = useSelector((state) => state.clubs);

//   useEffect(() => {
//     if (id) {
//       dispatch(getClubById(id));
//       dispatch(getClubNotice(id));
//     }
//   }, [dispatch, id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (!club) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Club not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h1 className="text-3xl font-bold mb-4">{club.name}</h1>
//       <p className="text-gray-700 mb-2">
//         <strong>Technology:</strong> {club.tech || "N/A"}
//       </p>
//       <p className="text-gray-700 mb-2">
//         <strong>Activity:</strong> {club.activity || "N/A"}
//       </p>

//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Events</h2>
//         {notices && notices.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//             {notices.map((n) => (
//               <Link
//                 to={n._id}
//                 key={n._id}
//                 className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition font-kalpurush"
//               >
//                 {n.imageUrl && (
//                   <img
//                     src={n.imageUrl}
//                     alt={n.title}
//                     className="w-full h-48 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 {n.videoUrl && (
//                   <video
//                     src={n.videoUrl}
//                     controls
//                     className="w-full h-48 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 <h3 className="text-xl font-semibold">{n.title}</h3>
//                 {n.subtitle && <p className="text-gray-500">{n.subtitle}</p>}
//                 <p className="text-gray-700 mt-2 line-clamp-4">
//                   {n.discription}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No notices</p>
//         )}
//       </div>

//       {/* <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Contents</h2>
//         {club.content && club.content.length > 0 ? (
//           <ul className="list-disc ml-5 text-gray-700">
//             {club.content.map((c) => (
//               <li key={c._id}>{c.title || c._id}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400">No content</p>
//         )}
//       </div>  */}
//     </div>
//   );
// };

// export default ClubDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getClubById, getClubNotice } from "../store/features/auth/clubSlice";
import {
  Calendar,
  Users,
  Activity,
  ChevronLeft,
  Clock,
  MapPin,
  ArrowRight,
  FileText,
  Video,
  Image as ImageIcon,
} from "lucide-react";

const ClubDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { club, notices, loading, error } = useSelector((state) => state.clubs);

  useEffect(() => {
    if (id) {
      dispatch(getClubById(id));
      dispatch(getClubNotice(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-[#183439] to-[#23835F] shadow-lg mb-4">
            <Activity className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-white/80 font-kalpurush text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center max-w-md">
          <p className="text-red-400 text-lg mb-4 font-kalpurush">{error}</p>
          <Link
            to="/clubs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#183439] to-[#23835F] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 font-kalpurush"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ক্লাবে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center max-w-md">
          <p className="text-white/80 text-lg mb-4 font-kalpurush">
            ক্লাব পাওয়া যায়নি
          </p>
          <Link
            to="/clubs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#183439] to-[#23835F] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 font-kalpurush"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ক্লাবে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a1f] via-[#0e2429] to-[#12352e]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to="/clubs"
          className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-white/80 hover:text-white transition-colors duration-300 font-kalpurush group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>সকল ক্লাব</span>
        </Link>

        {/* Club Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent"></div>

          {/* Top Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-kalpurush">
                  {club.name}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-2">
                    <div className="p-1.5 bg-gradient-to-br from-[#183439] to-[#23835F] rounded-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">সদস্য</p>
                      <p className="font-semibold text-white">১৫০+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-2">
                    <div className="p-1.5 bg-gradient-to-br from-[#183439] to-[#23835F] rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">ইভেন্ট</p>
                      <p className="font-semibold text-white">
                        {notices?.length || 0}টি
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Club Stats Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-white/70 text-sm mb-3 font-kalpurush">
                  ক্লাব তথ্য
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-[#3BD480]" />
                    <div>
                      <p className="text-xs text-white/50">টেকনোলজি</p>
                      <p className="text-white font-medium">
                        {club.tech || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#3BD480]" />
                    <div>
                      <p className="text-xs text-white/50">কার্যক্রম</p>
                      <p className="text-white font-medium">
                        {club.activity || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notices/Events Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-kalpurush">
              ইভেন্ট ও নোটিশ
            </h2>
            <span className="text-white/50 text-sm">
              {notices?.length || 0}টি ইভেন্ট
            </span>
          </div>

          {notices && notices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice, index) => (
                <Link
                  to={notice._id}
                  key={notice._id}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-[#3BD480]/50 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Top Ribbon */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  <div className="relative z-10">
                    {/* Media Section */}
                    {notice.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={notice.imageUrl}
                          alt={notice.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-lg">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    {notice.videoUrl && (
                      <div className="relative h-48 overflow-hidden bg-black/30">
                        <video
                          src={notice.videoUrl}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-3 bg-gradient-to-br from-[#183439] to-[#23835F] rounded-full">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 font-kalpurush line-clamp-2">
                        {notice.title}
                      </h3>
                      {notice.subtitle && (
                        <p className="text-white/70 text-sm mb-3 font-kalpurush">
                          {notice.subtitle}
                        </p>
                      )}
                      {notice.discription && (
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
                          {notice.discription}
                        </p>
                      )}

                      {/* Read More Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <span className="text-sm text-white/50 font-kalpurush">
                          বিস্তারিত দেখুন
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform group-hover:text-[#3BD480]" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-[#3BD480] rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#183439] to-[#23835F] shadow-lg mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <p className="text-white/60 text-lg font-kalpurush">
                কোন ইভেন্ট বা নোটিশ নেই
              </p>
              <p className="text-white/40 text-sm mt-2 font-kalpurush">
                শীঘ্রই নতুন ইভেন্ট আসছে
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm font-kalpurush">
            নিয়মিত আপডেট পেতে ক্লাবের সাথে সংযুক্ত থাকুন
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
