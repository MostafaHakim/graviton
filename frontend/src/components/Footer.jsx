import React, { useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  Instagram,
  MessageCircle,
  Heart,
  ArrowUpRight,
  BookOpen,
  Users,
  Globe,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../store/features/auth/settingsSlice";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  const quickLinks = [
    { path: "/", label: "হোম", icon: "🏠" },
    { path: "/club", label: "ক্লাব", icon: "👥" },
    { path: "/abroad", label: "বিদেশ যাত্রা", icon: "✈️" },
    { path: "/gallery", label: "গ্যালারি", icon: "🖼️" },
    { path: "/membership", label: "মেম্বারশিপ", icon: "👑" },
    { path: "/admission", label: "ভর্তি", icon: "📝" },
  ];

  const importantLinks = [
    { path: "/privacy", label: "গোপনীয়তা নীতি" },
    { path: "/terms", label: "সেবার শর্তাবলী" },
    { path: "/refund", label: "ফেরত নীতি" },
    { path: "/faq", label: "সচরাচর জিজ্ঞাসা" },
    { path: "/career", label: "ক্যারিয়ার" },
    { path: "/blog", label: "ব্লগ" },
  ];

  const courses = [
    { name: "আইইএলটিএস প্রস্তুতি" },
    { name: "এসএটি প্রস্তুতি" },
    { name: "ডিজিটাল মার্কেটিং" },
    { name: "গ্রাফিক ডিজাইন" },
    { name: "কিডস প্রোগ্রামিং" },
    { name: "স্পোকেন ইংলিশ" },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      text: settings?.mobile,
      subtext: "রবি-শুক্র, সকাল ৯টা - রাত ৯টা",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: settings?.email,
      subtext: "২৪ ঘন্টার মধ্যে উত্তর",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: settings?.address,
      subtext: "গুগল ম্যাপে দেখুন",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "শনি-বৃহস্পতি: সকাল ৯টা - রাত ৯টা",
      subtext: "শুক্রবার: বন্ধ",
    },
  ];

  const socialMedia = [
    {
      icon: <Facebook className="w-5 h-5" />,
      url: settings?.facebook,
      label: "Facebook",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      url: settings?.youtube,
      label: "YouTube",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      url: settings?.instagram,
      label: "Instagram",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      url: "#",
      label: "Messenger",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-footer"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-footer)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#3BD480] to-[#134C45] rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-kalpurush">
                  গ্র্যাভিটন একাডেমি
                </h2>
                <p className="text-[#3BD480] font-medium font-kalpurush">
                  শিক্ষার নতুন দিগন্ত
                </p>
              </div>
            </div>

            <p className="text-white/80 font-kalpurush leading-relaxed">
              গ্র্যাভিটন একাডেমি বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিক্ষা
              প্রতিষ্ঠান। আমরা আধুনিক প্রযুক্তি ও উদ্ভাবনী শিক্ষা পদ্ধতির
              মাধ্যমে শিক্ষার্থীদের সামনে এগিয়ে যাওয়ার পথ তৈরি করছি। আমাদের
              লক্ষ্য শুধু জ্ঞান দেওয়া নয়, বরং বাস্তব জীবনে প্রয়োগের দক্ষতা
              তৈরি করা।
            </p>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-white font-medium mb-4 font-kalpurush">
                আমাদের সাথে যুক্ত থাকুন
              </h3>
              <div className="flex gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#3BD480] transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-kalpurush">
                <Sparkles className="w-4 h-4 text-[#3BD480]" />
                দ্রুত লিংক
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-white/80 hover:text-[#3BD480] transition-colors group font-kalpurush"
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-kalpurush">
                <Award className="w-4 h-4 text-[#3BD480]" />
                গুরুত্বপূর্ণ লিংক
              </h3>
              <ul className="space-y-3">
                {importantLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-white/80 hover:text-[#3BD480] transition-colors group font-kalpurush"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Courses */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-kalpurush">
                <Globe className="w-4 h-4 text-[#3BD480]" />
                জনপ্রিয় কোর্স
              </h3>
              <ul className="space-y-3">
                {courses.map((course, index) => (
                  <li key={index}>
                    <Link
                      to="/courses"
                      className="flex items-center gap-2 text-white/80 hover:text-[#3BD480] transition-colors group font-kalpurush"
                    >
                      <div className="w-1.5 h-1.5 bg-[#3BD480] rounded-full"></div>
                      <span>{course.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-[#3BD480] to-[#134C45] rounded-lg">
                  <div className="text-white">{info.icon}</div>
                </div>
                <div>
                  <p className="text-white font-medium font-kalpurush">
                    {info.text}
                  </p>
                  <p className="text-white/60 text-sm mt-1 font-kalpurush">
                    {info.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/70 text-sm font-kalpurush">
                © {currentYear} গ্র্যাভিটন একাডেমি। সকল অধিকার সংরক্ষিত।
              </p>
              <p className="text-white/50 text-xs mt-1 font-kalpurush">
                ডিজাইন ও ডেভেলপমেন্ট: গ্র্যাভিটন টেক টিম
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/20px-Flag_of_Bangladesh.svg.png"
                  alt="Bangladesh Flag"
                  className="w-5 h-3"
                />
                <span className="text-white/60 text-sm font-kalpurush">
                  বাংলাদেশ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#3BD480] to-[#134C45] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUpRight className="w-6 h-6 rotate-45" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
