import React from "react";
import {
  Users,
  Award,
  BookOpen,
  Star,
  GraduationCap,
  Clock,
  MessageSquare,
  Sparkles,
  Trophy,
  Globe,
  Heart,
  Calendar,
  Zap,
  Target,
  Lightbulb,
  Shield,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

const TeachersPage = () => {
  const teachers = [
    {
      id: 1,
      name: "প্রফেসর ড. আহসান হাবীব",
      photoUrl: "https://picsum.photos/200/300",
      designation: "গণিত বিভাগ প্রধান",
      experience: "১৫+ বছর",
      qualification: "পিএইচডি (গণিত), ঢাকা বিশ্ববিদ্যালয়",
      specialization: ["গণিত", "স্ট্যাটিস্টিকস", "এসএটি ম্যাথ"],
      achievements: "জাতীয় শিক্ষা পুরস্কার ২০২২",
      rating: 4.9,
      students: 1200,
      imageColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      icon: "🧮",
    },
    {
      id: 2,
      name: "ড. ফাতেমা জাহান",
      photoUrl: "https://picsum.photos/200/300",
      designation: "ইংরেজি বিভাগ প্রধান",
      experience: "১২+ বছর",
      qualification: "পিএইচডি (ইংরেজি সাহিত্য), ঢাকা বিশ্ববিদ্যালয়",
      specialization: ["আইইএলটিএস", "স্পোকেন ইংলিশ", "গ্রামার"],
      achievements: "সেরা আইইএলটিএস ট্রেইনার ২০২৩",
      rating: 4.8,
      students: 1500,
      imageColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      icon: "🇬🇧",
    },
    {
      id: 3,
      name: "মোঃ রফিকুল ইসলাম",
      photoUrl: "https://picsum.photos/200/300",
      designation: "বিজ্ঞান বিভাগ প্রধান",
      experience: "১০+ বছর",
      qualification: "এমএসসি (পদার্থ বিজ্ঞান), বুয়েট",
      specialization: ["পদার্থ বিজ্ঞান", "রসায়ন", "জীববিজ্ঞান"],
      achievements: "বিজ্ঞান মেলা ২০২৩ চ্যাম্পিয়ন",
      rating: 4.7,
      students: 900,
      imageColor: "bg-gradient-to-br from-emerald-500 to-green-500",
      textColor: "text-emerald-600",
      icon: "🔬",
    },
    {
      id: 4,
      name: "সামিয়া ইসলাম",
      photoUrl: "https://picsum.photos/200/300",
      designation: "কম্পিউটার বিভাগ প্রধান",
      experience: "৮+ বছর",
      qualification: "এমএসসি (কম্পিউটার সায়েন্স), নর্থ সাউথ ইউনিভার্সিটি",
      specialization: ["প্রোগ্রামিং", "গ্রাফিক ডিজাইন", "ডিজিটাল মার্কেটিং"],
      achievements: "সেরা টেক এডুকেটর ২০২৪",
      rating: 4.9,
      students: 800,
      imageColor: "bg-gradient-to-br from-amber-500 to-orange-500",
      textColor: "text-amber-600",
      icon: "💻",
    },
    {
      id: 5,
      name: "আনিসুর রহমান",
      photoUrl: "https://picsum.photos/200/300",
      designation: "আরবি বিভাগ প্রধান",
      experience: "১১+ বছর",
      qualification: "মাস্টার্স (আরবি), ইসলামী বিশ্ববিদ্যালয়",
      specialization: ["আরবি ব্যাকরণ", "কুরআন শিক্ষা", "দাখিল-আলিম"],
      achievements: "আন্তর্জাতিক আরবি প্রতিযোগিতা ২০২২",
      rating: 4.6,
      students: 600,
      imageColor: "bg-gradient-to-br from-red-500 to-rose-500",
      textColor: "text-red-600",
      icon: "🕌",
    },
    {
      id: 6,
      name: "তামান্না আক্তার",
      photoUrl: "https://picsum.photos/200/300",
      designation: "স্পোকেন ইংলিশ বিশেষজ্ঞ",
      experience: "৭+ বছর",
      qualification: "এমএ (ইংলিশ ল্যাঙ্গুয়েজ টিচিং), ব্র্যাক বিশ্ববিদ্যালয়",
      specialization: ["কমিউনিকেশন স্কিল", "প্রনানসিয়েশন", "পাবলিক স্পিকিং"],
      achievements: "ইংলিশ ফেস্টিভ্যাল চ্যাম্পিয়ন",
      rating: 4.8,
      students: 1100,
      imageColor: "bg-gradient-to-br from-indigo-500 to-violet-500",
      textColor: "text-indigo-600",
      icon: "🗣️",
    },
    {
      id: 7,
      name: "সাকিব আহমেদ",
      photoUrl: "https://picsum.photos/200/300",
      designation: "এসএটি বিশেষজ্ঞ",
      experience: "৯+ বছর",
      qualification: "মাস্টার্স (ইংরেজি), ঢাকা বিশ্ববিদ্যালয়",
      specialization: ["এসএটি রিডিং", "এসএটি রাইটিং", "এসএটি ম্যাথ"],
      achievements: "সেরা এসএটি কোচ ২০২৩",
      rating: 4.9,
      students: 700,
      imageColor: "bg-gradient-to-br from-teal-500 to-blue-500",
      textColor: "text-teal-600",
      icon: "🎓",
    },
    {
      id: 8,
      name: "নুসরাত জাহান",
      photoUrl: "https://picsum.photos/200/300",
      designation: "বাংলা বিভাগ প্রধান",
      experience: "১৩+ বছর",
      qualification: "এমএ (বাংলা সাহিত্য), ঢাকা বিশ্ববিদ্যালয়",
      specialization: ["বাংলা সাহিত্য", "ব্যাকরণ", "রচনা"],
      achievements: "জাতীয় বাংলা দিবস পুরস্কার",
      rating: 4.7,
      students: 1000,
      imageColor: "bg-gradient-to-br from-pink-500 to-rose-500",
      textColor: "text-pink-600",
      icon: "🇧🇩",
    },
  ];

  const stats = [
    {
      label: "সর্বমোট শিক্ষক",
      value: "৫০+",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "সর্বোচ্চ রেটিং",
      value: "৪.৯/৫.০",
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "বছরের অভিজ্ঞতা",
      value: "১০+",
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "সফল শিক্ষার্থী",
      value: "১০,০০০+",
      icon: GraduationCap,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const teachingMethodologies = [
    {
      title: "ইন্টার‍্যাকটিভ লার্নিং",
      description:
        "ইন্টার‍্যাকটিভ ক্লাসের মাধ্যমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "ব্যক্তিগত মনোযোগ",
      description: "প্রতিটি শিক্ষার্থীর জন্য আলাদা মনোযোগ ও গাইডেন্স",
      icon: Heart,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "বাস্তব উদাহরণ",
      description: "বাস্তব জীবনের উদাহরণ দিয়ে জটিল বিষয় সহজে বোঝানো",
      icon: Target,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "মডার্ন টেকনোলজি",
      description: "আধুনিক প্রযুক্তি ব্যবহার করে আকর্ষণীয় ক্লাস",
      icon: Lightbulb,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-[#17202F] font-kalpurush font-bold mb-4">
            আমাদের শিক্ষকমণ্ডলী
            <span className="block text-[#3BD480]">
              যাদের হাত ধরে গড়ে উঠছে ভবিষ্যত
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalpurush">
            দেশের খ্যাতনামা বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী, অভিজ্ঞ ও
            প্রশিক্ষিত শিক্ষকদের নিয়ে গঠিত আমাদের দক্ষ টিম। প্রতিটি শিক্ষক
            শিক্ষার্থীদের সাফল্যের জন্য নিবেদিতপ্রাণ।
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="group relative bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute top-0 left-0 w-full h-1 ${teacher.imageColor}`}
              ></div>

              {/* Teacher Photo Section */}
              <div className="relative p-6">
                {/* Photo Container */}
                <div className="relative mx-auto mb-6">
                  <div
                    className={`w-32 h-32 mx-auto rounded-full ${teacher.imageColor} flex items-center justify-center overflow-hidden border-4 border-white shadow-lg`}
                  >
                    {/* Placeholder for teacher photo - you can replace with actual image */}
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-white/20">
                      <img src={teacher.photoUrl} alt="" />
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 font-kalpurush mb-1">
                    {teacher.name}
                  </h3>
                  <div
                    className={`inline-flex items-center gap-1 px-4 py-1 rounded-full ${teacher.textColor.replace("text", "bg")}/10 border ${teacher.textColor.replace("text", "border")}/20`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${teacher.textColor.replace("text", "bg")}`}
                    ></div>
                    <p
                      className={`${teacher.textColor} text-sm font-medium font-kalpurush`}
                    >
                      {teacher.designation}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-600 text-sm mt-3 font-kalpurush">
                    {teacher.description}
                  </p>
                </div>
              </div>

              {/* Stats & Details */}
              <div className="px-6 pb-6">
                {/* Rating & Experience */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 text-sm font-kalpurush">
                      {teacher.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-2 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-gray-900 font-bold font-kalpurush">
                      {teacher.rating}
                    </span>
                    <span className="text-gray-500 text-sm">/৫.০</span>
                  </div>
                </div>

                {/* Qualification */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm font-kalpurush leading-relaxed">
                      {teacher.qualification}
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 font-kalpurush">
                    বিশেষায়িত ক্ষেত্র:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialization.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-kalpurush"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {teacher.achievements && (
                  <div className="mb-4">
                    <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-lg">
                      <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm font-kalpurush">
                        {teacher.achievements}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact & Stats */}
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 border-2 ${teacher.textColor.replace("text", "border")} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
