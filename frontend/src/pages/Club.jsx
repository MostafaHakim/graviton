import {
  Boxes,
  ChartNetwork,
  Combine,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Microscope,
  MessageSquare,
  Globe,
  Palette,
  Heart,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClubs } from "../store/features/auth/clubSlice";

const Club = () => {
  const { clubs } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  return (
    <div className="min-h-screen   px-4 sm:px-6 lg:px-8 relative max-w-365 mx-auto">
      <div className=" mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-kalpurush font-bold mb-4">
              আমাদের
            </h1>
            <span className="block text-[#3BD480] text-4xl md:text-5xl lg:text-6xl  font-kalpurush font-bold mb-4">
              এক্সক্লুসিভ ক্লাবসমূহ
            </span>
          </div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            বিভিন্ন আগ্রহ ও দক্ষতা উন্নয়নের জন্য আমাদের বিশেষায়িত ক্লাবগুলোতে
            যোগ দিন। শেখার সাথে বন্ধুত্ব এবং সৃজনশীলতা মিলিয়ে অভিজ্ঞতা তৈরি
            করুন।
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white">১০+</div>
            <div className="text-white/70 font-kalpurush">ক্লাব</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white">১৫০০+</div>
            <div className="text-white/70 font-kalpurush">সদস্য</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white">৫০+</div>
            <div className="text-white/70 font-kalpurush">মাসিক ইভেন্ট</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white">১০০%</div>
            <div className="text-white/70 font-kalpurush">সক্রিয় কমিউনিটি</div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Top Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="relative z-10">
                {/* Icon Section */}
                <div className="mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-[#183439] to-[#23835F] shadow-lg`}
                  >
                    <Boxes className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                  <div>
                    <h3
                      className={`text-lg font-bold text-white mb-2 font-kalpurush`}
                    >
                      {club.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed font-kalpurush">
                      {club.tech}
                    </p>
                  </div>

                  {/* Club Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-white/10 rounded-lg">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">সদস্য</p>
                        <p className="font-semibold text-white">150+</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-white/10 rounded-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">কার্যক্রম</p>
                        <p className="font-medium text-white text-sm">
                          {club.activity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <Link to={club._id} className="block mt-4">
                    <button
                      className={`w-full group/btn flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#183439] to-[#23835F] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:opacity-90 font-kalpurush`}
                    >
                      <span>ক্লাবে যান</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-[#3BD480] rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Club;
