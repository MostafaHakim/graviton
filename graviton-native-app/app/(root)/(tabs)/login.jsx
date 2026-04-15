import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lock, LogIn, User } from "lucide-react-native";
import Logo from "../../../assets/icon.png";
const Login = () => {
  return (
    <View className="h-screen flex flex-col items-start justify-start bg-[#172330] py-10">
      <LinearGradient
        colors={["#172330", "#2D4A5A", "#38CC7C"]}
        className="w-full h-screen flex items-start justify-start p-6"
      >
        <View className=" w-full  flex items-center justify-center py-4">
          <Image source={Logo} className="w-16 h-16 mb-2" />
          <Text className="text-3xl font-bold text-white text-center py-1">
            গ্র্যাভিটন একাডেমি
          </Text>
          <Text className="w-full text-3xl font-bold text-[#38CC7C] mb-2 text-center py-1">
            লগইন পোর্টাল
          </Text>
          <Text className="text-lg text-white mb-4 text-center">
            আপনার অ্যাকাউন্টে প্রবেশ করুন এবং বিশেষ সুবিধা পান
          </Text>
          <View className="w-full max-w-md bg-white/10 rounded-2xl border border-white/30 p-6">
            <View className="flex flex-col mb-4">
              <View className="mb-4 flex flex-row items-center justify-start">
                <Text className="mr-2">
                  <User size={16} color="white" />
                </Text>
                <Text className="text-white ">ব্যবহারকারীর ইউজার আইডি</Text>
              </View>
              <TextInput
                placeholder="Enter Your Login ID"
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50"
              />
            </View>
            <View className="flex flex-col mb-4">
              <View className="mb-4 flex flex-row items-center justify-start">
                <Text className="mr-2">
                  <Lock size={16} color="white" />
                </Text>
                <Text className="text-white ">পাসওয়ার্ড</Text>
              </View>
              <TextInput
                placeholder="Enter Your Password"
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50"
              />
            </View>
            <TouchableOpacity className="flex flex-row items-center justify-center bg-[#38CC7C] rounded-lg py-3 mt-4">
              <LogIn size={16} color="white" className="mx-auto mb-1" />
              <Text className="text-center text-white font-bold ml-2  ">
                লগইন
              </Text>
            </TouchableOpacity>
            <Text className="text-white text-center mt-4">
              কোনো সমস্যা হলে সাপোর্টে যোগাযোগ করুন
            </Text>
          </View>
          <Text className="text-white/30 text-center mt-4">
            © ২০২৬ গ্র্যাভিটন একাডেমি। সকল অধিকার সংরক্ষিত।
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;
