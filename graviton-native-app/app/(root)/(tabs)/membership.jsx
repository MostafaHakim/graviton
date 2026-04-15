import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
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
  ChevronRight,
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const Membership = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const navigation = useNavigation();

  // Dummy Members Data
  const members = [
    {
      id: 1,
      name: "রাফি আহমেদ",
      email: "rafi@example.com",
      subscription: {
        planName: "প্রিমিয়াম প্ল্যান",
        status: "active",
        price: "৳ ২,৫০০",
      },
    },
    {
      id: 2,
      name: "তাসনিমা ইসলাম",
      email: "tasnima@example.com",
      subscription: {
        planName: "এলিট প্ল্যান",
        status: "active",
        price: "৳ ৪,০০০",
      },
    },
    {
      id: 3,
      name: "সাকিব হাসান",
      email: "sakib@example.com",
      subscription: {
        planName: "বেসিক প্ল্যান",
        status: "active",
        price: "৳ ১,৫০০",
      },
    },
  ];

  // Available Plans
  const plans = [
    {
      id: 1,
      name: "বেসিক প্ল্যান",
      price: "৳ ১,৫০০",
      duration: "মাসিক",
      features: [
        "বেসিক স্টাডি মেটেরিয়াল",
        "মাসিক মক টেস্ট",
        "কমিউনিটি এক্সেস",
        "ইমেইল সাপোর্ট",
      ],
      popular: false,
      color: ["#6b7280", "#4b5563"],
    },
    {
      id: 2,
      name: "প্রিমিয়াম প্ল্যান",
      price: "৳ ২,৫০০",
      duration: "মাসিক",
      features: [
        "সমস্ত বেসিক ফিচার",
        "লাইভ ক্লাস এক্সেস",
        "প্রিমিয়াম স্টাডি মেটেরিয়াল",
        "২৪/৭ চ্যাট সাপোর্ট",
        "সাপ্তাহিক পার্সোনাল ক্লাস",
        "সার্টিফিকেট",
      ],
      popular: true,
      color: ["#3BD480", "#134C45"],
    },
    {
      id: 3,
      name: "এলিট প্ল্যান",
      price: "৳ ৪,০০০",
      duration: "মাসিক",
      features: [
        "সমস্ত প্রিমিয়াম ফিচার",
        "১-অন-১ মেন্টরশিপ",
        "পার্সোনালাইজড স্টাডি প্ল্যান",
        "ক্যারিয়ার কাউন্সেলিং",
        "প্রাইরিটি সাপোর্ট",
        "অফলাইন ইভেন্ট এক্সেস",
      ],
      popular: false,
      color: ["#8b5cf6", "#6d28d9"],
    },
  ];

  const membershipBenefits = [
    {
      icon: Video,
      title: "এক্সক্লুসিভ লাইভ ক্লাস",
      description: "শুধুমাত্র মেম্বারদের জন্য বিশেষায়িত লাইভ ক্লাস",
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.1)",
    },
    {
      icon: BookOpen,
      title: "প্রিমিয়াম স্টাডি মেটেরিয়াল",
      description: "উচ্চমানের স্টাডি গাইড, নোটস ও প্র্যাকটিস সেট",
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Headphones,
      title: "২৪/৭ সাপোর্ট",
      description: "যেকোনো সময় একাডেমিক সাপোর্ট ও গাইডেন্স",
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.1)",
    },
    {
      icon: Download,
      title: "আনলিমিটেড ডাউনলোড",
      description: "সব রিসোর্স আনলিমিটেড ডাউনলোড এক্সেস",
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
    },
    {
      icon: Users,
      title: "এক্সক্লুসিভ কমিউনিটি",
      description: "শুধুমাত্র মেম্বারদের প্রাইভেট কমিউনিটি গ্রুপ",
      color: "#ec489a",
      bg: "rgba(236, 72, 153, 0.1)",
    },
    {
      icon: Gift,
      title: "স্পেশাল অফার",
      description: "কোর্স, বই ও ইভেন্টে বিশেষ ছাড়",
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.1)",
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
      color: "#3b82f6",
    },
    {
      label: "সফলতা হার",
      value: "৯৫%",
      icon: TrendingUp,
      color: "#10b981",
    },
    {
      label: "লাইভ ক্লাস",
      value: "৫০০+",
      icon: Video,
      color: "#8b5cf6",
    },
    {
      label: "মেম্বার সন্তুষ্টি",
      value: "৪.৯/৫.০",
      icon: Star,
      color: "#f59e0b",
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

  const additionalBenefits = [
    { icon: Sparkles, title: "স্পেশাল ডিস্কাউন্ট কোর্স ফী" },
    { icon: Target, title: "বিনামূল্যে সার্টিফিকেট" },
    { icon: Calendar, title: "ইভেন্টে প্রাধান্য প্রদান" },
    { icon: Clock, title: "অগ্রাধিকার ভিত্তিতে সাপোর্ট" },
    { icon: Heart, title: "মাসিক প্রোগ্রেস রিপোর্ট" },
    { icon: Zap, title: "পার্সোনালাইজড স্টাডি প্ল্যান" },
    { icon: Globe, title: "ক্যারিয়ার কাউন্সেলিং" },
    { icon: Users, title: "নেটওয়ার্কিং সুযোগ" },
  ];

  const StatCard = ({ stat }) => (
    <View
      className="bg-white/10 rounded-2xl p-5 border border-white/20"
      style={{ flex: 1, marginHorizontal: 6 }}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View className="p-2 rounded-xl bg-white/10">
          {React.createElement(stat.icon, { size: 24, color: stat.color })}
        </View>
        <Text className="text-2xl font-bold text-white">{stat.value}</Text>
      </View>
      <Text className="text-sm text-white/70">{stat.label}</Text>
    </View>
  );

  const TabButton = ({ tab, label }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      className={`px-5 py-2.5 rounded-xl mx-1 ${
        activeTab === tab ? "bg-[#3BD480]" : "bg-white/10"
      }`}
    >
      <Text
        className={`font-medium ${
          activeTab === tab ? "text-white" : "text-white/90"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const PlanCard = ({ plan }) => (
    <View
      className="bg-white rounded-2xl p-5"
      style={{ width: width - 80, marginRight: 16 }}
    >
      {plan.popular && (
        <View className="absolute -top-3 right-4">
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            className="px-3 py-1 rounded-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-white text-xs font-bold">জনপ্রিয়</Text>
          </LinearGradient>
        </View>
      )}

      <Text className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</Text>
      <View className="flex-row items-baseline mb-4">
        <Text className="text-3xl font-bold text-[#3BD480]">{plan.price}</Text>
        <Text className="text-gray-500 text-sm ml-1">/{plan.duration}</Text>
      </View>

      <View className="gap-2 mb-6">
        {plan.features.map((feature, idx) => (
          <View key={idx} className="flex-row items-center gap-2">
            <CheckCircle size={16} color="#3BD480" />
            <Text className="text-gray-600 text-sm">{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity className="bg-gradient-to-r from-[#3BD480] to-[#134C45] py-3 rounded-xl">
        <Text className="text-white text-center font-bold">
          প্ল্যান নির্বাচন করুন
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPlansSection = () => (
    <View className="mb-8">
      {/* Active Members Section */}
      <View className="mt-8 px-4">
        <Text className="text-xl font-bold text-white text-center mb-4">
          আমাদের সক্রিয় মেম্বারগণ
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {members.map((member) => (
              <View
                key={member.id}
                className="bg-white/20 rounded-lg p-4"
                style={{ width: width - 100 }}
              >
                <View className="flex-row items-center gap-3 mb-3 border-b border-gray-200 pb-3">
                  <LinearGradient
                    colors={["#fbbf24", "#f97316"]}
                    style={{
                      borderRadius: 50,
                    }}
                    className="w-12 h-12 items-center justify-center"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text className="text-white text-lg font-bold">
                      {member.name.charAt(0)}
                    </Text>
                  </LinearGradient>
                  <View>
                    <Text className="text-white py-1 font-semibold">
                      {member.name}
                    </Text>
                    <Text className="text-yellow-400 text-xs">
                      ⭐ {member.subscription.planName}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row gap-2 items-center bg-blue-200/20 px-2 py-1 rounded">
                  <Text className="text-white text-xs">{member.email}</Text>
                </View>
                <View className="flex flex-row gap-2 items-center bg-rose-200/20 px-2 py-1 rounded mt-2">
                  <Text className="text-white text-xs">
                    {member?.subscription?.planName}
                  </Text>
                </View>
                <View className="mt-2 flex-row justify-between items-center">
                  <View className="px-2 py-1 bg-green-100 rounded-full">
                    <Text className="text-green-700 text-xs">Active</Text>
                  </View>
                </View>
                <TouchableOpacity className="absolute top-3 right-3">
                  <ChevronRight size={16} color="#3BD480" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  const renderBenefitsSection = () => (
    <View className="mb-8">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        মেম্বারশিপের বিশেষ সুবিধা
      </Text>

      <View className="px-4">
        <View className="flex-row flex-wrap justify-between">
          {membershipBenefits.map((benefit, index) => (
            <View
              key={index}
              className="bg-white/10 rounded-2xl p-4 border border-white/20 mb-4"
              style={{ width: (width - 48) / 2 }}
            >
              <View
                className="p-2 rounded-xl mb-3"
                style={{ backgroundColor: benefit.bg, alignSelf: "flex-start" }}
              >
                {React.createElement(benefit.icon, {
                  size: 22,
                  color: benefit.color,
                })}
              </View>
              <Text className="text-white text-sm font-bold mb-1">
                {benefit.title}
              </Text>
              <Text className="text-white/70 text-xs">
                {benefit.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Additional Benefits */}
        <View className="bg-white/10 rounded-2xl p-5 border border-white/20 mt-2">
          <Text className="text-xl font-bold text-white text-center mb-4">
            অতিরিক্ত বিশেষাধিকার
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {additionalBenefits.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center gap-2 mb-2"
                style={{ width: (width - 64) / 2 }}
              >
                {React.createElement(item.icon, { size: 16, color: "#3BD480" })}
                <Text className="text-white/90 text-xs">{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderStoriesSection = () => (
    <View className="mb-8">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        মেম্বারদের সাফল্যের গল্প
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        <View className="flex-row gap-4">
          {successStories.map((story, index) => (
            <View
              key={index}
              className="bg-white/10 rounded-2xl p-5 border border-white/20"
              style={{ width: width - 60 }}
            >
              <View className="flex-row items-center gap-3 mb-4">
                <LinearGradient
                  colors={["#3BD480", "#134C45"]}
                  className="w-14 h-14 rounded-full items-center justify-center"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text className="text-white text-xl font-bold">
                    {story.avatar}
                  </Text>
                </LinearGradient>
                <View>
                  <Text className="text-white text-lg font-bold">
                    {story.name}
                  </Text>
                  <Text className="text-[#3BD480] text-sm">{story.plan}</Text>
                </View>
              </View>

              <Text className="text-white/90 mb-4 leading-5 text-sm">
                "{story.story}"
              </Text>

              <View className="pt-3 border-t border-white/20 flex-row justify-between">
                <Text className="text-white/70 text-xs">অর্জন</Text>
                <Text className="text-white font-medium text-sm">
                  {story.achievement}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Join Now CTA */}
      <View className="items-center mt-8">
        <Text className="text-xl font-bold text-white text-center mb-3">
          আপনি কি পরবর্তী সফলতার গল্প হবেন?
        </Text>
        <TouchableOpacity className="px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-xl shadow-lg">
          <View className="flex-row items-center gap-2">
            <UserCheck size={20} color="white" />
            <Text className="text-white font-bold">এখনই জয়েন করুন</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFaqSection = () => (
    <View className="mb-8">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        সচরাচর জিজ্ঞাসিত প্রশ্ন
      </Text>

      <View className="px-4">
        {faqs.map((faq, index) => (
          <View
            key={index}
            className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-4"
          >
            <Text className="text-white text-base font-bold mb-2">
              {faq.question}
            </Text>
            <Text className="text-white/70 leading-5 text-sm">
              {faq.answer}
            </Text>
          </View>
        ))}

        {/* Contact Support */}
        <View className="bg-white/10 rounded-2xl p-6 border border-white/20 items-center mt-4">
          <Text className="text-xl font-bold text-white text-center mb-2">
            আরও প্রশ্ন আছে?
          </Text>
          <Text className="text-white/70 text-center mb-5 text-sm">
            আমাদের সাপোর্ট টিম আপনার সব প্রশ্নের উত্তর দিতে প্রস্তুত
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 px-3 py-2.5 bg-[#3BD480] rounded-xl">
              <View className="flex-row items-center justify-center gap-2">
                <Mail size={16} color="white" />
                <Text className="text-white font-medium text-sm">
                  ইমেইল করুন
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 px-3 py-2.5 bg-white/20 rounded-xl">
              <View className="flex-row items-center justify-center gap-2">
                <Phone size={16} color="white" />
                <Text className="text-white font-medium text-sm">কল করুন</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 px-3 py-2.5 bg-white/20 rounded-xl">
              <View className="flex-row items-center justify-center gap-2">
                <MapPin size={16} color="white" />
                <Text className="text-white font-medium text-sm">
                  ভিজিট করুন
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#17202F]">
      <LinearGradient
        colors={["#17202F", "#134C45", "#3BD480"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="pt-12 pb-6">
            {/* Header */}
            <View className="px-6 mb-8">
              <Text className="text-4xl text-white text-center font-bold py-2">
                গ্র্যাভিটন মেম্বারশিপ
              </Text>
              <Text className="text-xl text-[#3BD480] text-center font-bold mb-3">
                সাফল্যের প্রিমিয়াম পাস
              </Text>
              <Text className="text-base text-white/80 text-center leading-6">
                বিশেষ সুযোগ-সুবিধা, এক্সক্লুসিভ রিসোর্স এবং ব্যক্তিগত গাইডেন্সের
                মাধ্যমে আপনার পড়াশুনার যাত্রাকে আরও গতিশীল ও কার্যকর করুন।
              </Text>
            </View>

            {/* Stats Section */}
            <View className="flex-row flex-wrap px-3 mb-8">
              {membershipStats.map((stat, index) => (
                <View
                  key={index}
                  style={{
                    width: "50%",
                    paddingHorizontal: 6,
                    marginBottom: 12,
                  }}
                >
                  <StatCard stat={stat} />
                </View>
              ))}
            </View>

            {/* Tabs Navigation */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6 px-4"
            >
              <View className="flex-row">
                <TabButton tab="plans" label="প্রিমিয়াম মেম্বার" />
                <TabButton tab="benefits" label="সুবিধাসমূহ" />
                <TabButton tab="stories" label="সাফল্যের গল্প" />
                <TabButton tab="faq" label="সাধারণ প্রশ্ন" />
              </View>
            </ScrollView>

            {/* Tab Content */}
            {activeTab === "plans" && renderPlansSection()}
            {activeTab === "benefits" && renderBenefitsSection()}
            {activeTab === "stories" && renderStoriesSection()}
            {activeTab === "faq" && renderFaqSection()}

            {/* Footer CTA */}
            <View className="mx-4 mt-6">
              <LinearGradient
                colors={["#3BD480", "#134C45"]}
                className="rounded-2xl p-6"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View className="items-center">
                  <Text className="text-2xl font-bold text-white text-center mb-3">
                    সাফল্যের যাত্রা শুরু করুন আজই
                  </Text>
                  <Text className="text-white/90 text-center mb-5 text-sm">
                    হাজারো শিক্ষার্থীর সাথে যোগ দিন যারা গ্র্যাভিটন মেম্বারশিপের
                    মাধ্যমে তাদের পড়াশুনার লক্ষ্যে পৌঁছেছে।
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MembershipCreate")}
                    className="px-6 py-3 bg-white rounded-xl"
                  >
                    <View className="flex-row items-center gap-2">
                      <Crown size={20} color="#134C45" />
                      <Text className="text-[#134C45] font-bold">
                        মেম্বারশীপের জন্য আবেদন করুন
                      </Text>
                      <ArrowRight size={18} color="#134C45" />
                    </View>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Membership;
