import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Download,
  QrCode,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";

const StudentIDCard = ({ studentData }) => {
  const cardRef = useRef();

  // ডিফল্ট ডাটা
  const data = studentData || {
    _id: "69a6a3338015070f5a828fbe",
    studentId: "S002555",
    email: "mdmostafahakim544@gmail.com",
    studentName: "কামাল আহমেদ",
    fatherName: "কামাল হোসেন",
    motherName: "ফিরোজা খাতুন",
    class: "one",
    address: "ধানমন্ডি, ঢাকা-১২০৯",
    schoolCollege: "মডেল কলেজ, ঢাকা",
    mobileNumber: "01646225631",
    photo:
      "https://res.cloudinary.com/doyhiacif/image/upload/v1772528438/nbfiozytjjxbjeh9jwo9.jpg",
    bloodGroup: "B+",
    validUntil: "২০২৬-১২-৩১",
  };

  // ক্লাস নাম বাংলায়
  const getClassName = (cls) => {
    const classMap = {
      one: "প্রথম শ্রেণী",
      two: "দ্বিতীয় শ্রেণী",
      three: "তৃতীয় শ্রেণী",
      four: "চতুর্থ শ্রেণী",
      five: "পঞ্চম শ্রেণী",
      six: "ষষ্ঠ শ্রেণী",
      seven: "সপ্তম শ্রেণী",
      eight: "অষ্টম শ্রেণী",
      nine: "নবম শ্রেণী",
      ten: "দশম শ্রেণী",
    };
    return classMap[cls] || cls;
  };

  // প্রিন্ট ফাংশন
  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    pageStyle: `
      @page {
        size: 1013px 638px;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      {/* প্রিন্ট বাটন - প্রিন্টে দেখাবে না */}
      <div className="no-print mb-6">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>প্রিন্ট আইডি কার্ড</span>
        </button>
      </div>

      {/* আইডি কার্ড - সঠিক সাইজ 1013 x 638 পিক্সেল */}
      <div
        ref={cardRef}
        style={{
          width: "1013px",
          height: "638px",
          backgroundColor: "white",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        className="rounded-2xl border-8 border-gray-900"
      >
        {/* ব্যাকগ্রাউন্ড প্যাটার্ন */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* হলোগ্রাম ইফেক্ট */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-gray-200 to-transparent opacity-20 rounded-full blur-3xl"></div>

        {/* মূল কন্টেন্ট */}
        <div className="relative h-full flex flex-col">
          {/* হেডার - গ্র্যাভিটন একাডেমি লোগো */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* লোগো */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">G</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">
                    গ্র্যাভিটন একাডেমি
                  </h1>
                  <p className="text-gray-300 text-sm tracking-wider">
                    GRAVITON ACADEMY
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/10 px-6 py-2 rounded-xl">
                  <p className="text-xs text-gray-300">আইডি নম্বর</p>
                  <p className="text-2xl font-mono font-bold">
                    {data.studentId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* কার্ড বডি */}
          <div className="flex-1 flex p-6 gap-6">
            {/* বাম পাশ - ছবি */}
            <div className="w-48 flex flex-col">
              {/* প্রোফাইল ছবি */}
              <div className="bg-gray-100 rounded-2xl border-4 border-gray-900 overflow-hidden h-48">
                {data.photo ? (
                  <img
                    src={data.photo}
                    alt={data.studentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-4xl text-gray-600">📷</span>
                  </div>
                )}
              </div>

              {/* রক্তের গ্রুপ ব্যাজ */}
              <div className="mt-3 bg-red-100 rounded-xl py-2 px-3 border-2 border-red-300 text-center">
                <span className="text-xs text-gray-600 block">
                  রক্তের গ্রুপ
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {data.bloodGroup}
                </span>
              </div>

              {/* কিউআর কোড */}
              <div className="mt-3 bg-white rounded-xl border-2 border-gray-200 p-2 text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-900" />
                <p className="text-[8px] text-gray-500 mt-1">
                  Scan for verification
                </p>
              </div>
            </div>

            {/* মাঝের অংশ - ছাত্রের তথ্য */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                {data.studentName}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">পিতার নাম</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {data.fatherName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">মাতার নাম</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {data.motherName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">শ্রেণী</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {getClassName(data.class)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">শিক্ষা প্রতিষ্ঠান</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {data.schoolCollege}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">ঠিকানা</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {data.address}
                  </p>
                </div>
              </div>

              {/* যোগাযোগের তথ্য */}
              <div className="mt-4 pt-3 border-t-2 border-gray-200">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{data.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-sm truncate">{data.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ডান পাশ - অতিরিক্ত তথ্য */}
            <div className="w-56 bg-gradient-to-b from-gray-900 to-gray-700 text-white rounded-2xl p-5">
              <div className="text-center mb-4">
                <Award className="w-12 h-12 mx-auto mb-2 text-yellow-400" />
                <p className="text-xs opacity-80">সদস্যতা কার্ড</p>
                <p className="text-lg font-bold">ACTIVE</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs opacity-70">জন্ম তারিখ</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> ১৫ মে, ২০১০
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-70">ইস্যুর তারিখ</p>
                  <p className="font-medium">০৩ মার্চ, ২০২৬</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">মেয়াদ শেষ</p>
                  <p className="font-medium text-yellow-400">
                    {data.validUntil}
                  </p>
                </div>
              </div>

              {/* ফি সংক্রান্ত তথ্য */}
              {data.totalFee && (
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-xs opacity-70">পেমেন্ট স্ট্যাটাস</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>পরিশোধিত:</span>
                    <span className="font-bold">৳ {data.cashPayment || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>বকেয়া:</span>
                    <span className="font-bold text-yellow-400">
                      ৳ {data.duePayment || 0}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ফুটার */}
          <div className="border-t-2 border-gray-200 px-6 py-2 flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">স্বাক্ষর: ___________</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">ছাত্র/ছাত্রী</span>
            </div>
            <div className="text-right">
              <span className="text-gray-900 font-bold">অধ্যক্ষ</span>
              <p className="text-gray-500 text-[10px]">গ্র্যাভিটন একাডেমি</p>
            </div>
          </div>

          {/* নিরাপত্তা টেক্সট */}
          <div className="text-center py-1 bg-gray-900 text-white text-[8px] tracking-[4px]">
            • G R A V I T O N A C A D E M Y • S T U D E N T I D C A R D • V A L
            I D • 2 0 2 6 •
          </div>
        </div>
      </div>

      {/* সাইজ নির্দেশনা */}
      <div className="no-print mt-6 text-center text-sm text-gray-500">
        <p>আইডি কার্ড সাইজ: 1013 x 638 পিক্সেল (300 DPI)</p>
        <p className="text-xs mt-1">
          প্রিন্ট করার জন্য প্রিন্ট বাটনে ক্লিক করুন
        </p>
      </div>
    </div>
  );
};

export default StudentIDCard;
