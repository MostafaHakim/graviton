// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getSingleNotice } from "../store/features/auth/clubSlice";

// const SingleNotice = () => {
//   const { noticeId } = useParams();
//   const dispatch = useDispatch();

//   const { notice, loading } = useSelector((state) => state.clubs);

//   useEffect(() => {
//     if (noticeId) {
//       dispatch(getSingleNotice(noticeId));
//     }
//   }, [noticeId, dispatch]);
//   console.log(notice);
//   if (loading) {
//     return <div className="text-center p-10">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-justify">
//       {/* Notice Card */}
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden ">
//         <h1 className="text-3xl font-bold text-gray-800 p-4">
//           {notice?.title}
//         </h1>
//         {/* Image */}
//         {notice?.imageUrl && (
//           <img
//             src={notice?.imageUrl}
//             alt={notice?.title}
//             className="w-full h-[400px] object-cover"
//           />
//         )}

//         {/* Video */}
//         {notice?.videoUrl && (
//           <video
//             src={notice?.videoUrl}
//             controls
//             className="w-full h-[400px] object-cover"
//           />
//         )}

//         {/* Content */}
//         <div className="p-6 space-y-4">
//           {notice?.subtitle && (
//             <p className="text-lg text-gray-500">{notice?.subtitle}</p>
//           )}

//           <div className="border-t pt-4">
//             <p className="text-gray-700 leading-relaxed">
//               {notice?.discription}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleNotice;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleNotice } from "../store/features/auth/clubSlice";
import {
  Calendar,
  ChevronLeft,
  Clock,
  User,
  Share2,
  Download,
  Eye,
  Heart,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

const SingleNotice = () => {
  const { noticeId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notice, loading } = useSelector((state) => state.clubs);

  useEffect(() => {
    if (noticeId) {
      dispatch(getSingleNotice(noticeId));
    }
  }, [noticeId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-[#183439] to-[#23835F] shadow-lg mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 font-kalpurush text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }
  console.log(notice);
  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center max-w-md">
          <p className="text-white/80 text-lg mb-4 font-kalpurush">
            নোটিশ পাওয়া যায়নি
          </p>
          <Link
            to={`/club/${id}`}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#183439] to-[#23835F] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 font-kalpurush"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ক্লাবে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a1a1f] via-[#0e2429] to-[#12352e]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to={`/club/${id}`}
          className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-white/80 hover:text-white transition-colors duration-300 font-kalpurush group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>ক্লাবে ফিরে যান</span>
        </Link>

        {/* Main Notice Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden relative group">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Top Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10">
            {/* Header Section */}
            <div className="p-6 md:p-8 border-b border-white/20">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-1.5">
                  <Calendar className="w-4 h-4 text-[#3BD480]" />
                  <span className="text-white/80 text-sm">
                    {new Date(notice?.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-1.5">
                  <Clock className="w-4 h-4 text-[#3BD480]" />
                  <span className="text-white/80 text-sm">
                    {new Date(notice?.createdAt).toLocaleTimeString("bn-BD", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-1.5">
                  <User className="w-4 h-4 text-[#3BD480]" />
                  <span className="text-white/80 text-sm">অ্যাডমিন</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-kalpurush leading-relaxed">
                {notice?.title}
              </h1>

              {/* Subtitle */}
              {notice?.subtitle && (
                <p className="text-lg text-white/70 font-kalpurush border-l-4 border-[#3BD480] pl-4">
                  {notice?.subtitle}
                </p>
              )}
            </div>

            {/* Media Section */}
            {(notice?.imageUrl || notice?.videoUrl) && (
              <div className="relative overflow-hidden bg-black/30">
                {notice?.imageUrl && (
                  <div className="relative group/image">
                    <img
                      src={notice?.imageUrl}
                      alt={notice?.title}
                      className="w-full max-h-[500px] object-contain mx-auto"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Actions */}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-[#23835F] transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-[#23835F] transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                )}

                {notice?.videoUrl && (
                  <div className="relative">
                    <video
                      src={notice?.videoUrl}
                      controls
                      className="w-full max-h-[500px] object-contain mx-auto"
                      poster={notice?.imageUrl}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 md:p-8">
              {/* Description */}
              {notice?.discription && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/90 leading-relaxed text-justify whitespace-pre-line font-kalpurush text-lg">
                    {notice?.discription}
                  </p>
                </div>
              )}

              {/* Engagement Section */}
            </div>

            {/* Footer Navigation */}
            <div className="p-6 md:p-8 bg-black/20 border-t border-white/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#183439] to-[#23835F] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 font-kalpurush group/btn w-full sm:w-auto justify-center"
                >
                  <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  <span>অন্যান্য ইভেন্ট</span>
                </button>

                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 font-kalpurush w-full sm:w-auto justify-center"
                >
                  <span>উপরে যান</span>
                  <ChevronLeft className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 border-2 border-[#3BD480] rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
        </div>

        {/* Related Notices Section (Optional - يمكنك إضافته إذا كان متاحًا) */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4 font-kalpurush">সম্পর্কিত নোটিশ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            Add related notices here
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SingleNotice;
