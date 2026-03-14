import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  Award,
  Clock,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useDispatch, useSelector } from "react-redux";
import { getTalents } from "../store/features/auth/talentSlice";
import { useNavigate } from "react-router-dom";

const TalentHuntSection = () => {
  const { talents, loading } = useSelector((state) => state.talents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTalents());
  }, [dispatch]);

  if (!talents || talents.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3BD480] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-kalpurush mb-4">
              ট্যালেন্ট হান্ট
            </h2>

            <p className="text-white/70 mt-4 max-w-2xl mx-auto font-kalpurush text-lg">
              মেধাবীদের সন্ধানে আমাদের বিশেষ ট্যালেন্ট হান্ট প্রোগ্রাম। প্রতিটি
              আয়োজনে রয়েছে অসাধারণ কিছু প্রতিভার সন্ধান।
            </p>

            <div className="w-24 h-1 bg-gradient-to-r from-[#3BD480] to-[#134C45] mx-auto mt-6 rounded-full"></div>
          </motion.div>
        </div>

        {/* Main Slider - One item at a time */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className="talent-hunt-main-swiper"
        >
          {talents.map((talent, index) => (
            <SwiperSlide key={talent._id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Side - Banner Image */}
                    <div className="relative h-[300px] md:h-[450px] overflow-hidden group">
                      {talent.bannerUrl ? (
                        <>
                          <img
                            src={talent.bannerUrl}
                            alt={talent.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-transparent to-transparent opacity-60"></div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#3BD480]/30 to-[#134C45]/30 flex items-center justify-center">
                          <Users className="w-24 h-24 text-[#3BD480]/40" />
                        </div>
                      )}

                      {/* Featured Badge */}
                      {index === 0 && (
                        <div className="absolute top-6 left-6 bg-gradient-to-r from-[#3BD480] to-[#134C45] px-4 py-2 rounded-full">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            ফিচার্ড
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Side - Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      {/* Title */}
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4 font-kalpurush"
                      >
                        {talent.title}
                      </motion.h3>

                      {/* Description - if available */}
                      {talent.description && (
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-white/80 text-lg mb-6 leading-relaxed"
                        >
                          {talent.description}
                        </motion.p>
                      )}

                      {/* Key Fields/Categories */}
                      {talent.feilds && talent.feilds.length > 0 && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-3 mb-6"
                        >
                          <h4 className="text-[#3BD480] font-semibold text-lg mb-2">
                            গুরুত্বপূর্ণ বিষয়সমূহ:
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {talent.feilds.slice(0, 1).map((f, idx) => (
                              <div
                                key={f._id || idx}
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-[#3BD480] rounded-full"></div>
                                <span className="text-white/80">
                                  <span className="font-medium text-white">
                                    {f.lable}:
                                  </span>{" "}
                                  <span className="text-white/70">
                                    {f.value}
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Meta Information */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-4 mb-8"
                      >
                        {talent.date && (
                          <div className="flex items-center gap-2 text-white/70 bg-white/5 px-4 py-2 rounded-full">
                            <Calendar className="w-4 h-4 text-[#3BD480]" />
                            <span>
                              {new Date(talent.date).toLocaleDateString(
                                "bn-BD",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        )}

                        {talent.location && (
                          <div className="flex items-center gap-2 text-white/70 bg-white/5 px-4 py-2 rounded-full">
                            <MapPin className="w-4 h-4 text-[#3BD480]" />
                            <span>{talent.location}</span>
                          </div>
                        )}

                        {talent.deadline && (
                          <div className="flex items-center gap-2 text-white/70 bg-white/5 px-4 py-2 rounded-full">
                            <Clock className="w-4 h-4 text-[#3BD480]" />
                            <span>
                              শেষ সময়:{" "}
                              {new Date(talent.deadline).toLocaleDateString(
                                "bn-BD",
                              )}
                            </span>
                          </div>
                        )}
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                      >
                        <motion.button
                          onClick={() => navigate(`/talent/${talent._id}`)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r cursor-pointer from-[#3BD480] to-[#134C45] text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/20 transition-all duration-300 flex items-center gap-2 text-lg"
                        >
                          <span>বিস্তারিত দেখুন</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide Counter/Indicator */}
        <div className="text-center mt-8">
          <p className="text-white/50">
            <span className="text-[#3BD480] font-bold">1</span> /{" "}
            {talents.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TalentHuntSection;
