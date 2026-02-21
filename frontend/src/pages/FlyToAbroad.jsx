import React, { useState } from "react";
import {
  Globe,
  BookOpen,
  MessageSquare,
  Edit,
  Headphones,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Target,
  Calendar,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const FlyToAbroad = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const examOptions = [
    {
      id: "ielts",
      name: "আইইএলটিএস",
      description: "ইংরেজি ভাষার দক্ষতা যাচাই পরীক্ষা",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      skills: [
        {
          id: "listening",
          name: "লিসেনিং",
          icon: Headphones,
          description: "শ্রবণ দক্ষতা উন্নয়ন",
        },
        {
          id: "reading",
          name: "রিডিং",
          icon: BookOpen,
          description: "পঠন দক্ষতা ও বোধগম্যতা",
        },
        {
          id: "writing",
          name: "রাইটিং",
          icon: Edit,
          description: "লিখন দক্ষতা উন্নয়ন",
        },
        {
          id: "speaking",
          name: "স্পিকিং",
          icon: MessageSquare,
          description: "মৌখিক যোগাযোগ দক্ষতা",
        },
      ],
    },
    {
      id: "sat",
      name: "এসএটি",
      description: "মার্কিন বিশ্ববিদ্যালয়ে ভর্তির পরীক্ষা",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500",
      skills: [
        {
          id: "math",
          name: "গণিত",
          icon: Target,
          description: "গাণিতিক যুক্তি ও সমস্যা সমাধান",
        },
        {
          id: "reading",
          name: "পঠন",
          icon: BookOpen,
          description: "পাঠ্য বিশ্লেষণ ও ব্যাখ্যা",
        },
        {
          id: "writing",
          name: "লিখন",
          icon: Edit,
          description: "ভাষা ব্যবহার ও ব্যাকরণ",
        },
      ],
    },
    {
      id: "extra",
      name: "এক্সট্রা কারিকুলার",
      description: "বহির্মুখী কার্যক্রম ও দক্ষতা",
      icon: Award,
      color: "from-emerald-500 to-green-500",
      skills: [
        {
          id: "sports",
          name: "ক্রীড়া",
          icon: Award,
          description: "খেলাধুলা ও প্রতিযোগিতা",
        },
        {
          id: "clubs",
          name: "ক্লাব",
          icon: Users,
          description: "ক্লাব কার্যক্রম ও নেতৃত্ব",
        },
        {
          id: "volunteer",
          name: "স্বেচ্ছাসেবা",
          icon: Sparkles,
          description: "সামাজিক সেবা কার্যক্রম",
        },
        {
          id: "projects",
          name: "প্রজেক্ট",
          icon: Target,
          description: "ব্যক্তিগত প্রজেক্ট ও গবেষণা",
        },
      ],
    },
    {
      id: "alumni",
      name: "অ্যালামনাই নেটওয়ার্ক",
      description: "সফল সাবেক শিক্ষার্থীদের অভিজ্ঞতা",
      icon: Users,
      color: "from-amber-500 to-orange-500",
      skills: [
        {
          id: "success",
          name: "সাফল্যের গল্প",
          icon: Star,
          description: "বিদেশে পড়াশুনার অভিজ্ঞতা",
        },
        {
          id: "guidance",
          name: "গাইডেন্স",
          icon: Sparkles,
          description: "সাবেক শিক্ষার্থীদের পরামর্শ",
        },
        {
          id: "network",
          name: "নেটওয়ার্কিং",
          icon: Users,
          description: "যোগাযোগ ও সুযোগ তৈরি",
        },
      ],
    },
  ];

  const preparationTips = {
    ielts: [
      "দৈনিক কমপক্ষে ১ ঘন্টা ইংরেজি শুনুন",
      "বিভিন্ন ধরনের টেক্সট পড়ার অভ্যাস করুন",
      "নিয়মিত প্রবন্ধ লিখুন এবং সংশোধন করান",
      "স্পিকিং পার্টনার খুঁজে নিন বা রেকর্ড করুন",
    ],
    sat: [
      "গাণিতিক সমস্যা নিয়মিত সমাধান করুন",
      "সময় ব্যবস্থাপনা অনুশীলন করুন",
      "শব্দভাণ্ডার বৃদ্ধির জন্য পড়ুন",
      "নিয়মিত মক টেস্ট দিন",
    ],
    extra: [
      "আপনার আগ্রহ অনুযায়ী কার্যক্রম বেছে নিন",
      "নেতৃত্বের দক্ষতা গড়ে তুলুন",
      "অর্জনসমূহ ডকুমেন্ট করুন",
      "সামাজিক সেবামূলক কাজ করুন",
    ],
    alumni: [
      "সাবেক শিক্ষার্থীদের সাথে যোগাযোগ করুন",
      "ক্যারিয়ার গাইডেন্স নিন",
      "নেটওয়ার্কিং ইভেন্টে অংশ নিন",
      "ইন্টার্নশিপ সুযোগ খুঁজুন",
    ],
  };

  const successStories = [
    {
      name: "আহসান হাবিব",
      university: "হার্ভার্ড ইউনিভার্সিটি",
      exam: "SAT Score: 1550",
      story:
        "গ্র্যাভিটনের প্রস্তুতির মাধ্যমে আমেরিকার টপ ইউনিভার্সিটিতে ভর্তির সুযোগ পেয়েছি।",
    },
    {
      name: "সামিয়া ইসলাম",
      university: "অক্সফোর্ড ইউনিভার্সিটি",
      exam: "IELTS Score: 8.5",
      story:
        "এখানকার স্পেশালাইজড ট্রেনিং সেন্টারে প্রস্তুতি নিয়ে ইউকে তে উচ্চশিক্ষার স্বপ্ন পূরণ করেছি।",
    },
    {
      name: "রায়ান চৌধুরী",
      university: "টরন্টো ইউনিভার্সিটি",
      exam: "Extra Curricular Excellence",
      story:
        "এক্সট্রা কারিকুলার এক্টিভিটিজের মাধ্যমে স্টুডেন্ট ভিসা পাওয়ায় সহায়তা পেয়েছি।",
    },
  ];

  const stats = [
    {
      label: "সফল ভর্তি",
      value: "৫০০+",
      icon: GraduationCap,
      color: "text-blue-500",
    },
    {
      label: "IELTS স্কোর",
      value: "৭.৫+",
      icon: Star,
      color: "text-emerald-500",
    },
    {
      label: "SAT স্কোর",
      value: "১৪৫০+",
      icon: Target,
      color: "text-purple-500",
    },
    { label: "দেশসমূহ", value: "২০+", icon: Globe, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
      {/* Mesh Grid Background */}

      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-abroad"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid-abroad)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            বিদেশে পড়াশুনা
            <span className="block text-[#3BD480]">সফলতার রোডম্যাপ</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            বিশ্বের সেরা বিশ্ববিদ্যালয়গুলোতে ভর্তি হওয়ার জন্য প্রয়োজনীয় সব
            ধরনের প্রস্তুতি, গাইডেন্স ও রিসোর্স এক জায়গায় পেয়ে যান।
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-white/70 font-kalpurush">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Exam Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-kalpurush text-center">
            আপনার প্রয়োজনীয় প্রস্তুতি নির্বাচন করুন
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {examOptions.map((exam) => (
              <button
                key={exam.id}
                onClick={() =>
                  setSelectedExam(selectedExam === exam.id ? null : exam.id)
                }
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 text-left group hover:-translate-y-1 ${
                  selectedExam === exam.id
                    ? "border-[#3BD480] bg-[#3BD480]/10"
                    : "border-white/20 hover:border-[#3BD480]/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${exam.color}`}
                  >
                    <exam.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-white/50 transition-transform ${
                      selectedExam === exam.id ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-kalpurush">
                  {exam.name}
                </h3>
                <p className="text-white/70 text-sm font-kalpurush">
                  {exam.description}
                </p>
              </button>
            ))}
          </div>

          {/* Expanded Section */}
          {selectedExam && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-in slide-in-from-top-5 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white font-kalpurush">
                  {examOptions.find((e) => e.id === selectedExam)?.name}{" "}
                  প্রস্তুতি
                </h3>
                <button
                  onClick={() => setSelectedExam(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {examOptions
                  .find((e) => e.id === selectedExam)
                  ?.skills.map((skill) => (
                    <Link
                      key={skill.id}
                      to={`/student/abroad/${selectedExam}/${skill.id}`}
                      onClick={() => setSelectedSkill(skill.id)}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#3BD480] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#3BD480]/20">
                          <skill.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white font-kalpurush">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-white/60 text-sm font-kalpurush">
                        {skill.description}
                      </p>
                      <div className="mt-4 flex items-center text-[#3BD480] text-sm font-kalpurush">
                        বিস্তারিত দেখুন
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Preparation Tips */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 font-kalpurush">
                  প্রস্তুতি টিপস
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {preparationTips[selectedExam]?.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-white/80 font-kalpurush"
                    >
                      <CheckCircle className="w-4 h-4 text-[#3BD480] mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-kalpurush text-center">
            সফল শিক্ষার্থীদের অভিজ্ঞতা
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center text-white font-bold">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-kalpurush">
                      {story.name}
                    </h4>
                    <p className="text-sm text-white/70 font-kalpurush">
                      {story.university}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[#3BD480] font-bold font-kalpurush">
                    {story.exam}
                  </p>
                </div>

                <p className="text-white/80 font-kalpurush mb-4">
                  "{story.story}"
                </p>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50 font-kalpurush">
                      গ্র্যাভিটন একাডেমি
                    </span>
                    <span className="text-sm text-[#3BD480] font-kalpurush">
                      সফল কেস
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 font-kalpurush">
            আপনার বিদেশে পড়াশুনার যাত্রা শুরু করুন
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto font-kalpurush">
            আমাদের বিশেষজ্ঞ গাইডেন্স টিম আপনার জন্য ব্যক্তিগতকৃত পরামর্শ ও
            প্রস্তুতি প্ল্যান তৈরি করবে।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#3BD480] text-white font-bold rounded-xl hover:bg-[#2da866] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30 font-kalpurush">
              ফ্রি কাউন্সেলিং বুক করুন
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 font-kalpurush">
              প্রোফাইল মূল্যায়ন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyToAbroad;
