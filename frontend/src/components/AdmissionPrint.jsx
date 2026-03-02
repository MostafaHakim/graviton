import { Download, Printer } from "lucide-react";
import Logo from "../assets/logo.jpg";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissionById } from "../store/features/auth/admissionSlice";

const AdmissionPrint = () => {
  const componentRef = useRef();
  const { admissionId } = useParams();
  const { admission } = useSelector((state) => state.admissions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admissionId) return;
    dispatch(getAdmissionById(admissionId));
  }, [admissionId, dispatch]);
  console.log(admission);
  // ✅ প্রিন্ট ফাংশন (react-to-print v3 সঠিক API)
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // সরাসরি ref অবজেক্ট
    documentTitle: `Admission-${admission.admissionId}`,
  });

  // ✅ ডাউনলোড ফাংশন (PDF) – ছবিসহ সঠিক রেন্ডার
  const handleDownload = async () => {
    if (!componentRef.current) return;

    // 1. সব ইমেজ লোড হওয়া পর্যন্ত অপেক্ষা
    const images = componentRef.current.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn("Image failed to load:", img.src);
          resolve(); // error হলেও চলবে, তবে blank থাকতে পারে
        };
      });
    });
    await Promise.all(imagePromises);

    try {
      // 2. ক্যানভাস তৈরি (CORS ও টাইমআউট অপশনসহ)
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: true, // ডিবাগিং এর জন্য (প্রয়োজনে false)
        allowTaint: false,
        useCORS: true, // CORS ইমেজ অনুমোদন
        imageTimeout: 15000, // ইমেজ লোড টাইমআউট
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // 3. PDF তৈরি
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2], // সাইজ অ্যাডজাস্ট
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`Admission-${admission.admissionId}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF ডাউনলোড ব্যর্থ হয়েছে। ছবি লোড করতে সমস্যা হয়েছে।");
    }
  };

  if (!admission) {
    return (
      <div>
        <h2>No Data Found</h2>
      </div>
    );
  }

  return (
    <div className="p-10 text-black font-kalpurush uppercase">
      {/* প্রিন্টেবল কম্পোনেন্ট */}
      <div
        className="max-w-4xl mx-auto border-2 border-black p-8 bg-white"
        ref={componentRef}
      >
        {/* হেডার */}
        <div className="flex flex-col items-center justify-center text-center border-b-2 border-black pb-4 mb-6">
          <img className="w-16 h-16" src={Logo} alt="" />
          <h1 className="text-xl text-[#134C45] font-kalpurush font-bold leading-tight pt-4">
            গ্র্যাভিটন একাডেমি
          </h1>
          <h1 className="text-2xl font-bold uppercase">Admission Form</h1>
          <p className="mt-1 text-sm">
            Admission ID:{" "}
            <span className="font-semibold">{admission.admissionId}</span>
          </p>
        </div>

        {/* মূল তথ্য + ছবি */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Student Name:</span>{" "}
              {admission.studentName}
            </p>
            <p>
              <span className="font-semibold ">Email:</span>{" "}
              <span className="lowercase">{admission.email}</span>
            </p>
            <p>
              <span className="font-semibold">Father Name:</span>{" "}
              {admission.fatherName}
            </p>
            <p>
              <span className="font-semibold">Mother Name:</span>{" "}
              {admission.motherName}
            </p>
            <p>
              <span className="font-semibold">Class:</span> {admission.class}
            </p>
            <p>
              <span className="font-semibold">School/College:</span>{" "}
              {admission.schoolCollege}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {admission.mobileNumber}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {admission.address}
            </p>
          </div>
          <div className="flex justify-end">
            <div className="w-32 h-40 border border-black flex items-center justify-center overflow-hidden">
              <img
                src={admission.photo}
                alt="Student"
                className="object-cover w-full h-full"
                crossOrigin="anonymous" // CORS অনুরোধে পাঠাতে (যদি প্রয়োজন)
              />
            </div>
          </div>
        </div>

        {/* কোর্স */}
        <div className="mt-6">
          <h2 className="font-bold border-b border-black pb-1 mb-2 text-sm">
            Enrolled Courses
          </h2>
          <ul className="list-disc list-inside text-sm">
            {admission.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>

        {/* পেমেন্ট */}
        <div className="mt-6">
          <h2 className="font-bold border-b border-black pb-1 mb-2 text-sm">
            Payment Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              {admission.paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {admission.transactionId}
            </p>
            <p>
              <span className="font-semibold">Total Fee:</span>{" "}
              {admission.totalFee} ৳
            </p>
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {admission.discount} ৳
            </p>
            <p>
              <span className="font-semibold">Cash Paid:</span>{" "}
              {admission.cashPayment} ৳
            </p>
            <p>
              <span className="font-semibold">Due:</span> {admission.duePayment}{" "}
              ৳
            </p>
          </div>
          {admission.promo && admission.promo.length > 0 && (
            <div className="mt-3 text-sm">
              <p className="font-semibold">Promo Applied:</p>
              {admission.promo.map((p, i) => (
                <p key={i}>
                  Code: {p.appliedPromoCode} | Discount: {p.promoDiscount} ৳
                </p>
              ))}
            </div>
          )}
        </div>

        {/* মেম্বারশিপ ও স্ট্যাটাস */}
        <div className="mt-6 text-sm">
          <p>
            <span className="font-semibold">Membership Card:</span>{" "}
            {admission.membershipCard ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {admission.status}
          </p>
        </div>

        {/* সিগনেচার */}
        <div className="flex justify-between mt-16 text-sm">
          <div className="w-48 border-t border-black text-center pt-2">
            Student Signature
          </div>
          <div className="w-48 border-t border-black text-center pt-2">
            Authorized Signature
          </div>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="flex flex-row items-center justify-center space-x-2 p-4">
        <button
          className="flex flex-row space-x-1 px-4 py-2 bg-blue-500 text-white items-center hover:bg-blue-600 cursor-pointer"
          onClick={handleDownload}
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
        <button
          className="flex flex-row space-x-1 px-4 py-2 bg-green-500 text-white items-center hover:bg-green-600 cursor-pointer"
          onClick={handlePrint}
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};

export default AdmissionPrint;
