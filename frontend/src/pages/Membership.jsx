import React, { useState } from "react";
import {
  Crown,
  Star,
  Users,
  Award,
  Shield,
  Clock,
  Gift,
  BookOpen,
  Video,
  Headphones,
  Download,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Target,
  Calendar,
  CreditCard,
  Heart,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  UserCheck,
} from "lucide-react";

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [activeTab, setActiveTab] = useState("plans");

  const membershipPlans = [
    {
      id: "basic",
      name: "বেসিক মেম্বার",
      price: "৳৫০০",
      period: "মাসিক",
      color: "from-blue-500 to-cyan-500",
      features: [
        "প্রতিদিন ২টি লাইভ ক্লাস",
        "বেসিক স্টাডি মেটেরিয়াল",
        "সাপ্তাহিক মক টেস্ট",
        "কমিউনিটি ফোরাম এক্সেস",
        "সীমিত ডাউনলোড (১০/মাস)",
      ],
      recommended: false,
      icon: Star,
    },
    {
      id: "premium",
      name: "প্রিমিয়াম মেম্বার",
      price: "৳১২০০",
      period: "মাসিক",
      color: "from-[#3BD480] to-[#134C45]",
      features: [
        "আনলিমিটেড লাইভ ক্লাস",
        "সম্পূর্ণ স্টাডি মেটেরিয়াল",
        "ডেইলি মক টেস্ট ও এনালাইসিস",
        "ব্যক্তিগত ডাউট সলভিং",
        "আনলিমিটেড ডাউনলোড",
        "স্পেশাল ওয়ার্কশপ এক্সেস",
        "মাসিক ১-১ কাউন্সেলিং",
      ],
      recommended: true,
      icon: Crown,
    },
    {
      id: "elite",
      name: "এলিট মেম্বার",
      price: "৳২৫০০",
      period: "মাসিক",
      color: "from-purple-500 to-pink-500",
      features: [
        "প্রিমিয়াম সব সুবিধা",
        "ডেডিকেটেড মেন্টর",
        "সাপ্তাহিক পার্সোনালাইজড ফিডব্যাক",
        "প্রাইভেট স্টাডি গ্রুপ",
        "ইন্টার্নশিপ সুযোগ",
        "জব প্লেসমেন্ট সাপোর্ট",
        "ফ্রী মেরিট সার্টিফিকেট",
      ],
      recommended: false,
      icon: Award,
    },
  ];

  const membershipBenefits = [
    {
      icon: Video,
      title: "এক্সক্লুসিভ লাইভ ক্লাস",
      description: "শুধুমাত্র মেম্বারদের জন্য বিশেষায়িত লাইভ ক্লাস",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: BookOpen,
      title: "প্রিমিয়াম স্টাডি মেটেরিয়াল",
      description: "উচ্চমানের স্টাডি গাইড, নোটস ও প্র্যাকটিস সেট",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Headphones,
      title: "২৪/৭ সাপোর্ট",
      description: "যেকোনো সময় একাডেমিক সাপোর্ট ও গাইডেন্স",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Download,
      title: "আনলিমিটেড ডাউনলোড",
      description: "সব রিসোর্স আনলিমিটেড ডাউনলোড এক্সেস",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Users,
      title: "এক্সক্লুসিভ কমিউনিটি",
      description: "শুধুমাত্র মেম্বারদের প্রাইভেট কমিউনিটি গ্রুপ",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      icon: Gift,
      title: "স্পেশাল অফার",
      description: "কোর্স, বই ও ইভেন্টে বিশেষ ছাড়",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  const successStories = [
    {
      name: "রাফি আহমেদ",
      plan: "প্রিমিয়াম মেম্বার",
      achievement: "এইচএসসিতে জিপিএ ৫.০০",
      story:
        "প্রিমিয়াম মেম্বারশিপের মাধ্যমে নিয়মিত লাইভ ক্লাস ও পার্সোনালাইজড গাইডেন্স পেয়ে সফলতা অর্জন করেছি।",
      avatar: "রা",
    },
    {
      name: "তাসনিমা ইসলাম",
      plan: "এলিট মেম্বার",
      achievement: "আইইএলটিএস ৮.০ স্কোর",
      story:
        "ডেডিকেটেড মেন্টরশিপ ও সাপ্তাহিক ফিডব্যাক আইইএলটিএস প্রস্তুতিতে সাহায্য করেছে।",
      avatar: "তা",
    },
    {
      name: "সাকিব হাসান",
      plan: "বেসিক মেম্বার",
      achievement: "মেডিকেলে ভর্তি",
      story:
        "বেসিক মেম্বারশিপের স্টাডি মেটেরিয়াল ও মক টেস্ট মেডিকেল ভর্তি পরীক্ষায় সহায়ক হয়েছে।",
      avatar: "সা",
    },
  ];

  const membershipStats = [
    {
      label: "সক্রিয় মেম্বার",
      value: "২,৫০০+",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "সফলতা হার",
      value: "৯৫%",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "লাইভ ক্লাস",
      value: "৫০০+",
      icon: Video,
      color: "text-purple-500",
    },
    {
      label: "মেম্বার সন্তুষ্টি",
      value: "৪.৯/৫.০",
      icon: Star,
      color: "text-amber-500",
    },
  ];

  const faqs = [
    {
      question: "মেম্বারশিপ কেন নেবো?",
      answer:
        "মেম্বারশিপের মাধ্যমে আপনি এক্সক্লুসিভ লাইভ ক্লাস, প্রিমিয়াম স্টাডি মেটেরিয়াল, ব্যক্তিগত গাইডেন্স এবং বিশেষ সুযোগ-সুবিধা পাবেন যা সাধারণ শিক্ষার্থীরা পায় না।",
    },
    {
      question: "কিভাবে পেমেন্ট করব?",
      answer:
        "bKash, Nagad, Rocket, Bank Transfer এবং Credit/Debit Card এর মাধ্যমে অনলাইন পেমেন্ট করতে পারবেন। পেমেন্ট সম্পূর্ণ সুরক্ষিত।",
    },
    {
      question: "মেম্বারশিপ ক্যান্সেল করা যাবে?",
      answer:
        "হ্যাঁ, যেকোনো সময় মেম্বারশিপ ক্যান্সেল করতে পারবেন। ক্যান্সেল করলে পরবর্তী মাস থেকে বিলিং বন্ধ হয়ে যাবে।",
    },
    {
      question: "একটি একাউন্টে কয়জন ব্যবহার করতে পারবে?",
      answer:
        "প্রতিটি মেম্বারশিপ শুধুমাত্র একটি ডিভাইস ও একজন ব্যবহারকারীর জন্য। শেয়ারিং নিষিদ্ধ।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-membership"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-membership)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            গ্র্যাভিটন মেম্বারশিপ
            <span className="block text-[#3BD480]">
              সাফল্যের প্রিমিয়াম পাস
            </span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            বিশেষ সুযোগ-সুবিধা, এক্সক্লুসিভ রিসোর্স এবং ব্যক্তিগত গাইডেন্সের
            মাধ্যমে আপনার পড়াশুনার যাত্রাকে আরও গতিশীল ও কার্যকর করুন।
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {membershipStats.map((stat, index) => (
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

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {["plans", "benefits", "stories", "faq"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 font-kalpurush ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white"
                  : "bg-white/10 text-white/90 hover:bg-white/20"
              }`}
            >
              {tab === "plans" && "মেম্বারশিপ প্ল্যান"}
              {tab === "benefits" && "সুবিধাসমূহ"}
              {tab === "stories" && "সাফল্যের গল্প"}
              {tab === "faq" && "সাধারণ প্রশ্ন"}
            </button>
          ))}
        </div>

        {/* Plans Section */}
        {activeTab === "plans" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-kalpurush">
              আপনার উপযুক্ত প্ল্যান নির্বাচন করুন
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                    selectedPlan === plan.id
                      ? "border-[#3BD480] ring-2 ring-[#3BD480]/30"
                      : "border-white/20 hover:border-[#3BD480]/50"
                  }`}
                >
                  {/* Recommended Badge */}
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white px-4 py-1 rounded-full text-sm font-medium font-kalpurush">
                        সর্বাধিক জনপ্রিয়
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-kalpurush">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-white/70 font-kalpurush">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/80 font-kalpurush"
                      >
                        <CheckCircle className="w-5 h-5 text-[#3BD480] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 font-kalpurush ${
                      selectedPlan === plan.id
                        ? "bg-white text-[#134C45] hover:bg-white/90"
                        : "bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white hover:opacity-90"
                    }`}
                  >
                    {selectedPlan === plan.id
                      ? "নির্বাচিত"
                      : "প্ল্যান নির্বাচন করুন"}
                  </button>

                  {/* Trial Info */}
                  <p className="text-center text-white/60 text-sm mt-4 font-kalpurush">
                    <Clock className="w-4 h-4 inline mr-1" />৭ দিন ফ্রি ট্রায়াল
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Plan CTA */}
            <div className="mt-12 bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-kalpurush">
                {membershipPlans.find((p) => p.id === selectedPlan)?.name}{" "}
                প্ল্যান নির্বাচিত হয়েছে
              </h3>
              <p className="text-white/90 mb-6 font-kalpurush">
                এখনই জয়েন করুন এবং বিশেষ সুযোগ-সুবিধা উপভোগ করুন
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-3 bg-white text-[#134C45] font-bold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2 font-kalpurush">
                  <CreditCard className="w-5 h-5" />
                  এখনই পেমেন্ট করুন
                </button>
                <button className="px-8 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 font-kalpurush">
                  <Zap className="w-5 h-5" />
                  ফ্রি ট্রায়াল শুরু করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        {activeTab === "benefits" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-kalpurush">
              মেম্বারশিপের বিশেষ সুবিধা
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {membershipBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl ${benefit.bg} mb-4`}
                  >
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-kalpurush">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 font-kalpurush">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Benefits */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-kalpurush">
                অতিরিক্ত বিশেষাধিকার
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    "স্পেশাল ডিস্কাউন্ট কোর্স ফী",
                    "বিনামূল্যে সার্টিফিকেট",
                    "ইভেন্টে প্রাধান্য প্রদান",
                    "অগ্রাধিকার ভিত্তিতে সাপোর্ট",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white/90 font-kalpurush"
                    >
                      <Sparkles className="w-5 h-5 text-[#3BD480]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    "মাসিক প্রোগ্রেস রিপোর্ট",
                    "পার্সোনালাইজড স্টাডি প্ল্যান",
                    "ক্যারিয়ার কাউন্সেলিং",
                    "নেটওয়ার্কিং সুযোগ",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white/90 font-kalpurush"
                    >
                      <Target className="w-5 h-5 text-[#3BD480]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories Section */}
        {activeTab === "stories" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-kalpurush">
              মেম্বারদের সাফল্যের গল্প
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center text-white font-bold text-xl">
                      {story.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg font-kalpurush">
                        {story.name}
                      </h3>
                      <p className="text-[#3BD480] font-medium font-kalpurush">
                        {story.plan}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white/90 font-kalpurush mb-3">
                      "{story.story}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm font-kalpurush">
                        অর্জন
                      </span>
                      <span className="text-white font-medium font-kalpurush">
                        {story.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Join Now CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-kalpurush">
                আপনি কি পরবর্তী সফলতার গল্প হবেন?
              </h3>
              <button className="px-8 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-[#3BD480]/30 font-kalpurush">
                <UserCheck className="w-5 h-5 inline mr-2" />
                এখনই জয়েন করুন
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-kalpurush">
              সচরাচর জিজ্ঞাসিত প্রশ্ন
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-white mb-3 font-kalpurush">
                    {faq.question}
                  </h3>
                  <p className="text-white/70 font-kalpurush">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-kalpurush">
                আরও প্রশ্ন আছে?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto font-kalpurush">
                আমাদের সাপোর্ট টিম আপনার সব প্রশ্নের উত্তর দিতে প্রস্তুত
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-6 py-3 bg-[#3BD480] text-white font-medium rounded-xl hover:bg-[#2da866] transition-colors flex items-center gap-2 font-kalpurush">
                  <Mail className="w-5 h-5" />
                  ইমেইল করুন
                </button>
                <button className="px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2 font-kalpurush">
                  <Phone className="w-5 h-5" />
                  কল করুন
                </button>
                <button className="px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2 font-kalpurush">
                  <MapPin className="w-5 h-5" />
                  ভিজিট করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 font-kalpurush">
              সাফল্যের যাত্রা শুরু করুন আজই
            </h2>
            <p className="text-white/90 mb-6 font-kalpurush">
              হাজারো শিক্ষার্থীর সাথে যোগ দিন যারা গ্র্যাভিটন মেম্বারশিপের
              মাধ্যমে তাদের পড়াশুনার লক্ষ্যে পৌঁছেছে।
            </p>
            <button className="px-8 py-3 bg-white text-[#134C45] font-bold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto font-kalpurush">
              <Crown className="w-5 h-5" />
              ফ্রি ট্রায়াল শুরু করুন
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-white/70 text-sm mt-4 font-kalpurush">
              কোনো ক্রেডিট কার্ডের প্রয়োজন নেই • ৭ দিন ফ্রি ট্রায়াল • যেকোনো
              সময় ক্যান্সেল
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
