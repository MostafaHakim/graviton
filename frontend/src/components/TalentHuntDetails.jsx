import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  User,
  Award,
  BookOpen,
  Users,
  Mail,
  Download,
  Share2,
  ChevronRight,
  Trophy,
  Target,
  FileText,
  MessageCircle,
} from "lucide-react";

import {
  createTalentRegistration,
  getTalentById,
} from "../store/features/auth/talentSlice";
import TalentRegisterForm from "./TalentRegisterForm";

const TalentHuntDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { talent, loading } = useSelector((state) => state.talents);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getTalentById(id));
    }
  }, [dispatch, id]);

  const handleCreateRegistration = async (formData) => {
    const res = await dispatch(createTalentRegistration(formData));
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      setShowModal(false);
      navigate(`/talent/admit/${res.payload.regId}`);
      toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#3BD480] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70 text-lg">
            ট্যালেন্ট হান্ট খুঁজে পাওয়া যায়নি
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A]  overflow-hidden font-kalpurush rounded-2xl relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3BD480] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-white/70 hover:text-[#3BD480] transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>পিছনে যান</span>
        </motion.button>

        {/* Hero Section with Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-8 h-[400px] md:h-[500px]"
        >
          <img
            src={talent.bannerUrl}
            alt={talent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/50 to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-kalpurush">
              {talent.title}
            </h1>
          </div>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#3BD480]" />
            পরীক্ষার বিবরণ
          </h2>

          {/* Prize Money Badge */}
          {talent.feilds && talent.feilds.length > 0 && (
            <div className="flex flex-col gap-3 py-4">
              {talent.feilds.map((field, idx) => (
                <div
                  key={idx}
                  className="bg-[#3BD480]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3BD480]/30"
                >
                  <span className="text-white font-semibold">
                    {field.lable}:{" "}
                  </span>
                  <span className="text-[#3BD480]">{field.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exam Details Section */}
            {talent.examDetails && talent.examDetails.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#3BD480]" />
                  পরীক্ষার বিবরণ
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {talent.examDetails.map((exam, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      {exam.imageUrl && (
                        <img
                          src={exam.imageUrl}
                          alt={exam.className}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-bold text-[#3BD480] mb-3">
                        শ্রেণি: {exam.className}
                      </h3>
                      <div className="space-y-2 text-white/80">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#3BD480] mt-1 flex-shrink-0" />
                          <span>{exam.vanue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#3BD480]" />
                          <span>
                            {new Date(exam.date).toLocaleDateString("bn-BD", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#3BD480]" />
                          <span>{exam.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rules Section */}
            {talent.rules && talent.rules.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#3BD480]" />
                  নিয়মাবলী
                </h2>

                <div className="space-y-4">
                  {talent.rules.map((rule, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/90 font-medium mb-2">
                        {rule.name}
                      </p>
                      <p className="text-white/70">{rule.rule}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            {talent.contacts && talent.contacts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-[#3BD480]" />
                  যোগাযোগ
                </h2>

                <div className="space-y-4">
                  {talent.contacts.map((contact, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-[#3BD480] mt-1" />
                        <div>
                          <p className="text-white font-semibold">
                            {contact.name}
                          </p>
                          <p className="text-white/60 text-sm mb-2">
                            {contact.dasignation}
                          </p>
                          <a
                            href={`tel:${contact.mobile}`}
                            className="text-[#3BD480] hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-4 h-4" />
                            {contact.mobile}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-[#3BD480]" />
                দ্রুত পদক্ষেপ
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BD480]/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  নিবন্ধন করুন
                </button>

                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 px-6 rounded-xl font-semibold border border-white/20 hover:border-[#3BD480] transition-all duration-300 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  রুটিন ডাউনলোড
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="absolute flex flex-col justify-center top-0 right-0 left-0 bottom-0 bg-black/90 z-30">
          <TalentRegisterForm
            talentId={id}
            handleCreateRegistration={handleCreateRegistration}
          />
        </div>
      )}
    </div>
  );
};

export default TalentHuntDetails;
