import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getRegistrationByRegId } from "../store/features/auth/talentSlice";

const TalentAdmit = () => {
  const printRef = useRef();
  const { regId } = useParams();

  const { registration } = useSelector((state) => state.talents);
  const dispatch = useDispatch();
  console.log(registration);
  useEffect(() => {
    if (!regId) return;
    dispatch(getRegistrationByRegId(regId));
  }, [regId, dispatch]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Talent-Hunt-Admit-Card",
  });

  const selecetedExam = registration?.talent?.examDetails?.find(
    (cls) => cls.className === registration.class,
  );

  console.log(selecetedExam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] py-4 px-4 font-kalpurush">
      <div className="max-w-2xl mx-auto">
        {/* Print Button */}
        <div className="text-center mb-3">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-gradient-to-r from-[#3BD480] to-[#134C45] text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#3BD480]/20 transition-all duration-300"
          >
            🖨️ প্রিন্ট করুন
          </button>
        </div>

        {/* Admit Card - Compact Version */}
        <div
          ref={printRef}
          className="bg-white rounded-xl shadow-2xl overflow-hidden border border-[#3BD480]/20"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] text-white text-center py-3 px-3">
            <h1 className="text-lg font-bold mb-0.5">
              {registration?.talent?.title}
            </h1>
            <p className="text-[#3BD480] text-xs">অ্যাডমিট কার্ড</p>
          </div>

          {/* Body */}
          <div className="p-4">
            {/* Photo + Basic Info - Horizontal */}
            <div className="flex gap-3 items-start">
              {/* Photo */}
              <img
                src={
                  registration?.imageUrl || "https://via.placeholder.com/100"
                }
                alt={registration?.name}
                className="w-20 h-24 object-cover rounded-lg border-2 border-[#3BD480]/20 shadow-sm"
              />

              {/* Basic Info Grid - 2x2 */}
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <div className="bg-gray-50 p-1.5 rounded">
                  <p className="text-[9px] text-gray-500">রেজি আইডি</p>
                  <p className="font-bold text-xs text-[#1E4B4A]">
                    #{registration?.regId}
                  </p>
                </div>
                <div className="bg-gray-50 p-1.5 rounded">
                  <p className="text-[9px] text-gray-500">শ্রেণি</p>
                  <p className="font-semibold text-xs capitalize">
                    {registration?.class}
                  </p>
                </div>
                <div className="bg-gray-50 p-1.5 rounded">
                  <p className="text-[9px] text-gray-500">রোল</p>
                  <p className="font-semibold text-xs">{registration?.roll}</p>
                </div>
                <div className="bg-gray-50 p-1.5 rounded">
                  <p className="text-[9px] text-gray-500">মোবাইল</p>
                  <p className="font-semibold text-xs">{registration?.phone}</p>
                </div>
              </div>
            </div>

            {/* Name & School */}
            <div className="mt-2 space-y-1">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-[9px] text-gray-500">শিক্ষার্থীর নাম</p>
                <p className="font-semibold text-sm">{registration?.name}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-[9px] text-gray-500">বিদ্যালয়</p>
                <p className="font-semibold text-xs">
                  {registration?.school_name}
                </p>
              </div>
            </div>

            {/* Exam Info - 2x2 Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="border border-[#3BD480]/20 p-2 rounded-lg bg-[#3BD480]/5">
                <p className="text-[9px] text-gray-600">কেন্দ্র</p>
                <p className="font-bold text-xs">{selecetedExam?.vanue}</p>
              </div>
              <div className="border border-[#3BD480]/20 p-2 rounded-lg bg-[#3BD480]/5">
                <p className="text-[9px] text-gray-600">তারিখ</p>
                <p className="font-bold text-xs">
                  {new Date(selecetedExam?.date).toLocaleDateString()}
                </p>
              </div>
              <div className="border border-[#3BD480]/20 p-2 rounded-lg bg-[#3BD480]/5">
                <p className="text-[9px] text-gray-600">সময়</p>
                <p className="font-bold text-xs">{selecetedExam?.time}</p>
              </div>
              <div className="border border-[#3BD480]/20 p-2 rounded-lg bg-[#3BD480]/5">
                <p className="text-[9px] text-gray-600">আসন</p>
                <p className="font-bold text-xs"></p>
              </div>
            </div>

            {/* Parents Info - Small */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-gray-500">পিতা:</span>
                <span className="font-medium ml-1">
                  {registration?.father_name}
                </span>
              </div>
              <div>
                <span className="text-gray-500">মাতা:</span>
                <span className="font-medium ml-1">
                  {registration?.mother_name}
                </span>
              </div>
            </div>

            {/* Note - One line */}
            <div className="mt-2 bg-yellow-50 p-1.5 rounded border border-yellow-200">
              <p className="text-[8px] text-yellow-700 text-center">
                অ্যাডমিট কার্ড প্রিন্ট করে নিয়ে আসুন | মোবাইল ফোন নিষিদ্ধ
              </p>
            </div>

            {/* Signatures - Small */}
            <div className="mt-3 flex justify-between text-[8px]">
              <div className="text-center">
                <div className="border-t border-gray-400 w-20 mb-0.5"></div>
                <p className="text-gray-600">শিক্ষার্থীর স্বাক্ষর</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-20 mb-0.5"></div>
                <p className="text-gray-600">কর্তৃপক্ষের স্বাক্ষর</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-[#0B1120] via-[#1A2F3F] to-[#1E4B4A] text-white text-center py-1.5">
            <p className="text-[8px] opacity-90">ধন্যবাদ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentAdmit;
