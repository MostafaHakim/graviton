import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import onboadring1 from "../../assets/oboard/1.png";
import onboadring2 from "../../assets/oboard/2.png";
import onboadring3 from "../../assets/oboard/3.png";

const Welcome = () => {
  const swiperRef = useRef(null);

  const onboarding = [
    { id: 1, title: "This is a educational app", image: onboadring1 },
    { id: 2, title: "Learn anytime anywhere", image: onboadring2 },
    { id: 3, title: "Start your journey today", image: onboadring3 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-[#134C45]">
      {/* Skip */}
      <TouchableOpacity
        onPress={() => router.replace("/(root)/(tabs)/home")}
        className="w-full flex-row justify-end p-5"
      >
        <Text className="font-bold text-white">Skip</Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-green-200 rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-white rounded-full" />
        }
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-start ">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-bold text-center">
              {item.title}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Bottom Button */}
      <TouchableOpacity
        onPress={() =>
          isLastSlide
            ? router.replace("/(root)/(tabs)/home")
            : swiperRef.current?.scrollBy(1)
        }
        className="absolute bottom-10 w-11/12 bg-green-500 mx-auto py-3 rounded-full self-center"
      >
        <Text className="text-xl font-semibold text-white text-center">
          {isLastSlide ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
