import React, { useEffect } from "react";
import {
  Target,
  Users,
  Award,
  Heart,
  BookOpen,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../store/features/auth/aboutSlice";

const About = () => {
  const { abouts, loading } = useSelector((state) => state.abouts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  const values = [
    {
      icon: Target,
      title: "আমাদের লক্ষ্য",
      description:
        "প্রযুক্তি শিক্ষার মাধ্যমে প্রতিটি শিক্ষার্থীকে দক্ষ করে গড়ে তোলা এবং তাদের ক্যারিয়ার গঠনে সহায়তা করা।",
    },
    {
      icon: Heart,
      title: "আমাদের অঙ্গীকার",
      description:
        "মানসম্মত শিক্ষা প্রদান এবং প্রতিটি শিক্ষার্থীর সাফল্য নিশ্চিত করতে নিরলসভাবে কাজ করা।",
    },
    {
      icon: Shield,
      title: "গুণগত মান",
      description:
        "আধুনিক প্রযুক্তি ও অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে সর্বোচ্চ মানের শিক্ষা নিশ্চিত করা।",
    },
    {
      icon: TrendingUp,
      title: "আমাদের অগ্রগতি",
      description:
        "প্রতিনিয়ত নতুন নতুন কোর্স ও প্রযুক্তি যুক্ত করে শিক্ষার মান উন্নয়ন করা।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#134C45] to-[#0d362f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-kalpurush">
            আমাদের সম্পর্কে
          </h1>
          <div className="w-20 h-1 bg-[#3BD480] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-3 text-base font-kalpurush max-w-2xl mx-auto">
            গ্র্যাভিটন একাডেমি - প্রযুক্তি শিক্ষায় নতুন দিগন্তের সূচনা
          </p>
        </div>

        {/* Our Values Section */}
        {abouts &&
          abouts.map((ab) => (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-kalpurush">
                {ab.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ab?.valus?.map((value, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
                    <div className="relative z-10 p-6 pt-12">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#3BD480] rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#134C45] font-kalpurush">
                          {value.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 font-kalpurush whitespace-pre-wrap">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default About;
