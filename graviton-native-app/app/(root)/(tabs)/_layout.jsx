import { Tabs } from "expo-router";
import {
  FlipHorizontal,
  GalleryHorizontal,
  Home,
  LogIn,
  MessageSquareHeart,
  User2,
  Users,
} from "lucide-react-native";

export default function Layout() {
  const tabs = [
    {
      title: "Membership",
      name: "membership",
      icon: Users,
    },

    {
      title: "Gallery",
      name: "gallery",
      icon: GalleryHorizontal,
    },
    {
      title: "Home",
      name: "home",
      icon: Home,
    },
    {
      title: "More",
      name: "more",
      icon: FlipHorizontal,
    },
    {
      title: "Feedback",
      name: "feedback",
      icon: MessageSquareHeart,
    },
    {
      title: "Login",
      name: "login",
      icon: LogIn,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#3BD480",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <tab.icon color={color} size={18} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
