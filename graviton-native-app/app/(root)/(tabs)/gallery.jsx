// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   Dimensions,
// } from "react-native";
// // expo-video থেকে নতুন API গুলো ইমপোর্ট করা হলো
// import { useVideoPlayer, VideoView } from "expo-video";
// import { X } from "lucide-react-native";

// const { width } = Dimensions.get("window");

// // লিস্টের থাম্বনেইলের জন্য আলাদা ভিডিও কম্পোনেন্ট
// const ListVideoItem = ({ uri }) => {
//   const player = useVideoPlayer(uri, (player) => {
//     player.loop = true;
//     player.pause(); // লিস্টে অটো-প্লে হবে না
//   });

//   return (
//     <VideoView
//       player={player}
//       style={{ width: "100%", height: 150 }}
//       contentFit="cover" // resizeMode এর বদলে contentFit
//       nativeControls={false} // useNativeControls এর বদলে nativeControls
//     />
//   );
// };

// // মোডালের ভেতরে ফুল ভিডিও প্লে করার জন্য আলাদা কম্পোনেন্ট
// const ModalVideoItem = ({ uri }) => {
//   const player = useVideoPlayer(uri, (player) => {
//     player.loop = true;
//     player.play(); // মোডাল ওপেন হলে অটো-প্লে হবে
//   });

//   return (
//     <VideoView
//       player={player}
//       style={{ width: "100%", height: width * 0.6 }}
//       contentFit="contain"
//       nativeControls={true}
//       allowsFullscreen
//       allowsPictureInPicture
//     />
//   );
// };

// const Gallery = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [galleryItems, setGalleryItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     fetch(
//       `${process.env.EXPO_PUBLIC_BASE_URL}/api/gallery?category=${selectedCategory}`,
//     )
//       .then((res) => res.json())
//       .then((data) => setGalleryItems(data))
//       .catch((err) => console.log(err));
//   }, [selectedCategory]);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => setSelectedItem(item)}
//       className="w-1/2 p-2"
//     >
//       <View className="bg-white/10 rounded-xl overflow-hidden">
//         {item.type === "video" ? (
//           // নতুন লিস্ট কম্পোনেন্ট কল করা হলো
//           <ListVideoItem uri={item.image} />
//         ) : (
//           <Image
//             source={{ uri: item.image }}
//             className="w-full h-[150px]"
//             resizeMode="cover"
//           />
//         )}

//         <View className="p-2">
//           <Text className="text-white text-sm font-bold">{item.title}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-[#17202F] p-2">
//       <FlatList
//         data={galleryItems}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Modal */}
//       <Modal visible={!!selectedItem} transparent animationType="fade">
//         <View className="flex-1 bg-black/90 justify-center items-center">
//           <Pressable
//             onPress={() => setSelectedItem(null)}
//             className="absolute top-10 right-5 z-20 p-2 bg-black/40 rounded-full"
//           >
//             <X color="white" size={28} />
//           </Pressable>

//           <View className="w-full max-w-[90%]">
//             {selectedItem?.type === "video" ? (
//               // নতুন মোডাল কম্পোনেন্ট কল করা হলো
//               <ModalVideoItem uri={selectedItem.image} />
//             ) : (
//               <Image
//                 source={{ uri: selectedItem?.image }}
//                 className="w-full h-[300px] rounded-xl"
//                 resizeMode="contain"
//               />
//             )}

//             <View className="p-4">
//               <Text className="text-white text-lg font-bold mb-2">
//                 {selectedItem?.title}
//               </Text>
//               <Text className="text-white/70">{selectedItem?.description}</Text>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  Camera,
  Video,
  Users,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  Filter,
  Grid,
  List,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Image as ImageIcon,
  Star,
  Clock,
  MapPin,
  Download,
  X,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

// List Video Component
const ListVideoItem = ({ uri }) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.pause();
  });

  return (
    <View style={{ width: "100%", height: 200 }}>
      <VideoView
        player={player}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        nativeControls={false}
      />
    </View>
  );
};

// Modal Video Component
const ModalVideoItem = ({ uri }) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      style={{ width: width - 40, height: (width - 40) * 0.6 }}
      contentFit="contain"
      nativeControls={true}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryItems, setGalleryItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const galleryCategories = [
    { id: "all", label: "সব ক্যাটাগরি", count: 156, icon: Grid },
    {
      id: "events",
      label: "ইভেন্টসমূহ",
      count: 45,
      icon: Calendar,
      color: ["#3b82f6", "#06b6d4"],
    },
    {
      id: "classes",
      label: "ক্লাসরুম",
      count: 38,
      icon: BookOpen,
      color: ["#10b981", "#059669"],
    },
    {
      id: "achievements",
      label: "সাফল্য",
      count: 28,
      icon: Award,
      color: ["#f59e0b", "#d97706"],
    },
    {
      id: "students",
      label: "শিক্ষার্থী জীবন",
      count: 32,
      icon: Users,
      color: ["#8b5cf6", "#ec489a"],
    },
    {
      id: "campus",
      label: "ক্যাম্পাস",
      count: 13,
      icon: MapPin,
      color: ["#ef4444", "#f43f5e"],
    },
  ];

  const stats = [
    {
      label: "মোট ছবি",
      value: "৫৬০+",
      icon: ImageIcon,
      color: "#3b82f6",
    },
    {
      label: "ভিডিও গ্যালারি",
      value: "৮০+",
      icon: Video,
      color: "#8b5cf6",
    },
    {
      label: "ইভেন্ট কভারেজ",
      value: "২০০+",
      icon: Calendar,
      color: "#10b981",
    },
    {
      label: "সক্রিয় ভিউয়ার",
      value: "৫K+",
      icon: Users,
      color: "#f59e0b",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/gallery?category=${selectedCategory}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setGalleryItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item)}
      className=" m-2"
      style={{ flex: 1, margin: 8 }}
    >
      <View className="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
        {/* Image/Video Container */}
        <View className="relative">
          {item.type === "video" ? (
            <ListVideoItem uri={item.image} />
          ) : (
            <Image
              source={{ uri: item.image }}
              className="w-full h-48"
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
          )}

          {/* Type Badge */}
          <View className="absolute top-3 left-3">
            <LinearGradient
              colors={
                item.type === "video"
                  ? ["#ef4444", "#dc2626"]
                  : ["#3b82f6", "#2563eb"]
              }
              className="px-3 py-1 rounded-full"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="flex-row items-center gap-1">
                {item.type === "video" ? (
                  <Video size={12} color="white" />
                ) : (
                  <ImageIcon size={12} color="white" />
                )}
                <Text className="text-white text-xs font-medium">
                  {item.type === "video" ? "ভিডিও" : "ছবি"}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Category Badge */}
          <View className="absolute top-3 right-3">
            <LinearGradient
              colors={
                galleryCategories.find((c) => c.id === item.category)
                  ?.color || ["#6b7280", "#4b5563"]
              }
              className="w-8 h-8 rounded-full items-center justify-center"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {React.createElement(
                galleryCategories.find((c) => c.id === item.category)?.icon ||
                  Camera,
                {
                  size: 16,
                  color: "white",
                },
              )}
            </LinearGradient>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white/70 text-xs font-kalpurush">
              {item.date}
            </Text>
            <View className="flex-row items-center gap-1">
              <Star size={14} color="#3BD480" fill="#3BD480" />
              <Text className="text-[#3BD480] text-xs">{item.likes}</Text>
            </View>
          </View>

          <Text
            className="text-white text-base font-bold mb-2 font-kalpurush"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            className="text-white/80 text-xs mb-3 font-kalpurush"
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {/* Tags */}
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-3"
          >
            <View className="flex-row gap-2">
              {item.tags?.slice(0, 3).map((tag) => (
                <View key={tag} className="px-2 py-1 bg-white/10 rounded-full">
                  <Text className="text-white/80 text-xs font-kalpurush">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView> */}

          {/* Stats */}
          <View className="flex-row justify-between items-center pt-3 border-t border-white/20">
            {/* <View className="flex-row gap-4">
              <View className="flex-row items-center gap-1">
                <Heart size={14} color="#fff" />
                <Text className="text-white/70 text-xs">{item.likes}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <MessageCircle size={14} color="#fff" />
                <Text className="text-white/70 text-xs">{item.comments}</Text>
              </View>
            </View> */}

            <View className="flex-row items-center gap-1">
              <Text className="text-[#3BD480] text-xs font-kalpurush">
                বিস্তারিত দেখুন
              </Text>
              <ChevronRight size={12} color="#3BD480" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item)}
      className="mx-4 mb-4"
    >
      <View className="bg-white/10 rounded-2xl overflow-hidden border border-white/20 flex-row">
        {/* Thumbnail */}
        <View className="w-1/3 relative">
          {item.type === "video" ? (
            <View style={{ width: "100%", height: 140 }}>
              <ListVideoItem uri={item.image} />
            </View>
          ) : (
            <Image
              source={{ uri: item.image }}
              className="w-full h-36"
              style={{ width: "100%", height: 140 }}
              resizeMode="cover"
            />
          )}

          {/* Type Badge */}
          <View className="absolute top-2 left-2">
            <LinearGradient
              colors={
                item.type === "video"
                  ? ["#ef4444", "#dc2626"]
                  : ["#3b82f6", "#2563eb"]
              }
              className="px-2 py-1 rounded-full"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="flex-row items-center gap-1">
                {item.type === "video" ? (
                  <Video size={10} color="white" />
                ) : (
                  <ImageIcon size={10} color="white" />
                )}
                <Text className="text-white text-[10px] font-medium">
                  {item.type === "video" ? "ভিডিও" : "ছবি"}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 p-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-white/70 text-xs font-kalpurush">
              {item.date}
            </Text>
            <View className="flex-row items-center gap-1">
              <Star size={12} color="#3BD480" fill="#3BD480" />
              <Text className="text-[#3BD480] text-xs">{item.likes}</Text>
            </View>
          </View>

          <Text
            className="text-white text-sm font-bold mb-1 font-kalpurush"
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text
            className="text-white/80 text-xs mb-2 font-kalpurush"
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {/* Tags */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-2"
          >
            <View className="flex-row gap-1">
              {item.tags?.slice(0, 2).map((tag) => (
                <View
                  key={tag}
                  className="px-2 py-0.5 bg-white/10 rounded-full"
                >
                  <Text className="text-white/80 text-[10px] font-kalpurush">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Stats */}
          <View className="flex-row justify-between items-center pt-2 border-t border-white/20">
            <View className="flex-row gap-3">
              <View className="flex-row items-center gap-1">
                <Heart size={12} color="#fff" />
                <Text className="text-white/70 text-xs">{item.likes}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <MessageCircle size={12} color="#fff" />
                <Text className="text-white/70 text-xs">{item.comments}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-1">
              <Text className="text-[#3BD480] text-[10px] font-kalpurush">
                বিস্তারিত
              </Text>
              <ChevronRight size={10} color="#3BD480" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(category.id)}
      className={`px-4 py-2 rounded-full border mr-2 ${
        selectedCategory === category.id
          ? "bg-[#3BD480] border-transparent"
          : "bg-white/10 border-white/20"
      }`}
    >
      <View className="flex-row items-center gap-2">
        {React.createElement(category.icon, {
          size: 16,
          color: selectedCategory === category.id ? "#fff" : "#fff",
        })}
        <Text
          className={`font-medium ${
            selectedCategory === category.id ? "text-white" : "text-white/90"
          }`}
        >
          {category.label}
        </Text>
        <View
          className={`px-1.5 py-0.5 rounded-full ${
            selectedCategory === category.id ? "bg-white/20" : "bg-white/10"
          }`}
        >
          <Text
            className={`text-xs ${
              selectedCategory === category.id ? "text-white" : "text-white/80"
            }`}
          >
            {category.count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#17202F]">
      <LinearGradient
        colors={["#17202F", "#134C45", "#3BD480"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="pt-12 pb-8">
            {/* Header */}
            <View className="px-6 mb-8">
              <Text className="text-4xl text-white text-center font-bold py-2">
                গ্র্যাভিটন গ্যালারি
              </Text>
              <Text className="text-lg text-[#3BD480] text-center font-bold mb-4">
                মুহুর্তগুলো অমর হোক
              </Text>
              <Text className="text-base text-white/80 text-center leading-6">
                আমাদের সাফল্য, আনন্দ, শিক্ষাদান ও সৃজনশীলতার মুহুর্তগুলো
                ক্যামেরাবন্দী। প্রতিটি ছবি ও ভিডিও আমাদের যাত্রার জীবন্ত সাক্ষী।
              </Text>
            </View>

            {/* Stats Section */}
            <View className="flex-row flex-wrap px-4 mb-8">
              {stats.map((stat, index) => (
                <View key={index} className="w-1/2 p-2">
                  <BlurView
                    intensity={20}
                    className="rounded-2xl overflow-hidden"
                  >
                    <View className="p-4 border border-white/20 rounded-2xl">
                      <View className="flex-row justify-between items-center mb-3">
                        <View className="p-2 bg-white/10 rounded-xl">
                          {React.createElement(stat.icon, {
                            size: 24,
                            color: stat.color,
                          })}
                        </View>
                        <Text className="text-2xl font-bold text-white">
                          {stat.value}
                        </Text>
                      </View>
                      <Text className="text-sm text-white/70">
                        {stat.label}
                      </Text>
                    </View>
                  </BlurView>
                </View>
              ))}
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6 px-4"
            >
              {galleryCategories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </ScrollView>

            {/* Gallery Content */}
            {loading ? (
              <View className="py-20">
                <ActivityIndicator size="large" color="#3BD480" />
              </View>
            ) : viewMode === "grid" ? (
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item._id}
                renderItem={renderGridItem}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 8 }}
              />
            ) : (
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item._id}
                renderItem={renderListItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Modal */}
      <Modal visible={!!selectedItem} transparent animationType="fade">
        <View className="flex-1 bg-black/90">
          <TouchableOpacity
            onPress={() => setSelectedItem(null)}
            className="absolute top-12 right-5 z-20 p-2 bg-black/40 rounded-full"
          >
            <X size={28} color="white" />
          </TouchableOpacity>

          <View className="flex-1 justify-center items-center px-5">
            <View className="w-full">
              {selectedItem?.type === "video" ? (
                <ModalVideoItem uri={selectedItem.image} />
              ) : (
                <Image
                  source={{ uri: selectedItem?.image }}
                  className="w-full rounded-xl"
                  style={{ width: "100%", height: height * 0.5 }}
                  resizeMode="contain"
                />
              )}

              <View className="mt-4">
                <Text className="text-white text-xl font-bold mb-2 text-center">
                  {selectedItem?.title}
                </Text>
                <Text className="text-white/70 text-center leading-5">
                  {selectedItem?.description}
                </Text>

                <View className="flex-row justify-center items-center gap-6 mt-4">
                  <View className="flex-row items-center gap-2">
                    <Heart size={20} color="#3BD480" />
                    <Text className="text-white">{selectedItem?.likes}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MessageCircle size={20} color="#3BD480" />
                    <Text className="text-white">{selectedItem?.comments}</Text>
                  </View>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Share2 size={20} color="#3BD480" />
                    <Text className="text-white">শেয়ার</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Gallery;
