import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryItems, setGalleryItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/gallery?category=${selectedCategory}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setGalleryItems(data);
        setLoading(false);
      });
  }, [selectedCategory]);

  const galleryCategories = [
    { id: "all", label: "সব ক্যাটাগরি", count: 156, icon: Grid },
    {
      id: "events",
      label: "ইভেন্টসমূহ",
      count: 45,
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "classes",
      label: "ক্লাসরুম",
      count: 38,
      icon: BookOpen,
      color: "from-emerald-500 to-green-500",
    },
    {
      id: "achievements",
      label: "সাফল্য",
      count: 28,
      icon: Award,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "students",
      label: "শিক্ষার্থী জীবন",
      count: 32,
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "campus",
      label: "ক্যাম্পাস",
      count: 13,
      icon: MapPin,
      color: "from-red-500 to-rose-500",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const stats = [
    {
      label: "মোট ছবি",
      value: "৫৬০+",
      icon: ImageIcon,
      color: "text-blue-500",
    },
    {
      label: "ভিডিও গ্যালারি",
      value: "৮০+",
      icon: Video,
      color: "text-purple-500",
    },
    {
      label: "ইভেন্ট কভারেজ",
      value: "২০০+",
      icon: Calendar,
      color: "text-emerald-500",
    },
    {
      label: "সক্রিয় ভিউয়ার",
      value: "৫K+",
      icon: Users,
      color: "text-amber-500",
    },
  ];

  const featuredVideo = {
    title: "গ্র্যাভিটন একাডেমি - এক নজরে",
    description: "আমাদের শিক্ষা ব্যবস্থা, সুযোগ-সুবিধা ও সাফল্যের গল্প",
    views: "১২,৫০০+",
    duration: "৪:৩০",
    thumbnail:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-gallery"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid-gallery)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            গ্র্যাভিটন গ্যালারি
            <span className="block text-[#3BD480]">মুহুর্তগুলো অমর হোক</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto font-kalpurush">
            আমাদের সাফল্য, আনন্দ, শিক্ষাদান ও সৃজনশীলতার মুহুর্তগুলো
            ক্যামেরাবন্দী। প্রতিটি ছবি ও ভিডিও আমাদের যাত্রার জীবন্ত সাক্ষী।
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-white/70 font-kalpurush">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3 relative group">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#3BD480] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {featuredVideo.views} ভিউ
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredVideo.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <h3 className="text-2xl font-bold text-white mb-3 font-kalpurush">
                  {featuredVideo.title}
                </h3>
                <p className="text-white/80 mb-6 font-kalpurush">
                  {featuredVideo.description}
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-kalpurush">
                  <Play className="w-5 h-5" />
                  সম্পূর্ণ ভিডিও দেখুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-kalpurush ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white border-transparent"
                    : "bg-white/10 border-white/20 text-white/90 hover:border-white/30"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white/20"
                      : "bg-white/10"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-[#3BD480] text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-[#3BD480] text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className={`mb-12 ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-6"}`}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 cursor-pointer ${
                viewMode === "list" ? "flex" : ""
              } hover:-translate-y-1`}
            >
              {/* Image/Video Thumbnail */}
              <div
                className={`${viewMode === "list" ? "w-1/3" : "aspect-square"} relative overflow-hidden`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.image}
                    className="w-full h-full object-cover"
                    controls
                    poster={item.thumbnail || ""} // চাইলে থাম্বনেইল দিতে পারো
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "video"
                        ? "bg-red-500/90 text-white"
                        : "bg-blue-500/90 text-white"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        ভিডিও
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        ছবি
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Gradient */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                      galleryCategories.find((c) => c.id === item.category)
                        ?.color || "from-gray-500 to-gray-700"
                    } flex items-center justify-center`}
                  >
                    {React.createElement(
                      galleryCategories.find((c) => c.id === item.category)
                        ?.icon || Camera,
                      {
                        className: "w-4 h-4 text-white",
                      },
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70 font-kalpurush">
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-[#3BD480] text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    {item.likes}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 font-kalpurush">
                  {item.title}
                </h3>

                <p className="text-white/80 text-sm mb-4 font-kalpurush">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full font-kalpurush"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/70">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{item.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#3BD480] text-sm font-kalpurush">
                    বিস্তারিত দেখুন
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />

            <div className="bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-kalpurush">
                {selectedImage.title}
              </h3>
              <p className="text-white/80 mb-4 font-kalpurush">
                {selectedImage.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-white hover:text-[#3BD480] transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{selectedImage.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-[#3BD480] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedImage.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-[#3BD480] transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>শেয়ার</span>
                  </button>
                </div>

                <span className="text-white/70 font-kalpurush">
                  {selectedImage.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
