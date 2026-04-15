import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import {
  Upload,
  User,
  BookOpen,
  CreditCard,
  Calculator,
  Home,
  CheckCircle,
  Shield,
  Check,
  Tag,
} from "lucide-react-native";

const AdmissionForm = () => {
  const navigation = useNavigation();

  // Dummy Data
  const classes = [
    { _id: "1", name: "ষষ্ঠ শ্রেণী" },
    { _id: "2", name: "সপ্তম শ্রেণী" },
    { _id: "3", name: "অষ্টম শ্রেণী" },
    { _id: "4", name: "নবম-দশম" },
    { _id: "5", name: "একাদশ-দ্বাদশ" },
  ];

  const courses = [
    { _id: "1", name: "প্রি-প্রাইমারি কোর্স" },
    { _id: "2", name: "কিডস প্রোগ্রামিং" },
    { _id: "3", name: "কিডস স্পোকেন" },
    { _id: "4", name: "জুনিয়র স্পোকেন" },
    { _id: "5", name: "সিনিয়র স্পোকেন" },
    { _id: "6", name: "আইইএলটিএস" },
    { _id: "7", name: "এসএটি" },
    { _id: "8", name: "ডিজিটাল মার্কেটিং" },
  ];

  const paymentMethods = [
    { value: "cash", label: "নগদ পেমেন্ট", icon: "💵" },
    { value: "bkash", label: "বিকাশ-০১৮৫৫১৬৬৩৩৯", icon: "📱" },
    { value: "nagad", label: "নগদ-০১৮৫৫১৬৬৩৩৯", icon: "📲" },
  ];

  const [loading, setLoading] = useState({
    submitting: false,
    photoUpload: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    studentName: "",
    fatherName: "",
    motherName: "",
    class: "",
    address: "",
    schoolCollege: "",
    mobileNumber: "",
    courses: [],
    paymentMethod: "",
    transactionId: "",
    photo: null,
    totalFee: "",
    discountPercent: "",
    cashPayment: "",
    membershipCard: false,
  });

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState({
    code: "",
    discount: 0,
    success: false,
    error: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseSelect = (courseId, courseName) => {
    if (loading.submitting) return;
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(courseName)
        ? prev.courses.filter((id) => id !== courseName)
        : [...prev.courses, courseName],
    }));
  };

  const handleSelectAll = () => {
    if (loading.submitting) return;
    if (formData.courses.length === courses.length) {
      setFormData((prev) => ({ ...prev, courses: [] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        courses: courses.map((course) => course.name),
      }));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("অনুমতি প্রয়োজন", "ছবি আপলোড করতে গ্যালারি এক্সেস প্রয়োজন");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName || "photo.jpg",
      };
      handleInputChange("photo", file);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("অনুমতি প্রয়োজন", "ছবি তুলতে ক্যামেরা এক্সেস প্রয়োজন");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: "camera_photo.jpg",
      };
      handleInputChange("photo", file);
    }
  };

  const applyPromoCode = () => {
    if (!promoCodeInput.trim()) {
      setAppliedPromo({
        code: "",
        discount: 0,
        success: false,
        error: "প্রমো কোড লিখুন",
      });
      return;
    }

    // Dummy promo validation
    if (promoCodeInput.toUpperCase() === "GRAVITON50") {
      setAppliedPromo({
        code: promoCodeInput,
        discount: 500,
        success: true,
        error: "",
      });
    } else if (promoCodeInput.toUpperCase() === "GRAVITON100") {
      setAppliedPromo({
        code: promoCodeInput,
        discount: 1000,
        success: true,
        error: "",
      });
    } else {
      setAppliedPromo({
        code: "",
        discount: 0,
        success: false,
        error: "প্রমো কোডটি সঠিক নয়",
      });
    }
  };

  const removePromoCode = () => {
    setAppliedPromo({ code: "", discount: 0, success: false, error: "" });
    setPromoCodeInput("");
  };

  const calculateDue = () => {
    if (formData.membershipCard) return 0;

    const total = parseFloat(formData.totalFee) || 0;
    const discountPercent = parseFloat(formData.discountPercent) || 0;
    const discountAmount = total * (discountPercent / 100);
    const cash = parseFloat(formData.cashPayment) || 0;
    const promoDiscount = appliedPromo.discount || 0;

    return Math.max(0, total - discountAmount - cash - promoDiscount);
  };

  const validateForm = () => {
    if (formData.courses.length === 0) {
      setErrorMessage("অন্তত একটি কোর্স নির্বাচন করুন");
      setShowError(true);
      return false;
    }

    if (!formData.photo) {
      setErrorMessage("ছবি আপলোড করুন");
      setShowError(true);
      return false;
    }

    if (!formData.membershipCard) {
      if (!formData.totalFee || parseFloat(formData.totalFee) <= 0) {
        setErrorMessage("মোট ফি দিন (০ এর বেশি)");
        setShowError(true);
        return false;
      }
      if (!formData.cashPayment || parseFloat(formData.cashPayment) < 0) {
        setErrorMessage("নগদ পেমেন্ট দিন");
        setShowError(true);
        return false;
      }
    }

    return true;
  };

  const simulateUploadProgress = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(Math.min(progress, 90));
        if (progress >= 90) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setLoading({ submitting: true, photoUpload: true });
    setUploadProgress(0);

    try {
      await simulateUploadProgress();
      setUploadProgress(100);
      setLoading((prev) => ({ ...prev, photoUpload: false }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        setLoading({ submitting: false, photoUpload: false });
        setUploadProgress(0);
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "আবেদন জমা দিতে সমস্যা হয়েছে");
      setShowError(true);
      setLoading({ submitting: false, photoUpload: false });
      setUploadProgress(0);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      studentName: "",
      fatherName: "",
      motherName: "",
      class: "",
      address: "",
      schoolCollege: "",
      mobileNumber: "",
      courses: [],
      paymentMethod: "",
      transactionId: "",
      photo: null,
      totalFee: "",
      discountPercent: "",
      cashPayment: "",
      membershipCard: false,
    });
    setPromoCodeInput("");
    setAppliedPromo({ code: "", discount: 0, success: false, error: "" });
  };

  const LoadingOverlay = () => (
    <Modal transparent visible={loading.submitting} animationType="fade">
      <View className="flex-1 bg-black/70 justify-center items-center">
        <LinearGradient
          colors={["#17202F", "#134C45"]}
          className="rounded-2xl p-8 w-80"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="items-center">
            <View className="relative w-20 h-20 mb-6">
              <View className="absolute inset-0 rounded-full border-4 border-[#3BD480]/20" />
              <View className="absolute inset-0 rounded-full border-4 border-[#3BD480] border-t-transparent" />
              <View className="absolute inset-0 items-center justify-center">
                <ActivityIndicator size="large" color="#3BD480" />
              </View>
            </View>
            <Text className="text-xl font-bold text-white mb-2">
              {loading.photoUpload
                ? "ছবি আপলোড হচ্ছে..."
                : "আবেদন প্রক্রিয়াকরণ হচ্ছে..."}
            </Text>
            <Text className="text-white/70 mb-6">দয়া করে অপেক্ষা করুন...</Text>
            <View className="w-full bg-white/10 rounded-full h-2 mb-2">
              <View
                className="bg-[#3BD480] h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </View>
            <Text className="text-sm text-white/60">
              {uploadProgress}% সম্পূর্ণ
            </Text>
            <Text className="text-xs text-white/40 mt-4">
              পৃষ্ঠাটি রিলোড করবেন না
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );

  const SuccessMessage = () => (
    <Modal transparent visible={showSuccess} animationType="fade">
      <View className="flex-1 bg-black/70 justify-center items-center">
        <LinearGradient
          colors={["#17202F", "#134C45"]}
          className="rounded-2xl p-8 w-80"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="items-center">
            <View className="w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-[#3BD480] to-[#134C45] items-center justify-center">
              <Check size={40} color="white" />
            </View>
            <Text className="text-2xl font-bold text-white mb-3">
              সফল হয়েছে!
            </Text>
            <Text className="text-white/80 mb-6 text-center">
              আপনার আবেদন সফলভাবে জমা দেওয়া হয়েছে। শীঘ্রই আমরা আপনার সাথে
              যোগাযোগ করব।
            </Text>
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#3BD480" />
              <Text className="text-[#3BD480] text-sm">
                স্বয়ংক্রিয়ভাবে বন্ধ হবে...
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );

  const ErrorMessage = () => (
    <Modal transparent visible={showError} animationType="fade">
      <View className="flex-1 bg-black/70 justify-center items-center">
        <LinearGradient
          colors={["#17202F", "#801717"]}
          className="rounded-2xl p-8 w-80"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="items-center">
            <View className="w-20 h-20 mb-6 rounded-full bg-red-500 items-center justify-center">
              <Text className="text-4xl text-white">!</Text>
            </View>
            <Text className="text-2xl font-bold text-white mb-3">
              সমস্যা হয়েছে!
            </Text>
            <Text className="text-white/80 mb-6 text-center">
              {errorMessage}
            </Text>
            <TouchableOpacity
              onPress={() => setShowError(false)}
              className="px-6 py-2 bg-red-500 rounded-lg"
            >
              <Text className="text-white">ঠিক আছে</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );

  return (
    <View className="flex-1 bg-[#17202F]">
      <LinearGradient
        colors={["#17202F", "#134C45", "#3BD480"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="pt-12 pb-6 px-4">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-4xl text-white text-center font-bold mb-2">
                গ্র্যাভিটন একাডেমি
              </Text>
              <Text className="text-xl text-[#3BD480] text-center font-bold mb-3">
                ভর্তি ফর্ম
              </Text>
              <Text className="text-base text-white/80 text-center leading-6">
                আপনার ভবিষ্যৎ গড়ে তুলতে আজই ভর্তি হোন। সমস্ত প্রয়োজনীয় তথ্য
                পূরণ করুন এবং এডমিশন প্রক্রিয়া সম্পন্ন করুন।
              </Text>
            </View>

            {/* Personal Information Card */}
            <View className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-6">
              <View className="flex-row items-center gap-3 mb-5">
                <LinearGradient
                  colors={["#3b82f6", "#06b6d4"]}
                  className="p-2 rounded-lg"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <User size={24} color="white" />
                </LinearGradient>
                <Text className="text-2xl font-bold text-white">
                  ব্যক্তিগত তথ্য
                </Text>
              </View>

              <View className="gap-4">
                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    ছাত্র/ছাত্রীর নাম *
                  </Text>
                  <TextInput
                    value={formData.studentName}
                    onChangeText={(text) =>
                      handleInputChange("studentName", text)
                    }
                    placeholder="ছাত্র/ছাত্রীর নাম লিখুন"
                    placeholderTextColor="#ffffff80"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    পিতার নাম *
                  </Text>
                  <TextInput
                    value={formData.fatherName}
                    onChangeText={(text) =>
                      handleInputChange("fatherName", text)
                    }
                    placeholder="পিতার নাম লিখুন"
                    placeholderTextColor="#ffffff80"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    মাতার নাম *
                  </Text>
                  <TextInput
                    value={formData.motherName}
                    onChangeText={(text) =>
                      handleInputChange("motherName", text)
                    }
                    placeholder="মাতার নাম লিখুন"
                    placeholderTextColor="#ffffff80"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    শ্রেণী নির্বাচন করুন *
                  </Text>
                  <View className="bg-white/5 border border-white/20 rounded-lg overflow-hidden">
                    <Picker
                      selectedValue={formData.class}
                      onValueChange={(value) =>
                        handleInputChange("class", value)
                      }
                    >
                      <Picker.Item label="শ্রেণী নির্বাচন করুন" value="" />
                      {classes.map((cls) => (
                        <Picker.Item
                          key={cls._id}
                          label={cls.name}
                          value={cls.name}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            {/* Contact Information Card */}
            <View className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-6">
              <View className="flex-row items-center gap-3 mb-5">
                <LinearGradient
                  colors={["#8b5cf6", "#ec489a"]}
                  className="p-2 rounded-lg"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Home size={24} color="white" />
                </LinearGradient>
                <Text className="text-2xl font-bold text-white">
                  যোগাযোগের তথ্য
                </Text>
              </View>

              <View className="gap-4">
                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    বাসস্থান ঠিকানা *
                  </Text>
                  <TextInput
                    value={formData.address}
                    onChangeText={(text) => handleInputChange("address", text)}
                    placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                    placeholderTextColor="#ffffff80"
                    multiline
                    numberOfLines={2}
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white min-h-[80px]"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">ইমেইল *</Text>
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    placeholder="ইমেইল"
                    placeholderTextColor="#ffffff80"
                    keyboardType="email-address"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    বিদ্যালয়/কলেজের নাম *
                  </Text>
                  <TextInput
                    value={formData.schoolCollege}
                    onChangeText={(text) =>
                      handleInputChange("schoolCollege", text)
                    }
                    placeholder="বিদ্যালয়/কলেজের নাম"
                    placeholderTextColor="#ffffff80"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>

                <View>
                  <Text className="text-sm text-white/90 mb-2">
                    মোবাইল নম্বর *
                  </Text>
                  <TextInput
                    value={formData.mobileNumber}
                    onChangeText={(text) =>
                      handleInputChange("mobileNumber", text)
                    }
                    placeholder="০১XXXXXXXXX"
                    placeholderTextColor="#ffffff80"
                    keyboardType="phone-pad"
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </View>
              </View>
            </View>

            {/* Course Selection Card */}
            <View className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-6">
              <View className="flex-row items-center gap-3 mb-5">
                <LinearGradient
                  colors={["#f59e0b", "#f97316"]}
                  className="p-2 rounded-lg"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <BookOpen size={24} color="white" />
                </LinearGradient>
                <Text className="text-2xl font-bold text-white">
                  কোর্স নির্বাচন *
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleSelectAll}
                className="mb-4 px-4 py-2 bg-white/10 rounded-lg self-start"
              >
                <Text className="text-white">
                  {formData.courses.length === courses.length
                    ? "সব নির্বাচন করুন"
                    : "সব কোর্স নির্বাচন করুন"}
                </Text>
              </TouchableOpacity>

              {formData.courses.length > 0 && (
                <Text className="text-sm text-white/70 mb-3">
                  নির্বাচিত কোর্স: {formData.courses.length} টি
                </Text>
              )}

              <View className="flex-row flex-wrap justify-between">
                {courses.map((course) => (
                  <TouchableOpacity
                    key={course._id}
                    onPress={() => handleCourseSelect(course._id, course.name)}
                    className={`w-[48%] p-3 border rounded-lg mb-3 ${
                      formData.courses.includes(course.name)
                        ? "border-[#3BD480] bg-[#3BD480]/10"
                        : "border-white/20 bg-white/5"
                    }`}
                  >
                    <View className="flex-row items-center gap-2">
                      <View
                        className={`w-5 h-5 border rounded items-center justify-center ${
                          formData.courses.includes(course.name)
                            ? "bg-[#3BD480] border-[#3BD480]"
                            : "border-white/30"
                        }`}
                      >
                        {formData.courses.includes(course.name) && (
                          <CheckCircle size={12} color="white" />
                        )}
                      </View>
                      <Text className="text-white text-sm flex-1">
                        {course.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment & Photo Card */}
            <View className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-6">
              <View className="flex-row items-center gap-3 mb-5">
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  className="p-2 rounded-lg"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <CreditCard size={24} color="white" />
                </LinearGradient>
                <Text className="text-2xl font-bold text-white">
                  পেমেন্ট ও নথিপত্র
                </Text>
              </View>

              {/* Payment Methods */}
              <View className="mb-5">
                <Text className="text-sm text-white/90 mb-2">
                  পেমেন্ট পদ্ধতি *
                </Text>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.value}
                    onPress={() =>
                      handleInputChange("paymentMethod", method.value)
                    }
                    className={`p-4 border rounded-lg mb-2 ${
                      formData.paymentMethod === method.value
                        ? "border-[#3BD480] bg-[#3BD480]/10"
                        : "border-white/20 bg-white/5"
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Text className="text-2xl">{method.icon}</Text>
                      <Text className="text-white flex-1">{method.label}</Text>
                      {formData.paymentMethod === method.value && (
                        <CheckCircle size={20} color="#3BD480" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Membership Card Checkbox */}
              <TouchableOpacity
                onPress={() =>
                  handleInputChange("membershipCard", !formData.membershipCard)
                }
                className={`p-4 border rounded-lg mb-5 flex-row items-center gap-3 ${
                  formData.membershipCard
                    ? "border-[#3BD480] bg-[#3BD480]/10"
                    : "border-white/20 bg-white/5"
                }`}
              >
                <View
                  className={`w-5 h-5 border rounded items-center justify-center ${
                    formData.membershipCard
                      ? "bg-[#3BD480] border-[#3BD480]"
                      : "border-white/30"
                  }`}
                >
                  {formData.membershipCard && <Check size={12} color="white" />}
                </View>
                <Text className="text-white/90">
                  মেম্বারশীপ কার্ড (সম্পূর্ণ পেমেন্ট ছাড়)
                </Text>
              </TouchableOpacity>

              {/* Transaction ID */}
              <View className="mb-5">
                <Text className="text-sm text-white/90 mb-2">
                  ট্রানজেকশন আইডি *
                </Text>
                <TextInput
                  value={formData.transactionId}
                  onChangeText={(text) =>
                    handleInputChange("transactionId", text)
                  }
                  placeholder="ট্রানজেকশন আইডি লিখুন"
                  placeholderTextColor="#ffffff80"
                  editable={!formData.membershipCard}
                  className={`bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    formData.membershipCard && "opacity-50"
                  }`}
                />
              </View>

              {/* Promo Code Section */}
              <View className="bg-white/5 rounded-xl p-4 border border-white/10 mb-5">
                <View className="flex-row items-center gap-2 mb-3">
                  <Tag size={20} color="#ffffffb3" />
                  <Text className="text-white font-medium">প্রমো কোড</Text>
                </View>
                <View className="flex-row gap-3">
                  <TextInput
                    value={promoCodeInput}
                    onChangeText={setPromoCodeInput}
                    placeholder="প্রমো কোড লিখুন"
                    placeholderTextColor="#ffffff80"
                    editable={!appliedPromo.success}
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                  {!appliedPromo.success ? (
                    <TouchableOpacity
                      onPress={applyPromoCode}
                      className="px-4 py-3 bg-[#3BD480] rounded-lg"
                    >
                      <Text className="text-white font-medium">অ্যাপ্লাই</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={removePromoCode}
                      className="px-4 py-3 bg-red-500 rounded-lg"
                    >
                      <Text className="text-white font-medium">সরান</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {appliedPromo.success && (
                  <Text className="text-green-400 text-sm mt-2">
                    প্রমো কোড "{appliedPromo.code}" প্রয়োগ হয়েছে! আপনি{" "}
                    {appliedPromo.discount} টাকা ছাড় পাচ্ছেন।
                  </Text>
                )}
                {appliedPromo.error && (
                  <Text className="text-red-400 text-sm mt-2">
                    {appliedPromo.error}
                  </Text>
                )}
              </View>

              {/* Photo Upload */}
              <View className="mb-5">
                <Text className="text-sm text-white/90 mb-2">
                  ছবি আপলোড করুন *
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "ছবি নির্বাচন করুন",
                      "আপনি কিভাবে ছবি আপলোড করতে চান?",
                      [
                        { text: "গ্যালারি থেকে", onPress: pickImage },
                        { text: "ক্যামেরা দিয়ে", onPress: takePhoto },
                        { text: "বাতিল", style: "cancel" },
                      ],
                    );
                  }}
                  className={`border-2 border-dashed rounded-xl p-6 items-center ${
                    formData.photo
                      ? "border-[#3BD480] bg-[#3BD480]/5"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  {formData.photo ? (
                    <>
                      <View className="w-12 h-12 mb-3 rounded-full bg-gradient-to-r from-[#3BD480] to-[#134C45] items-center justify-center">
                        <Check size={24} color="white" />
                      </View>
                      <Text className="text-white/80 text-sm mb-2 text-center">
                        {formData.photo.name || "ছবি নির্বাচিত হয়েছে"}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Upload size={48} color="#ffffff80" />
                      <Text className="text-white/80 text-sm mt-2">
                        ফাইল নির্বাচন করুন
                      </Text>
                    </>
                  )}
                  <Text className="text-xs text-white/50 mt-3">
                    সর্বোচ্চ ফাইলের আকার: ১০এমবি
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Fee Calculation */}
              <View className="bg-white/5 rounded-xl p-4 border border-white/10">
                <View className="flex-row items-center gap-2 mb-3">
                  <Calculator size={20} color="#ffffffb3" />
                  <Text className="text-white font-medium">ফি হিসাব</Text>
                </View>

                <View className="gap-3">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70">মোট ফি</Text>
                    <TextInput
                      value={formData.totalFee}
                      onChangeText={(text) =>
                        handleInputChange("totalFee", text)
                      }
                      keyboardType="numeric"
                      placeholder="৳"
                      placeholderTextColor="#ffffff80"
                      editable={!formData.membershipCard}
                      className={`w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white ${
                        formData.membershipCard && "opacity-50"
                      }`}
                    />
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70">ছাড় (%)</Text>
                    <TextInput
                      value={formData.discountPercent}
                      onChangeText={(text) =>
                        handleInputChange("discountPercent", text)
                      }
                      keyboardType="numeric"
                      placeholder="%"
                      placeholderTextColor="#ffffff80"
                      editable={!formData.membershipCard}
                      className={`w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white ${
                        formData.membershipCard && "opacity-50"
                      }`}
                    />
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70">নগদ পেমেন্ট</Text>
                    <TextInput
                      value={formData.cashPayment}
                      onChangeText={(text) =>
                        handleInputChange("cashPayment", text)
                      }
                      keyboardType="numeric"
                      placeholder="৳"
                      placeholderTextColor="#ffffff80"
                      editable={!formData.membershipCard}
                      className={`w-32 px-3 py-2 bg-white/5 border border-white/20 rounded text-right text-white ${
                        formData.membershipCard && "opacity-50"
                      }`}
                    />
                  </View>

                  {appliedPromo.success && (
                    <View className="flex-row justify-between items-center">
                      <Text className="text-green-400">প্রমো ছাড়</Text>
                      <Text className="text-green-400">
                        - ৳ {appliedPromo.discount}
                      </Text>
                    </View>
                  )}

                  <View className="pt-3 border-t border-white/20">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-white font-medium">
                        বকেয়া পেমেন্ট
                      </Text>
                      <Text
                        className={`text-xl font-bold ${
                          calculateDue() > 0
                            ? "text-yellow-400"
                            : "text-[#3BD480]"
                        }`}
                      >
                        ৳ {calculateDue()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-4 mb-6">
              <TouchableOpacity
                onPress={resetForm}
                className="flex-1 px-6 py-3 border-2 border-white/30 rounded-lg"
              >
                <Text className="text-white text-center font-medium">
                  ফর্ম রিসেট করুন
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#3BD480] to-[#134C45] rounded-lg"
              >
                <Text className="text-white text-center font-bold">
                  আবেদন জমা দিন
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer Note */}
            <View className="pt-6 border-t border-white/20 items-center">
              <View className="flex-row items-center gap-2 mb-2">
                <Shield size={16} color="#ffffff99" />
                <Text className="text-white/60 text-sm">
                  আপনার তথ্য সম্পূর্ণ নিরাপদ
                </Text>
              </View>
              <Text className="text-white/60 text-sm text-center">
                কোন সাহায্যের জন্য যোগাযোগ করুন: ০১৮৫৫-১৬৬৩৩৯ | ইমেইল:
                info@gravitonacademy.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <LoadingOverlay />
      <SuccessMessage />
      <ErrorMessage />
    </View>
  );
};

export default AdmissionForm;
