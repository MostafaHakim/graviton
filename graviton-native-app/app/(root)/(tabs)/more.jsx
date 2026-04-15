import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const More = () => {
  const tabs = [
    { id: 1, name: "Membership", path: "membership" },
    {
      id: 2,
      name: "Contact",
      path: "contact",
    },
  ];

  const Item = ({ title }) => (
    <View className="flex flex-row items-center justify-center ">
      <Text className="text-white ml-2">{title}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#172330", "#2D4A5A", "#38CC7C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full h-screen  flex items-center justify-center p-4"
    >
      <ScrollView className="w-full h-full">
        <View className="p-4 bg-white/5 rounded-t-2xl border-b-2 border-white/20">
          <Text className="text-white text-2xl">গ্র্যাভিটন একাডেমি</Text>
          <Text className="text-[#38CC7C]">Menu</Text>
        </View>
        <FlatList
          numColumns={2}
          data={tabs}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default More;
