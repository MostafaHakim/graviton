import { LinearGradient } from "expo-linear-gradient";
import {
  Award,
  Check,
  CheckCircle,
  MessageSquare,
  Send,
  Sparkle,
  Star,
  ThumbsUp,
} from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [line, setLine] = useState(false);
  return (
    <LinearGradient
      colors={["#172330", "#2D4A5A", "#38CC7C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full h-screen  flex items-center justify-start pt-10 pb-5"
    >
      <ScrollView className="w-full h-full">
        <View className="flex flex-col items-center">
          <Text className="text-3xl font-bold text-white ">আপনার</Text>
          <Text className="text-3xl font-bold text-[#38CC7C] ">
            অভিজ্ঞতা শেয়ার করুন
          </Text>
          <Text className="text-lg text-white mt-4 text-center max-w-md">
            আপনার চিন্তাভাবনা, পরামর্শ এবং অভিজ্ঞতা শেয়ার করে আমাদের উন্নত করতে
            সাহায্য করুন। প্রতিটি ফিডব্যাক আমাদেরকে উন্নতির দিকে আরো একধাপ
            এগিয়ে নিয়ে যায়।
          </Text>
        </View>
        <View className="flex flex-col items-center bg-white/10 rounded-lg p-6 mt-10 w-full max-w-md">
          <View className="w-full flex flex-row">
            <MessageSquare size={16} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-2">
              আপনার ফিডব্যাক দিন
            </Text>
          </View>
          <View className="w-full h-32 bg-white/5 border border-white/20 rounded-lg mt-4 p-4">
            <Text className="text-left text-white">সামগ্রিক রেটিং *</Text>

            <View className="flex flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    size={32}
                    color={
                      star <= rating
                        ? "#facc15" // yellow
                        : "rgba(255,255,255,0.4)"
                    }
                    fill={star <= rating ? "#facc15" : "transparent"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text className="ml-4 text-lg font-semibold text-white">
              {rating > 0 ? `${rating}.0` : "রেটিং নির্বাচন করুন"}
            </Text>
          </View>
          <View className="w-full flex flex-col mt-4">
            <Text className="text-left text-white">আপনার মন্তব্য *</Text>
            <TextInput
              placeholder="আপনার মন্তব্য লিখুন..."
              className="w-full h-24 bg-white/5 border border-white/20 rounded-lg mt-2 p-4  placeholder:text-white/50"
              multiline
            />
          </View>
          <View className="w-full flex flex-col mt-4">
            <Text className="text-left text-white">আপনার নাম</Text>
            <TextInput
              placeholder="আপনার নাম"
              className="w-full  bg-white/5 border border-white/20 rounded-lg mt-2 p-4  placeholder:text-white/50"
            />
          </View>
          <View className="w-full flex flex-col mt-4">
            <Text className="text-left text-white">আপনার ইমেইল</Text>
            <TextInput
              placeholder="আপনার ইমেইল"
              className="w-full  bg-white/5 border border-white/20 rounded-lg mt-2 p-4  placeholder:text-white/50"
            />
          </View>
          <View className="w-full flex flex-col mt-4">
            <Text className="text-left text-white">ফিডব্যাক বিভাগ</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              dropdownIconColor="white"
              style={{
                color: "white",
                borderColor: "white",
                borderRadius: 8,
                borderWidth: 1,
                borderRadius: 8,
                marginTop: 8,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              className="w-full  bg-white/5  border border-white/20 rounded-lg mt-2 p-4  text-white"
              placeholder="বিভাগ নির্বাচন করুন"
            >
              <Picker.Item
                className="text-white"
                label="সাধারণ ফিডব্যাক"
                value="general"
              />
              <Picker.Item
                className="text-white"
                label="শিক্ষার মান"
                value="teaching"
              />
              <Picker.Item
                className="text-white"
                label="সুবিধাসমূহ"
                value="facilities"
              />
              <Picker.Item
                className="text-white"
                label=" কোর্স কন্টেন্ট"
                value="courses"
              />
              <Picker.Item
                className="text-white"
                label="  শিক্ষার্থী সাপোর্ট"
                value="support"
              />
            </Picker>
          </View>
          <TouchableOpacity className="bg-[#38CC7C] flex flex-row rounded-lg py-3 px-6 mt-6">
            <Send size={16} color="white" className="mx-auto" />
            <Text className="text-center text-white font-bold ml-2">
              ফিডব্যাক জমা দিন
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex flex-row items-center justify-center mt-2">
            <View className="flex flex-row items-center justify-between px-4 py-1 bg-white/10 rounded-full border border-white/20">
              <MessageSquare size={16} color="#fff" />
              <Text className="text-white ml-2">সকল ফিডব্যাক</Text>
              <Text className="text-white ml-2 px-2 py-1 bg-white/20 rounded-full">
                124
              </Text>
            </View>
            <View className=" ml-2 flex flex-row items-center justify-between px-4 py-1 bg-white/10 rounded-full border border-white/20">
              <ThumbsUp size={16} color="#fff" />
              <Text className="text-white ml-2">ইতিবাচক</Text>
              <Text className="text-white ml-2 px-2 py-1 bg-white/20 rounded-full">
                89
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center justify-center mt-2">
            <View className=" ml-2 flex flex-row items-center justify-between px-4 py-1 bg-white/10 rounded-full border border-white/20">
              <Award size={16} color="#fff" />
              <Text className="text-white ml-2">গঠনমূলক</Text>
              <Text className="text-white ml-2 px-2 py-1 bg-white/20 rounded-full">
                25
              </Text>
            </View>
            <View className=" ml-2 flex flex-row items-center justify-between px-4 py-1 bg-white/10 rounded-full border border-white/20">
              <Sparkle size={16} color="#fff" />
              <Text className="text-white ml-2">ফিচার রিকুয়েস্ট</Text>
              <Text className="text-white ml-2 px-2 py-1 bg-white/20 rounded-full">
                10
              </Text>
            </View>
          </View>
          {/* ====================All Feedbacks====================== */}
          <View className="w-full p-4 mt-6">
            <View className="flex flex-col items-start justify-center p-2 bg-white/10 rounded-lg border border-white/20">
              <View className="flex flex-row items-center justify-center mt-1">
                <Text className="p-2  bg-[#38CC7C] text-white rounded-full font-semibold">
                  আ
                </Text>
                <Text className="text-white text-lg font-semibold ml-2">
                  আব্দুল সত্তার
                </Text>
              </View>
              <View className="flex flex-row items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} color="#facc15" fill="#facc15" />
                ))}
              </View>
              <Text
                className={`text-white mt-2 text-justify ${line ? "line-clamp-none" : "line-clamp-2"}`}
              >
                কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয় আরও উন্নত করা যেতে
                পারে। কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয় আরও উন্নত করা
                যেতে পারে। কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয় আরও উন্নত
                করা যেতে পারে।কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয় আরও উন্নত
                করা যেতে পারে। কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয় আরও
                উন্নত করা যেতে পারে। কোর্সের মান খুব ভালো ছিল, তবে কিছু বিষয়
                আরও উন্নত করা যেতে পারে।
              </Text>
              <TouchableOpacity onPress={() => setLine(!line)}>
                <Text className="text-white text-xs">See more...</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full p-4 mt-6">
            <View className="flex flex-col items-start justify-center p-2 bg-white/10 rounded-lg border border-white/20">
              <View className="flex flex-row items-center justify-center mt-1">
                <Award size={16} color="#38CC7C" />
                <Text className="text-white ml-2">ফিডব্যাক গাইডলাইন</Text>
              </View>
              {[
                "আপনার অভিজ্ঞতা সম্পর্কে নির্দিষ্ট হোন",
                "ইতিবাচক ও উন্নতির ক্ষেত্র উভয়ই উল্লেখ করুন",
                "গঠনমূলক পরামর্শ দিন",
                "প্রাসঙ্গিক হলে নির্দিষ্ট কোর্স বা শিক্ষকের নাম উল্লেখ করুন",
                "প্রযোজ্য হলে পরিমাপযোগ্য ফলাফল শেয়ার করুন",
              ].map((guideline, index) => (
                <View key={index} className="flex flex-row items-start mt-2">
                  <CheckCircle size={16} color="#38CC7C" className="mt-1" />
                  <Text className="text-white ml-2">{guideline}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Feedback;
