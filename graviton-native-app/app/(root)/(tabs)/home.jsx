import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import {
  Book,
  Target,
  Users,
  Award,
  ArrowUpRight,
  BanknoteArrowDown,
  Link,
  CircleChevronRight,
  Briefcase,
  Clock,
  GraduationCap,
  Trophy,
  Phone,
  Mail,
  BookOpen,
  Brain,
  Lightbulb,
  Rocket,
  User,
  CalendarCheck,
  BookCheck,
  Star,
  ShieldCheck,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const nevigation = useNavigation();
  // Features data
  const features = [
    {
      id: "#madeeasy",
      icon: Book,
      title: "মেডইজি সিস্টেম",
      description: "বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি",
      path: "#madeeasy",
    },
    {
      id: "#targeteducation",
      icon: Target,
      title: "লক্ষ্য নির্ভর শিক্ষা",
      description: "পরীক্ষাভিত্তিক প্রস্তুতি ও নির্দেশনা",
      path: "#target",
    },
    {
      id: "#teachers",
      icon: Users,
      title: "অভিজ্ঞ শিক্ষক",
      description: "প্রতিষ্ঠিত ও দক্ষ শিক্ষকমন্ডলী",
      path: "#teachers",
    },
    {
      id: "#successguarantee",
      icon: Award,
      title: "সাফল্যের গ্যারান্টি",
      description: "প্রতিবারই সেরা ফলাফল",
      path: "#success",
    },
  ];

  // Stats data
  const stats = [
    { value: "৫০০+", label: "সফল শিক্ষার্থী" },
    { value: "৯৫%", label: "সাফল্যের হার" },
    { value: "২০+", label: "বিষয় কোর্স" },
  ];

  // =================Talent Hunt Data=================

  const talentHuntData = [
    {
      title: "ট্যালেন্ট হান্ট ২০২৪",
      bannerUrl: "https://picsum.photos/200/300?random=1",
      feilds: [
        { lable: "বিজ্ঞান", value: "science" },
        { lable: "গণিত", value: "math" },
        { lable: "তথ্য প্রযুক্তি", value: "it" },
      ],
      examDetails: [
        {
          className: "৯ম শ্রেণি",
          vanue: "ঢাকা",
          date: "2024-08-15",
          time: "10:00 AM",
          imageUrl: "https://example.com/examdetails9.jpg",
          public_id: "examdetails9",
        },
        {
          className: "১০ম শ্রেণি",
          vanue: "চট্টগ্রাম",
          date: "2024-08-20",
          time: "10:00 AM",
          imageUrl: "https://example.com/examdetails10.jpg",
          public_id: "examdetails10",
        },
      ],
      contacts: [
        {
          name: "জন ডো",
          dasignation: "প্রোগ্রাম ম্যানেজার",
          mobile: "0123456789",
        },
        {
          name: "জেন ডো",
          dasignation: "কন্টাক্ট পার্সন",
          mobile: "0987654321",
        },
      ],
      rules: [
        {
          name: "নিয়ম ১",
          rule: "প্রতিযোগিতায় অংশগ্রহণের জন্য ৯ম বা ১০ম শ্রেণির ছাত্র হতে হবে।",
        },
        {
          name: "নিয়ম ২",
          rule: "প্রতিযোগিতায় অংশগ্রহণের জন্য একটি ফি প্রদান করতে হবে।",
        },
      ],
    },
    {
      title: "ট্যালেন্ট হান্ট ২০২৫",
      bannerUrl: "https://picsum.photos/200/300?random=2",
      feilds: [
        { lable: "বিজ্ঞান", value: "science" },
        { lable: "গণিত", value: "math" },
        { lable: "তথ্য প্রযুক্তি", value: "it" },
      ],
      examDetails: [
        {
          className: "৯ম শ্রেণি",
          vanue: "ঢাকা",
          date: "2025-08-15",
          time: "10:00 AM",
          imageUrl: "https://example.com/examdetails9.jpg",
          public_id: "examdetails9",
        },
        {
          className: "১০ম শ্রেণি",
          vanue: "চট্টগ্রাম",
          date: "2025-08-20",
          time: "10:00 AM",
          imageUrl: "https://example.com/examdetails10.jpg",
          public_id: "examdetails10",
        },
      ],
      contacts: [
        {
          name: "জন ডো",
          dasignation: "প্রোগ্রাম ম্যানেজার",
          mobile: "0123456789",
        },
        {
          name: "জেন ডো",
          dasignation: "কন্টাক্ট পার্সন",
          mobile: "0987654321",
        },
      ],
      rules: [
        {
          name: "নিয়ম ১",
          rule: "প্রতিযোগিতায় অংশগ্রহণের জন্য ৯ম বা ১০ম শ্রেণির ছাত্র হতে হবে।",
        },
        {
          name: "নিয়ম ২",
          rule: "প্রতিযোগিতায় অংশগ্রহণের জন্য একটি ফি প্রদান করতে হবে।",
        },
      ],
    },
  ];

  // ==================Teacher Section Data=================

  const teachersData = [
    {
      name: "মোঃ রফিকুল ইসলাম",
      designation: "বিজ্ঞান শিক্ষক",
      photoUrl: "https://picsum.photos/200/300?random=3",
      public_id: "teacher1",
      bio: "মোঃ রফিকুল ইসলাম একজন অভিজ্ঞ বিজ্ঞান শিক্ষক, যিনি ১০ বছরেরও বেশি সময় ধরে শিক্ষাদান করছেন। তিনি তার শিক্ষার্থীদের জন্য সহজবোধ্য ও আকর্ষণীয় পাঠ্যক্রম তৈরি করেন।",
      subjects: ["বিজ্ঞান", "গণিত"],
      experience: "১০ বছর",
      qualification: "এমএসসি ইন ফিজিক্স",
      achievements: "বিজ্ঞান",
      email: "rafikul.islam@example.com",
      phone: "0123456789",
    },
    {
      name: "সুমন চক্রবর্তী",
      designation: "গণিত শিক্ষক",
      photoUrl: "https://picsum.photos/200/300?random=4",
      public_id: "teacher2",
      bio: "সুমন চক্রবর্তী একজন দক্ষ গণিত শিক্ষক, যিনি ৮ বছরেরও বেশি সময় ধরে শিক্ষাদান করছেন। তিনি তার শিক্ষার্থীদের গণিতের প্রতি ভালোবাসা তৈরি করতে বিশেষ মনোযোগ দেন।",
      subjects: ["গণিত"],
      experience: "৮ বছর",
      qualification: "এমএসসি ইন ম্যাথমেটিক্স",
      achievements:
        "বিভিন্ন শিক্ষার্থীকে গণিতে অসাধারণ ফলাফল অর্জন করতে সাহায্য করেছেন",
      email: "rafikul.islam@example.com",
      phone: "0123456789",
    },
    {
      name: "আলিম উদ্দিন",
      designation: "তথ্য প্রযুক্তি শিক্ষক",
      photoUrl: "https://picsum.photos/200/300?random=5",
      public_id: "teacher3",
      bio: "আলিম উদ্দিন একজন প্রতিভাবান তথ্য প্রযুক্তি শিক্ষক, যিনি ৫ বছরেরও বেশি সময় ধরে শিক্ষাদান করছেন। তিনি তার শিক্ষার্থীদের তথ্য প্রযুক্তির জগতে দক্ষ করে তোলার জন্য বিভিন্ন প্রকল্প ও কার্যক্রম পরিচালনা করেন।",
      subjects: ["তথ্য প্রযুক্তি"],
      experience: "৫ বছর",
      qualification: "এমএসসি ইন কম্পিউটার সায়েন্স",
      achievements:
        "বিভিন্ন শিক্ষার্থীকে তথ্য প্রযুক্তিতে দক্ষ করে তোলার জন্য প্রশংসিত",
      email: "rafikul.islam@example.com",
      phone: "0123456789",
    },
  ];

  // ===================Made Easy Section Data=================

  const items = [
    {
      icon: BookOpen,
      title: "সহজ পাঠ্য পদ্ধতি",
      desc: "জটিল বিষয়গুলোকে সহজ ভাষায় ও বাস্তব উদাহরণ দিয়ে শেখানো হয়",
    },
    {
      icon: Brain,
      title: "ধাপে ধাপে শেখা",
      desc: "প্রতিটি টপিক ধাপে ধাপে শেখানো হয় যাতে সবাই বুঝতে পারে",
    },
    {
      icon: Lightbulb,
      title: "কনসেপ্ট ক্লিয়ার",
      desc: "শুধু মুখস্থ নয়, কনসেপ্ট বুঝে শেখার উপর জোর দেওয়া হয়",
    },
    {
      icon: Rocket,
      title: "পরীক্ষা প্রস্তুতি",
      desc: "বোর্ড ও ভর্তি পরীক্ষার জন্য বিশেষ প্রস্তুতি দেওয়া হয়",
    },
  ];

  // ===================Partnership Section Data====================

  const shareholders = [
    {
      name: "জন ডো",
      father: "মোঃ আবুল কালাম",
      email: "john.doe@example.com",
      mobile: "0123456789",
      nid: "1234567890",
      imageUrl: "https://picsum.photos/200/300?random=1",
      publicUrl: "https://example.com/john-doe",
      about:
        "জন ডো একজন অভিজ্ঞ শেয়ার হোল্ডার, যিনি ১০ বছরেরও বেশি সময় ধরে শেয়ার হোল্ডারদের সাথে কাজ করছেন।",
    },
    {
      name: "জেন ডো",
      father: "মোঃ আবুল কালাম",
      email: "jane.doe@example.com",
      mobile: "0987654321",
      nid: "0987654321",
      imageUrl: "https://picsum.photos/200/300?random=2",
      publicUrl: "https://example.com/jane-doe",
      about:
        "জেন ডো একজন অভিজ্ঞ শেয়ার হোল্ডার, যিনি ৮ বছরেরও বেশি সময় धरे शेर होल्डरदें साथे काम करছें।",
    },
  ];

  // ====================Target Education Section Data====================

  const steps = [
    {
      icon: Target,
      title: "লক্ষ্য নির্ধারণ",
      desc: "প্রতিটি শিক্ষার্থীর জন্য নির্দিষ্ট লক্ষ্য নির্ধারণ করা হয়",
    },
    {
      icon: CalendarCheck,
      title: "পরিকল্পিত সিলেবাস",
      desc: "লক্ষ্য অনুযায়ী পরিকল্পিত সিলেবাস তৈরি করা হয়",
    },
    {
      icon: BookCheck,
      title: "নিয়মিত প্র্যাকটিস",
      desc: "সাপ্তাহিক পরীক্ষা ও অনুশীলনের মাধ্যমে প্রস্তুতি",
    },
    {
      icon: Trophy,
      title: "সফলতা অর্জন",
      desc: "পরিশ্রম ও গাইডেন্সের মাধ্যমে কাঙ্ক্ষিত ফলাফল",
    },
  ];

  // =============Success Guarantee Section Data=================

  const itemsSuccess = [
    {
      icon: Target,
      title: "লক্ষ্যভিত্তিক প্রস্তুতি",
      desc: "বোর্ড ও ভর্তি পরীক্ষার জন্য নির্দিষ্ট পরিকল্পনায় পড়ানো হয়",
    },
    {
      icon: Star,
      title: "সেরা ফলাফল",
      desc: "আমাদের শিক্ষার্থীরা প্রতি বছর সেরা ফলাফল অর্জন করে",
    },
    {
      icon: ShieldCheck,
      title: "গাইডেন্স ও মনিটরিং",
      desc: "প্রতিটি শিক্ষার্থীর অগ্রগতি নিয়মিত পর্যবেক্ষণ করা হয়",
    },
    {
      icon: Trophy,
      title: "সাফল্যের নিশ্চয়তা",
      desc: "সঠিক গাইডলাইন ও পরিশ্রমের মাধ্যমে সফলতা নিশ্চিত",
    },
  ];

  const statsSuccess = [
    { value: "৯৫%", label: "সাফল্যের হার" },
    { value: "১০০০+", label: "ভর্তি পরীক্ষায় সফল" },
    { value: "৫০০+", label: "বোর্ড পরীক্ষায় GPA-5" },
  ];

  return (
    <View className="h-screen flex flex-col items-center justify-start bg-[#1A6652]">
      <ScrollView className="w-full h-full">
        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex items-center justify-start space-y-4 mt-4 py-4">
            <Text className="text-3xl font-bold text-[#38CC7C]">
              গ্র্যাভিটন একাডেমি
            </Text>
            <Text className="text-lg text-white ">
              এসো বিজ্ঞানের আড্ডায় মাতি
            </Text>
          </View>

          {/* Features Grid */}
          <View className="w-full ">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl  border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer flex flex-row items-start space-x-4 mb-4 p-4"
                >
                  <View className="w-16 h-16 flex items-center justify-center  text-white bg-[#38CC7C]/30 rounded-lg">
                    <Icon size={30} color="#38CC7C" />
                  </View>

                  <View className="px-4 pb-4">
                    <Text className="text-lg font-semibold text-white">
                      {feature.title}
                    </Text>
                    <Text className="text-white/70 mt-1">
                      {feature.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View className="w-full flex flex-col items-center justify-center mt-2 space-y-4">
            <TouchableOpacity
              onPress={() => router.push("/screen/AdmissionForm")}
              className="w-full flex flex-row space-x-4 items-center justify-center bg-[#38CC7C] px-6 py-3 rounded-lg mb-4"
            >
              <View className="mr-4">
                <ArrowUpRight size={28} color="#000" />
              </View>
              <Text className=" font-semibold text-xl">Admission</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full space-x-2 flex flex-row  items-center justify-center bg-[#38CC7C]/30 px-6 py-3 rounded-lg">
              <View className="mr-4">
                <BanknoteArrowDown size={28} color="#fff" />
              </View>
              <Text className=" font-semibold text-xl text-white">
                Our courses
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View className="w-full flex-row items-center justify-around mt-6">
              {stats.map((stat, index) => (
                <View key={index} className="flex items-center justify-center">
                  <Text className="text-2xl font-bold text-[#38CC7C]">
                    {stat.value}
                  </Text>
                  <Text className="text-white/70 mt-1">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
        {/* Talent Hunt Section */}
        <LinearGradient
          colors={["#f0efeb", "#edf6f9", "#f8f9fa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#38CC7C]">
              ট্যালেন্ট হান্ট
            </Text>
            <Text className="text-[#172330]/80 mt-2 w-full text-center">
              মেধাবীদের সন্ধানে আমাদের বিশেষ ট্যালেন্ট হান্ট প্রোগ্রাম। প্রতিটি
              আয়োজনে রয়েছে অসাধারণ কিছু প্রতিভার সন্ধান।
            </Text>
          </View>
          <ScrollView horizontal className="w-full py-4">
            {talentHuntData.map((talent, index) => (
              <View
                key={index}
                className="w-80 flex-shrink-0  mr-4 bg-white backdrop-blur-sm  border   transition-all duration-300 cursor-pointer p-6 border-[#38CC7C] shadow-lg rounded-2xl"
              >
                <Text className="text-lg font-semibold text-center">
                  {talent.title}
                </Text>
                <Image
                  source={{ uri: talent.bannerUrl }}
                  className="w-full h-48 object-cover  mt-2 rounded-2xl"
                />
                <View className="mt-2">
                  <Text className="font-semibold">ফিল্ডস:</Text>
                  {talent?.examDetails?.map((exam, idx) => (
                    <View
                      key={idx}
                      className="flex flex-row  items-center  mt-1"
                    >
                      <Text className="">{exam.className}</Text>
                      <Text className="ml-2">({exam.vanue})</Text>
                      <Text className="ml-2">({exam.date})</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity className="w-full flex flex-row space-x-2 items-center justify-center px-6 py-3 rounded-lg mt-4 border border-[#38CC7C]">
                  <View className="mr-4">
                    <CircleChevronRight size={16} color="#38CC7C" />
                  </View>
                  <Text className="text-[#38CC7C] font-semibold">
                    বিস্তারিত দেখুন
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
        {/* ============Teacher Section=================== */}
        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#f0efeb]">
              আমাদের শিক্ষকমণ্ডলী
            </Text>
            <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
              দেশের খ্যাতনামা বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী, অভিজ্ঞ ও
              প্রশিক্ষিত শিক্ষকদের নিয়ে গঠিত আমাদের দক্ষ টিম। প্রতিটি শিক্ষক
              শিক্ষার্থীদের সাফল্যের জন্য নিবেদিতপ্রাণ।
            </Text>
          </View>
          <ScrollView horizontal className="w-full py-4">
            {teachersData.map((teacher, index) => (
              <View
                key={index}
                className="w-80 flex-shrink-0 items-center justify-center  mr-4 bg-white backdrop-blur-sm  border border-t-8  transition-all duration-300 cursor-pointer p-2 border-[#38CC7C] shadow-lg rounded-2xl"
              >
                <Image
                  source={{ uri: teacher.photoUrl }}
                  className="w-40 h-40 object-cover  mt-2 rounded-full"
                />
                <Text className="text-lg font-semibold mt-2 text-center">
                  {teacher.name}
                </Text>
                <View className="flex flex-row items-center justify-center space-x-2">
                  <Text className="mr-2">
                    <Briefcase size={16} color="#38CC7C" />
                  </Text>
                  <Text className="text-center text-[#38CC7C] flex items-center justify-center">
                    {teacher.designation}
                  </Text>
                </View>
                <Text className="text-xs  mt-2 text-center">
                  ID: {teacher.public_id}
                </Text>
                <View className="w-full flex-row items-center justify-around mt-2">
                  <View className="flex flex-col items-center justify-center space-y-1">
                    <Clock size={16} color="#38CC7C" />
                    <Text>অভিজ্ঞতা</Text>
                    <Text>{teacher.experience}</Text>
                  </View>
                  <View className="flex flex-col items-center justify-center space-y-1">
                    <GraduationCap size={16} color="#38CC7C" />
                    <Text>শিক্ষাগত যোগ্যতা</Text>
                    <Text>{teacher.qualification}</Text>
                  </View>
                </View>
                <View className="w-full mt-2 flex flex-col items-start justify-start">
                  <Text className="font-semibold text-sm text-gray-800">
                    বিশেষায়িত ক্ষেত্র:
                  </Text>
                  <View className="w-full flex flex-row items-start justify-start">
                    {teacher?.subjects?.map((subject, idx) => (
                      <Text
                        key={idx}
                        className="ml-2 bg-gray-200/50 text-gray-800 px-2 py-1 rounded-full text-xs mt-1"
                      >
                        {subject}
                      </Text>
                    ))}
                  </View>
                  <View className="w-full flex-row items-center justify-start mt-2 bg-orange-200/50 px-2 py-1 rounded-lg">
                    <Trophy size={16} color="#ff9f43" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {teacher.achievements}
                    </Text>
                  </View>
                </View>
                <View className="w-full flex-row items-center justify-start mt-2 bg-blue-200/50 px-2 py-1 rounded-lg">
                  <Mail size={16} color="#38CC7C" />
                  <Text className="text-sm text-gray-600 ml-2">
                    {teacher.email}
                  </Text>
                </View>
                <View className="w-full flex-row items-center justify-start mt-2 bg-green-200/50 px-2 py-1 rounded-lg">
                  <Phone size={16} color="#38CC7C" />
                  <Text className="text-sm text-gray-600 ml-2">
                    {teacher.phone}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
        {/* ===================Made Easy=================== */}
        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
          id="madeeasy"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#f0efeb]">
              Made Easy শিক্ষা পদ্ধতি
            </Text>
            <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
              জটিল বিষয়গুলোকে সহজ ও আকর্ষণীয়ভাবে শেখানোর জন্য আমাদের বিশেষ “Made
              Easy” পদ্ধতি ব্যবহার করা হয়।
            </Text>
            <ScrollView horizontal className=" mt-2">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View
                    key={index}
                    className="w-80 ml-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-center"
                  >
                    <View className="flex items-center justify-center mb-4">
                      <View className="flex flex-col items-center justify-center w-16 h-16 p-4 bg-[#38CC7C]/20 rounded-xl text-[#38CC7C]">
                        <Icon size={28} color="#38CC7C" />
                      </View>
                    </View>
                    <Text className="text-[#f0efeb] font-bold text-lg text-center">
                      {item.title}
                    </Text>
                    <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
                      {item.desc}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </LinearGradient>
        {/* ======================Partnership==================== */}
        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#f0efeb]">
              আমাদের শেয়ার হোল্ডারগণ
            </Text>
            <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
              আমাদের শেয়ার হোল্ডারগণ আমাদের সফটওয়্যার এবং সেবা উন্নয়নে অবদান
              রাখছেন।
            </Text>
            <ScrollView horizontal className="mt-2 ">
              {shareholders.map((shareholder, index) => (
                <View
                  key={index}
                  className="w-80 ml-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#215848", "#38CC7C", "#38CC7C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-full h-24 flex items-center justify-center rounded-2xl relative"
                  >
                    <Text className="absolute left-0 top-0 m-2 py-1 px-2 text-sm bg-white/10 rounded-full border border-gray-400 text-white">
                      # {index + 1}
                    </Text>
                  </LinearGradient>
                  <View className="w-full flex flex-col items-center justify-center bg-white">
                    <Image
                      source={{ uri: shareholder.imageUrl }}
                      className="w-32 h-32 object-cover rounded-full -mt-16 border-4 border-white shadow-lg mx-auto"
                    />
                    <Text className="text-lg font-semibold mt-2 text-center">
                      {shareholder.name}
                    </Text>
                    <Text className="text-sm text-[#215848]  text-center">
                      {shareholder.father}
                    </Text>
                    <View className="w-full flex flex-col items-start justify-start mt-2 p-4">
                      <View className="w-full flex-row items-center justify-start mt-2 bg-yellow-200/50  p-2 ">
                        <Text className="text-xs font-medium">এনআইডি:</Text>
                        <Text className="text-xs">{shareholder.nid}</Text>
                      </View>
                      <View className="w-full flex-row items-center justify-start mt-2 bg-green-200/50  p-2 ">
                        <Text className="text-xs font-medium">মোবাইল:</Text>
                        <Text className="text-xs">{shareholder.mobile}</Text>
                      </View>
                      <View className="w-full flex-row items-center justify-start mt-2 bg-rose-200/50 p-2 ">
                        <Text className="text-xs font-medium">ইমেইল:</Text>
                        <Text className="text-xs">{shareholder.email}</Text>
                      </View>
                      <View className="w-full flex-col items-start justify-start mt-2 bg-blue-200/50  p-2  ">
                        <Text className=" text-xs font-medium">সম্পর্কে:</Text>
                        <Text className=" text-xs text-justify">
                          {shareholder.about}
                        </Text>
                      </View>
                    </View>
                    <LinearGradient
                      colors={["#215848", "#38CC7C", "#38CC7C"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="w-full h-12 flex items-center justify-center rounded-b-2xl "
                    >
                      <Text className="text-white font-semibold text-sm">
                        গ্র্যাভিটন একাডেমি
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </LinearGradient>
        {/* ================= Target Education Section ================= */}

        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#f0efeb]">
              লক্ষ্য নির্ভর শিক্ষা
            </Text>
            <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
              প্রতিটি শিক্ষার্থীর সফলতার জন্য নির্দিষ্ট লক্ষ্য নির্ধারণ করে
              পরিকল্পিতভাবে পড়ানো হয়।
            </Text>
            <ScrollView horizontal className=" mt-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <View
                    key={index}
                    className="w-60  bg-white/10 rounded-lg p-4 m-2 flex flex-col items-center justify-center "
                  >
                    <Icon color="#f0efeb" />
                    <Text className="text-white text-center mt-2">
                      {step.title}
                    </Text>
                    <Text className="text-white/70 text-center mt-1">
                      {step.desc}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </LinearGradient>

        {/* Success Guarantee Section */}
        <LinearGradient
          colors={["#172330", "#2D4A5A", "#38CC7C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full  flex items-center justify-center p-4"
        >
          <View className="w-full flex flex-col items-center justify-center space-y-4  py-4">
            <Text className="w-full text-center text-2xl font-bold text-[#f0efeb]">
              সাফল্যের নিশ্চয়তা
            </Text>
            <Text className="text-[#f0efeb]/80 mt-2 w-full text-center">
              আমাদের শিক্ষার্থীদের সফলতার জন্য নির্দিষ্ট পরিকল্পনা
            </Text>
            <View className="w-full flex flex-row items-center justify-center ">
              {statsSuccess.map((stat, index) => (
                <View key={index} className="p-4">
                  <Text className="text-white text-lg font-bold text-center">
                    {stat.value}
                  </Text>
                  <Text className="text-white/70 text-center mt-1 text-xs">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
            <ScrollView horizontal className=" mt-2">
              {itemsSuccess.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View
                    key={index}
                    className="w-60  bg-white/10 rounded-lg p-4 m-2 flex flex-col items-center justify-center "
                  >
                    <Icon color="#f0efeb" />
                    <Text className="text-white text-center mt-2">
                      {item.title}
                    </Text>
                    <Text className="text-white/70 text-center mt-1">
                      {item.desc}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity className="w-full flex flex-row space-x-2 items-center justify-center px-6 py-3 rounded-lg mt-4 border border-[#38CC7C] bg-[#38CC7C]">
              <Text className="text-white font-bold">এখনই ভর্তি হও</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Home;
