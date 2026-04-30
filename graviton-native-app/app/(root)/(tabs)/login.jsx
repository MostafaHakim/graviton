import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lock, LogIn, User } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Logo from "../../../assets/icon.png";
import { loginUser } from "../../../store/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  useEffect(() => {
    if (user && token) {
      router.replace("/(root)/screen/dashboard");
    }
  }, [user, token]);

  const handleLogin = async () => {
    if (!formData.userId || !formData.password) {
      Alert.alert("Error", "Please enter both User ID and Password");
      return;
    }

    const res = await dispatch(loginUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/(root)/screen/dashboard");
    } else {
      Alert.alert("Login failed", res.payload || "Check your ID & Password");
    }
  };

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
                placeholder="Enter Your User ID"
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50"
                value={formData.userId}
                onChangeText={(text) =>
                  setFormData({ ...formData, userId: text })
                }
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
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                placeholder="Enter Your Password"
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50"
              />
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center bg-[#38CC7C] rounded-lg py-3 mt-4"
              onPress={handleLogin}
            >
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
