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
import { Link } from "react-router-dom";

const Club = () => {
  const ClubList = [
    {
      id: "1",
      name: "আল-খোয়ারিজমি টেক ল্যাব",
      title: "স্মার্ট ভবিষ্যতের জন্য মেধা উন্নয়ন",
      icon: Boxes,
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      textColor: "text-blue-600",
      members: 245,
      activities: "সাপ্তাহিক কোডিং সেশন",
      description: "প্রযুক্তি ও প্রোগ্রামিংয়ে দক্ষতা উন্নয়ন",
    },
    {
      id: "2",
      name: "ইবনে আল-হাইসাম বিজ্ঞান ক্লাব",
      title: "যেখানে জ্ঞান শক্তিতে রূপান্তরিত হয়",
      icon: Microscope,
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      textColor: "text-purple-600",
      members: 189,
      activities: "গবেষণা ও পরীক্ষা",
      description: "বৈজ্ঞানিক গবেষণা ও উদ্ভাবন",
    },
    {
      id: "3",
      name: "ইকো স্পোকেন ক্লাব",
      title: "আজ শিখুন, আগামীকাল নেতৃত্ব দিন",
      icon: MessageSquare,
      color: "from-emerald-500 to-green-500",
      gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
      textColor: "text-emerald-600",
      members: 312,
      activities: "পাবলিক স্পিকিং ইভেন্ট",
      description: "ইংরেজি ও বাংলা বক্তৃতা দক্ষতা",
    },
    {
      id: "4",
      name: "সৃজনশীল আর্টস সোসাইটি",
      title: "যেখানে কল্পনা রূপ নেয়",
      icon: Palette,
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      textColor: "text-amber-600",
      members: 156,
      activities: "ওয়ার্কশপ ও প্রদর্শনী",
      description: "চারুকলা ও সৃজনশীলতা",
    },
    {
      id: "5",
      name: "স্পোর্টস ও ওয়েলনেস ক্লাব",
      title: "সুস্থ শরীরে সুস্থ মন",
      icon: Heart,
      color: "from-red-500 to-rose-500",
      gradient: "from-red-500/20 via-rose-500/10 to-transparent",
      textColor: "text-red-600",
      members: 278,
      activities: "ফিটনেস প্রোগ্রাম",
      description: "স্বাস্থ্যকর জীবনযাপন ও ক্রীড়া",
    },
    {
      id: "6",
      name: "সাহিত্য চক্র",
      title: "শব্দ যে বিশ্ব গড়ে",
      icon: BookOpen,
      color: "from-indigo-500 to-violet-500",
      gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
      textColor: "text-indigo-600",
      members: 134,
      activities: "বই আলোচনা",
      description: "সাহিত্য ও সাংস্কৃতিক অন্বেষণ",
    },
    {
      id: "7",
      name: "বিজনেস ইনোভেশন ক্লাব",
      title: "উদ্যোক্তা হয়ে উঠুন",
      icon: ChartNetwork,
      color: "from-[#3BD480] to-[#134C45]",
      gradient: "from-[#3BD480]/20 via-[#134C45]/10 to-transparent",
      textColor: "text-[#134C45]",
      members: 215,
      activities: "স্টার্টআপ ওয়ার্কশপ",
      description: "ব্যবসায়িক দক্ষতা ও উদ্ভাবন",
    },
    {
      id: "8",
      name: "আন্তর্জাতিক সম্পর্ক ক্লাব",
      title: "বিশ্বায়নের যুগে প্রস্তুত",
      icon: Globe,
      color: "from-teal-500 to-blue-500",
      gradient: "from-teal-500/20 via-blue-500/10 to-transparent",
      textColor: "text-teal-600",
      members: 178,
      activities: "মডেল ইউএন",
      description: "আন্তর্জাতিক বিষয় ও কূটনীতি",
    },
  ];

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
          {ClubList.map((club) => (
            <div
              key={club.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${club.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Top Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="relative z-10">
                {/* Icon Section */}
                <div className="mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${club.color} shadow-lg`}
                  >
                    <club.icon className="w-6 h-6 text-white" />
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
                      {club.description}
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
                        <p className="font-semibold text-white">
                          {club.members}+
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-white/10 rounded-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">কার্যক্রম</p>
                        <p className="font-medium text-white text-sm">
                          {club.activities}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <Link to={`/clubs/${club.id}`} className="block mt-4">
                    <button
                      className={`w-full group/btn flex items-center justify-between px-4 py-3 bg-gradient-to-r ${club.color} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:opacity-90 font-kalpurush`}
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

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 font-kalpurush">
            আপনার উপযুক্ত ক্লাব খুঁজে পান
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto font-kalpurush">
            আমাদের বিশেষায়িত ক্লাবগুলো আপনাকে আপনার আগ্রহ অনুযায়ী দক্ষতা
            উন্নয়নে সাহায্য করবে। আজই যোগ দিন এবং কমিউনিটির অংশ হোন।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#3BD480] text-white font-bold rounded-xl hover:bg-[#2da866] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30 font-kalpurush">
              নতুন ক্লাব তৈরির আবেদন
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 font-kalpurush">
              সকল ইভেন্ট দেখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
