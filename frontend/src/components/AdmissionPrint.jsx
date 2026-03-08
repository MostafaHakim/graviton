import { Download, Printer } from "lucide-react";
import Logo from "../assets/logo.jpg";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissionByIdForPrint } from "../store/features/auth/admissionSlice";

const AdmissionPrint = () => {
  const componentRef = useRef();
  const { admissionId } = useParams();
  const { admission } = useSelector((state) => state.admissions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admissionId) return;
    dispatch(getAdmissionByIdForPrint(admissionId));
  }, [admissionId, dispatch]);
  console.log(admission);
  // ✅ প্রিন্ট ফাংশন (react-to-print v3 সঠিক API)
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // সরাসরি ref অবজেক্ট
    documentTitle: `Admission-${admission?.admissionId}`,
  });

  const handleDownload = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Admission-${admission.admissionId}.pdf`);
  };
  if (!admission) {
    return (
      <div>
        <h2>No Data Found</h2>
      </div>
    );
  }

  return (
    <div className="lg:p-10 text-black font-kalpurush uppercase">
      {/* প্রিন্টেবল কম্পোনেন্ট */}
      <div
        ref={componentRef}
        className="bg-white mx-auto relative shadow-lg"
        style={{
          width: "794px", // A4 width
          minHeight: "1123px", // A4 height
          padding: "40px",
        }}
      >
        {/* হেডার */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} className="w-20 h-20 object-contain" alt="Logo" />
            <div>
              <h1 className="text-2xl font-bold text-[#134C45]">
                GRAVITON ACADEMY
              </h1>
              <p className="text-sm">Excellence in Education</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-4 tracking-widest">
            ADMISSION FORM
          </h2>

          <p className="text-sm mt-2">
            Admission ID:{" "}
            <span className="font-semibold">{admission.admissionId}</span>
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-30deg)",
            fontSize: "60px",
            color: "rgba(0,0,0,0.05)",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          GRAVITON
          <br />
          {admissionId}
        </div>

        {/* মূল তথ্য + ছবি */}
        <h2 className="font-bold border-b border-black pb-1 mb-3 text-base tracking-wide">
          PERSONAL INFORMATION
        </h2>
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
          <h2 className="font-bold border-b border-black pb-1 mb-3 text-base tracking-wide">
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
          <h2 className="font-bold border-b border-black pb-1 mb-3 text-base tracking-wide">
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
