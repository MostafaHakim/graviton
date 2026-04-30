import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logoutUser } from "../../../store/auth/authSlice";
import { LogOut, User, BookOpen, Settings } from "lucide-react-native";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace("/(root)/(tabs)/login");
  };

  return (
    <ScrollView className="flex-1 bg-[#172330] p-6">
      <View className="flex flex-row justify-between items-center mb-8 mt-10">
        <View>
          <Text className="text-white text-2xl font-bold">Welcome,</Text>
          <Text className="text-[#38CC7C] text-xl font-semibold">
            {user?.studentName || "Student"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500/20 p-2 rounded-full border border-red-500/50"
        >
          <LogOut size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-6">
        <Text className="text-white/60 mb-2">Student ID</Text>
        <Text className="text-white text-lg font-bold">
          {user?.studentId || "N/A"}
        </Text>
      </View>

      <View className="flex flex-row flex-wrap justify-between">
        {[
          { title: "Profile", icon: User, color: "#3B82F6" },
          { title: "Courses", icon: BookOpen, color: "#38CC7C" },
          { title: "Settings", icon: Settings, color: "#F59E0B" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-[48%] bg-white/5 p-6 rounded-2xl border border-white/10 mb-4 items-center"
          >
            <View
              className="p-3 rounded-xl mb-3"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon size={24} color={item.color} />
            </View>
            <Text className="text-white font-semibold">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
