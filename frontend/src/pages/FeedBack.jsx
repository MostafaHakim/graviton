import React, { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Award,
  Heart,
  Send,
  Quote,
  User,
  Sparkles,
  CheckCircle,
  Book,
  Home,
  Headphones,
  Users,
  Smile,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createFeedback,
  getFeedback,
} from "../store/features/auth/feedbackSlice";
import { toast } from "react-toastify";

const FeedBack = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [line, setLine] = useState(false);
  const navigate = useNavigate();

  const { feedbacks } = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "general",
    anonymous: false,
  });

  const feedbackCategories = [
    { id: "all", label: "সকল ফিডব্যাক", count: 124, icon: MessageSquare },
    {
      id: "positive",
      label: "ইতিবাচক",
      count: 89,
      icon: ThumbsUp,
      color: "text-emerald-600",
    },
    {
      id: "constructive",
      label: "গঠনমূলক",
      count: 25,
      icon: Award,
      color: "text-amber-600",
    },
    {
      id: "feature",
      label: "ফিচার রিকুয়েস্ট",
      count: 10,
      icon: Sparkles,
      color: "text-blue-600",
    },
  ];

  const quickFeedbackItems = [
    { label: "শিক্ষার মান", icon: Users },
    { label: "কোর্স সামগ্রী", icon: Book },
    { label: "সুবিধাসমূহ", icon: Home },
    { label: "সাপোর্ট সিস্টেম", icon: Headphones },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { ...formData, rating });
    const res = await dispatch(createFeedback({ ...formData, rating }));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getFeedback());
      toast.success("আপনার মূল্যবান ফিডব্যাকের জন্য ধন্যবাদ!");
      setFormData({
        name: "",
        email: "",
        message: "",
        category: "general",
        anonymous: false,
      });
      setRating(0);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
              id="mesh-grid-feedback"
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
          <rect width="100%" height="100%" fill="url(#mesh-grid-feedback)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            আপনার
            <span className="block text-[#3BD480]">অভিজ্ঞতা শেয়ার করুন</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            আপনার চিন্তাভাবনা, পরামর্শ এবং অভিজ্ঞতা শেয়ার করে আমাদের উন্নত করতে
            সাহায্য করুন। প্রতিটি ফিডব্যাক আমাদেরকে উন্নতির দিকে আরো একধাপ
            এগিয়ে নিয়ে যায়।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Feedback Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-kalpurush">
                  আপনার ফিডব্যাক দিন
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3 font-kalpurush">
                    সামগ্রিক রেটিং *
                  </label>
                  <div className="flex flex-col lg:flex-row  gap-1 items-center">
                    <div className="flex flex-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1"
                        >
                          <Star
                            className={`w-10 h-10 transition-colors ${
                              star <= (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-white/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="ml-4 text-lg font-semibold text-white">
                      {rating > 0 ? `${rating}.0` : "রেটিং নির্বাচন করুন"}
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    আপনার ফিডব্যাক *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                    placeholder="আপনার বিস্তারিত অভিজ্ঞতা, পরামর্শ বা কোনো উদ্বেগ শেয়ার করুন..."
                  />
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white placeholder-white/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Feedback Category */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2 font-kalpurush">
                    ফিডব্যাক বিভাগ *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all text-white"
                  >
                    <option value="general" className="bg-[#17202F]">
                      সাধারণ ফিডব্যাক
                    </option>
                    <option value="teaching" className="bg-[#17202F]">
                      শিক্ষার মান
                    </option>
                    <option value="facilities" className="bg-[#17202F]">
                      সুবিধাসমূহ
                    </option>
                    <option value="courses" className="bg-[#17202F]">
                      কোর্স কন্টেন্ট
                    </option>
                    <option value="support" className="bg-[#17202F]">
                      শিক্ষার্থী সাপোর্ট
                    </option>
                  </select>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#3BD480] rounded focus:ring-[#3BD480]"
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm text-white/70 font-kalpurush"
                  >
                    বেনামে জমা দিন
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 font-kalpurush"
                >
                  <Send className="w-5 h-5" />
                  ফিডব্যাক জমা দিন
                </button>
              </form>
            </div>

            {/* Testimonials Section */}
            <div>
              {/* Categories Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {feedbackCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-kalpurush ${
                      activeTab === category.id
                        ? "bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white border-transparent"
                        : "bg-white/10 border-white/20 text-white/90 hover:border-white/30"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="font-medium">{category.label}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === category.id
                          ? "bg-white/20"
                          : "bg-white/10"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1  gap-6">
                {feedbacks.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white font-kalpurush">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white/70 font-kalpurush">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <Quote className="w-6 h-6 text-white/30" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/90 mb-4 leading-relaxed font-kalpurush ">
                      <span className={!line ? "line-clamp-5" : " "}>
                        "{testimonial.message}"
                      </span>{" "}
                      <button
                        onClick={() => setLine(!line)}
                        className="text-[#b4c4b8]"
                      >
                        {line ? "Show less" : " See more..."}
                      </button>
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-sm text-white/50 font-kalpurush">
                        {testimonial.createdAt}
                      </span>
                      <span className="text-sm font-medium text-[#3BD480] font-kalpurush">
                        {testimonial.course}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-kalpurush">
                <Award className="w-5 h-5 text-[#3BD480]" />
                ফিডব্যাক গাইডলাইন
              </h3>
              <ul className="space-y-3">
                {[
                  "আপনার অভিজ্ঞতা সম্পর্কে নির্দিষ্ট হোন",
                  "ইতিবাচক ও উন্নতির ক্ষেত্র উভয়ই উল্লেখ করুন",
                  "গঠনমূলক পরামর্শ দিন",
                  "প্রাসঙ্গিক হলে নির্দিষ্ট কোর্স বা শিক্ষকের নাম উল্লেখ করুন",
                  "প্রযোজ্য হলে পরিমাপযোগ্য ফলাফল শেয়ার করুন",
                ].map((guideline, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90 font-kalpurush"
                  >
                    <CheckCircle className="w-4 h-4 text-[#3BD480] mt-0.5 flex-shrink-0" />
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Feedback Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-kalpurush">
                দ্রুত ফিডব্যাক
              </h3>
              <div className="space-y-3">
                {quickFeedbackItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg hover:border-[#3BD480] hover:bg-[#3BD480]/10 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="text-white/90 group-hover:text-[#3BD480] font-kalpurush">
                      {item.label}
                    </span>
                    <item.icon className="w-4 h-4 text-white/50 group-hover:text-[#3BD480]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3 font-kalpurush">
                জরুরি সাহায্য প্রয়োজন?
              </h3>
              <p className="text-white/80 mb-4 font-kalpurush">
                জরুরি বিষয়ের জন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-3 bg-white text-[#134C45] font-medium rounded-lg hover:bg-white/90 transition-colors font-kalpurush"
              >
                সাপোর্টে যোগাযোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
