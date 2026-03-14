import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Lock,
  School,
  Users,
  AlertCircle,
  CheckCircle,
  Upload,
  UserCircle,
  Briefcase,
  Home,
  Hash,
  Mail,
  FileText,
  ChevronRight,
  ChevronLeft,
  Save,
  X,
  BookOpen,
} from "lucide-react";
import uploadPhotoToCloudinary from "../utils/cloudinery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClasses } from "../store/features/auth/classesSlice";

const TalentRegisterForm = ({
  talentId,
  handleCreateRegistration,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);
  console.log(classes);
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    address: "",
    gender: "",
    tshirt_size: "",
    phone: "",
    father_name: "",
    father_profession: "",
    mother_name: "",
    mother_profession: "",
    emergency_contact: "",
    school_name: "",
    class: "",
    principal_info: "",
    roll: "",
    password: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = "নাম আবশ্যক";
      if (!formData.birth_date) newErrors.birth_date = "জন্ম তারিখ আবশ্যক";
      if (!formData.gender) newErrors.gender = "লিঙ্গ নির্বাচন করুন";
      if (!formData.phone) newErrors.phone = "মোবাইল নম্বর আবশ্যক";
      else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
        newErrors.phone = "সঠিক মোবাইল নম্বর দিন";
      }
    }

    if (step === 2) {
      if (!formData.father_name) newErrors.father_name = "পিতার নাম আবশ্যক";
      if (!formData.mother_name) newErrors.mother_name = "মাতার নাম আবশ্যক";
      if (!formData.emergency_contact)
        newErrors.emergency_contact = "জরুরি যোগাযোগ আবশ্যক";
    }

    if (step === 3) {
      if (!formData.school_name)
        newErrors.school_name = "বিদ্যালয়ের নাম আবশ্যক";
      if (!formData.class) newErrors.class = "শ্রেণি নির্বাচন করুন";
      if (!formData.roll) newErrors.roll = "রোল নম্বর আবশ্যক";
      if (!formData.password) newErrors.password = "পাসওয়ার্ড দিন";
      else if (formData.password.length < 6) {
        newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      toast.error("সব তথ্য সঠিকভাবে পূরণ করুন");
      return;
    }

    setLoading(true);

    try {
      let imageData = null;

      if (imageFile) {
        imageData = await uploadPhotoToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        imageUrl: imageData?.url,
        public_id: imageData?.public_id,
        talent: talentId,
      };

      await handleCreateRegistration(payload);

      // Reset form after successful submission
      setFormData({
        name: "",
        birth_date: "",
        address: "",
        gender: "",
        tshirt_size: "",
        phone: "",
        father_name: "",
        father_profession: "",
        mother_name: "",
        mother_profession: "",
        emergency_contact: "",
        school_name: "",
        class: "",
        principal_info: "",
        roll: "",
        password: "",
      });
      setImageFile(null);
      setPreviewImage(null);
      setCurrentStep(1);

      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }

    setLoading(false);
  };

  const steps = [
    { number: 1, title: "ব্যক্তিগত তথ্য", icon: User },
    { number: 2, title: "পারিবারিক তথ্য", icon: Users },
    { number: 3, title: "শিক্ষাগত তথ্য", icon: School },
  ];

  return (
    <div className=" bg-gradient-to-br  py-12 px-4 relative overflow-hidden z-30 ">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3BD480] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-kalpurush">
            ট্যালেন্ট হান্ট রেজিস্ট্রেশন
          </h1>
          <p className="text-white/70">আপনার তথ্য সঠিকভাবে পূরণ করুন</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3BD480] to-[#134C45] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-[#3BD480] border-[#3BD480] text-white"
                        : "bg-white/10 border-white/20 text-white/50"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span
                    className={`text-sm mt-2 ${
                      currentStep >= step.number
                        ? "text-white"
                        : "text-white/50"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > index + 1 ? "bg-[#3BD480]" : "bg-white/20"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#3BD480]" />
                    ব্যক্তিগত তথ্য
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <UserCircle className="w-4 h-4" />
                        শিক্ষার্থীর নাম <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="আপনার নাম লিখুন"
                        className={`w-full bg-white/5 border ${
                          errors.name ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Birth Date */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        জন্ম তারিখ <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        className={`w-full bg-white/5 border ${
                          errors.birth_date
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.birth_date && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.birth_date}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        লিঙ্গ <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        className={`w-full bg-white/5 border ${
                          errors.gender ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      >
                        <option className="text-black" value="">
                          লিঙ্গ নির্বাচন করুন
                        </option>
                        <option className="text-black" value="Male">
                          পুরুষ
                        </option>
                        <option className="text-black" value="Female">
                          মহিলা
                        </option>
                        <option className="text-black" value="Other">
                          অন্যান্য
                        </option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        মোবাইল নম্বর <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        placeholder="০১XXXXXXXXX"
                        className={`w-full bg-white/5 border ${
                          errors.phone ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* T-shirt Size */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <User className="w-4 h-4" />
                        টি-শার্ট সাইজ
                      </label>
                      <select
                        name="tshirt_size"
                        value={formData.tshirt_size}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3BD480] transition"
                        onChange={handleChange}
                      >
                        <option className="text-black" value="">
                          সাইজ নির্বাচন করুন
                        </option>
                        <option className="text-black" value="S">
                          S
                        </option>
                        <option className="text-black" value="M">
                          M
                        </option>
                        <option className="text-black" value="L">
                          L
                        </option>
                        <option className="text-black" value="XL">
                          XL
                        </option>
                        <option className="text-black" value="XXL">
                          XXL
                        </option>
                      </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        ঠিকানা <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                        rows="3"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Upload className="w-4 h-4" />
                        ছবি আপলোড
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#3BD480] transition">
                            <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
                            <p className="text-white/50 text-sm">
                              {imageFile ? imageFile.name : "ছবি নির্বাচন করুন"}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                        {previewImage && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#3BD480]" />
                    পারিবারিক তথ্য
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Father's Info */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <User className="w-4 h-4" />
                        পিতার নাম <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="father_name"
                        value={formData.father_name}
                        placeholder="পিতার নাম"
                        className={`w-full bg-white/5 border ${
                          errors.father_name
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.father_name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.father_name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        পিতার পেশা
                      </label>
                      <input
                        type="text"
                        name="father_profession"
                        value={formData.father_profession}
                        placeholder="পিতার পেশা"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Mother's Info */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <User className="w-4 h-4" />
                        মাতার নাম <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="mother_name"
                        value={formData.mother_name}
                        placeholder="মাতার নাম"
                        className={`w-full bg-white/5 border ${
                          errors.mother_name
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.mother_name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.mother_name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        মাতার পেশা
                      </label>
                      <input
                        type="text"
                        name="mother_profession"
                        value={formData.mother_profession}
                        placeholder="মাতার পেশা"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        জরুরি যোগাযোগ <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="emergency_contact"
                        value={formData.emergency_contact}
                        placeholder="জরুরি যোগাযোগ নম্বর"
                        className={`w-full bg-white/5 border ${
                          errors.emergency_contact
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.emergency_contact && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.emergency_contact}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <School className="w-5 h-5 text-[#3BD480]" />
                    শিক্ষাগত তথ্য
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* School Info */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <School className="w-4 h-4" />
                        বিদ্যালয়ের নাম <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="school_name"
                        value={formData.school_name}
                        placeholder="বিদ্যালয়ের নাম"
                        className={`w-full bg-white/5 border ${
                          errors.school_name
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.school_name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.school_name}
                        </p>
                      )}
                    </div>

                    {/* Class */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        শ্রেণি <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="class"
                        value={formData.class}
                        className={`w-full bg-white/5 border ${
                          errors.class ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      >
                        <option className="text-black" value="">
                          শ্রেণি নির্বাচন করুন
                        </option>
                        {classes &&
                          classes.map((cls) => (
                            <option className="text-black" value={cls.name}>
                              {cls.name}
                            </option>
                          ))}
                      </select>
                      {errors.class && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.class}
                        </p>
                      )}
                    </div>

                    {/* Roll */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        রোল নম্বর <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="roll"
                        value={formData.roll}
                        placeholder="রোল নম্বর"
                        className={`w-full bg-white/5 border ${
                          errors.roll ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.roll && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.roll}
                        </p>
                      )}
                    </div>

                    {/* Principal Info */}
                    <div className="space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <User className="w-4 h-4" />
                        প্রধান শিক্ষকের নাম
                      </label>
                      <input
                        type="text"
                        name="principal_info"
                        value={formData.principal_info}
                        placeholder="প্রধান শিক্ষকের নাম"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-white/70 text-sm flex items-center gap-1">
                        <Lock className="w-4 h-4" />
                        পাসওয়ার্ড <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        className={`w-full bg-white/5 border ${
                          errors.password ? "border-red-400" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3BD480] transition`}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Navigation Buttons */}
            <div className="flex justify-between gap-4 pt-6 border-t border-white/10">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                  পূর্ববর্তী
                </motion.button>
              )}

              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#3BD480]/20 transition"
                >
                  পরবর্তী
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#3BD480]/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      প্রসেসিং...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      রেজিস্ট্রেশন করুন
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TalentRegisterForm;
