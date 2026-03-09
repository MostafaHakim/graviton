import { useState, useRef } from "react";
import ID from "../assets/idcard.png";
import { Printer } from "lucide-react";

import { useReactToPrint } from "react-to-print";

const IdCard = ({ student }) => {
  const [flipped, setFlipped] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
    @page {
      size: A4;
      margin: 20mm;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
    }
  `,
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-black/40">
      <p className="text-white/70 text-sm font-light tracking-widest uppercase">
        Click card to flip
      </p>
      <button
        onClick={() => handlePrint()}
        className="transition-all duration-300 flex flex-row items-center justify-center space-x-2 px-6 py-2 border border-white text-white hover:bg-[#144F46] rounded-full cursor-pointer"
      >
        <Printer size={16} />
        <span>Print</span>
      </button>
      {/* Card Container */}
      <div
        className="bg-white flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* ============================ Printable ============================ */}

        <div
          ref={componentRef}
          className="bg-white p-6  items-start justify-center gap-8 hidden print:flex"
        >
          {/* ───── FRONT ───── */}
          <div
            style={{
              width: "320px",
              height: "500px",
              borderRadius: 20,
              overflow: "hidden",
            }}
            className="border relative"
          >
            {/* Dark navy top */}
            <div
              style={{
                background: "#144F46",
                height: "55%",
                position: "relative",
              }}
            >
              {/* Header */}
              <div className="flex flex-col items-center pt-6 ">
                <img src={ID} className="w-16 h-16" alt="" />
                <p
                  style={{
                    color: "#fff",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  Graviton Accademy
                </p>

                <p style={{ color: "#55efc4", fontSize: 9 }}>
                  Modern Education
                </p>
              </div>

              {/* Wave */}
              <svg
                viewBox="0 0 320 60"
                style={{ position: "absolute", bottom: -1, width: "100%" }}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q80,60 160,30 Q240,0 320,40 L320,60 L0,60 Z"
                  fill="#fff"
                />
              </svg>
            </div>

            {/* White bottom */}
            <div
              style={{
                background: "#fff",
                height: "45%",
                position: "relative",
              }}
            />

            {/* Photo */}
            <div
              style={{
                position: "absolute",
                top: "28%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 90,
                borderRadius: "5%",
                border: "2px solid #dfe6e9",
                background: "#cbd5e1",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              <img src={student.photo} alt="" />
            </div>

            {/* Name */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "60px 28px 18px",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#0d1b3e",
                }}
                className="font-kalpurush"
              >
                {student.studentName}
              </p>

              <p
                style={{
                  color: "#144F46",
                  marginBottom: 14,
                }}
                className="text-md"
              >
                {student.class}
              </p>

              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 10,
                }}
              >
                {[
                  ["ID NO", student.studentId],
                  ["Father", student.fatherName],
                  ["Mother", student.motherName],
                  ["Phone", student.mobileNumber],
                  ["E-mail", student.email],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-2 mb-1 text-sm">
                    <span className="w-12 text-gray-500">{label}</span>
                    <span>:</span>
                    <span className="font-semibold text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ───── BACK ───── */}
          <div
            style={{
              width: "320px",
              height: "500px",
              borderRadius: 20,
              overflow: "hidden",
            }}
            className="border relative"
          >
            {/* Dark top */}
            <div
              style={{
                background: "#0d1b3e",
                height: "28%",
                position: "relative",
              }}
            >
              <div className="flex flex-col items-center pt-10 gap-1">
                <p className="text-white font-bold text-md">গ্রাভিটন একাডেমি</p>
                <p className="text-teal-400 text-sm">শিক্ষ জাতির মেরুদন্ড</p>
              </div>

              <svg
                viewBox="0 0 320 40"
                style={{ position: "absolute", bottom: -1, width: "100%" }}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q80,40 160,20 Q240,0 320,25 L320,40 L0,40 Z"
                  fill="#fff"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="bg-white p-6 text-sm">
              <p className="text-teal-500 font-bold mb-3">
                TERMS AND CONDITIONS
              </p>

              <p className="text-gray-600 text-xs mb-3">
                Lorem ipsum dolor sit amet, consectetul adipicing elit.
              </p>

              <p className="text-gray-600 text-xs mb-3">
                Lorem ipsum dolor sit amet, consectetul adipicing elit.
              </p>

              <div className="border-t border-dashed my-3"></div>

              <div className="text-xs mb-1">Join Date : DD/MM/YEAR</div>
              <div className="text-xs mb-1">Expire Date : DD/MM/YEAR</div>

              <div className="border-t border-dashed my-3"></div>

              <p className="text-xs font-bold mb-4">Your Signature</p>

              <p className="text-xs text-gray-500">Address</p>
              <p className="text-xs text-gray-500">{student.address}</p>
            </div>
          </div>
        </div>

        {/* ============================ Printable End ============================ */}
      </div>

      <div
        className="cursor-pointer"
        style={{ width: 320, height: 500, perspective: 1200 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ───── FRONT ───── */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Dark navy top */}
            <div
              style={{
                background: "#144F46",
                height: "55%",
                position: "relative",
              }}
            >
              {/* Header */}
              <div className="flex flex-col items-center pt-6 ">
                <img className="w-16 h-16" src={ID} alt="" />

                <p
                  style={{
                    color: "#fff",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  Graviton Accademy
                </p>
                <p style={{ color: "#55efc4", fontSize: 9 }}>
                  Modern Education
                </p>
              </div>

              {/* Wave */}
              <svg
                viewBox="0 0 320 60"
                style={{ position: "absolute", bottom: -1, width: "100%" }}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q80,60 160,30 Q240,0 320,40 L320,60 L0,60 Z"
                  fill="#fff"
                />
              </svg>
            </div>

            {/* White bottom */}
            <div
              style={{
                background: "#fff",
                height: "45%",
                position: "relative",
              }}
            />

            {/* Photo circle */}
            <div
              style={{
                position: "absolute",
                top: "28%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 90,
                borderRadius: "5%",
                border: "2px solid #dfe6e9",
                background: "#cbd5e1",
                overflow: "hidden",
                zIndex: 10,
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              <img src={student.photo} alt="" />
            </div>

            {/* Name & details */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "60px 28px 18px",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#0d1b3e",
                }}
                className="font-kalpurush"
              >
                {student.studentName}
              </p>
              <p
                style={{
                  color: "#144F46",
                  marginBottom: 14,
                }}
                className="text-md"
              >
                {student.class}
              </p>

              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 10,
                }}
              >
                {[
                  ["ID NO", student.studentId],
                  ["Father", student.fatherName],
                  ["Mother", student.motherName],
                  ["Phone", student.mobileNumber],
                  ["E-mail", student.email],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{ display: "flex", gap: 6, marginBottom: 3 }}
                  >
                    <span
                      style={{
                        color: "#64748b",

                        width: 38,
                        flexShrink: 0,
                      }}
                      className="text-sm"
                    >
                      {label}
                    </span>
                    <span
                      style={{ color: "#64748b", fontSize: 9 }}
                      className="text-sm"
                    >
                      :
                    </span>
                    <span
                      style={{ color: "#0d1b3e", fontWeight: 600 }}
                      className="text-sm"
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ───── BACK ───── */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Dark top strip */}
            <div
              style={{
                background: "#0d1b3e",
                height: "28%",
                position: "relative",
              }}
            >
              <div className="flex flex-col items-center pt-5 gap-1">
                <p
                  style={{
                    color: "#fff",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                  className="pt-10 text-md"
                >
                  গ্রাভিটন একাডেমি
                </p>
                <p style={{ color: "#14b8a6" }} className="text-sm">
                  শিক্ষা জাতির মেরুদন্ড
                </p>
              </div>
              {/* Wave */}
              <svg
                viewBox="0 0 320 40"
                style={{ position: "absolute", bottom: -1, width: "100%" }}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q80,40 160,20 Q240,0 320,25 L320,40 L0,40 Z"
                  fill="#fff"
                />
              </svg>
            </div>

            {/* White content area */}
            <div
              style={{
                background: "#fff",
                height: "78%",
                padding: "28px 24px 20px",
              }}
            >
              <p
                style={{
                  color: "#14b8a6",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                TERMS AND CONDITIONS
              </p>

              {[
                "Lorem ipsum dolor sit amet, consectetul adipicing elit, sad diam nonummy nibh euismod.",
                "Lorem ipsum dolor sit amet, consectetul adipicing elit, sad diam nonummy nibh euismod.",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 8, marginBottom: 10 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#14b8a6",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <p style={{ fontSize: 9, color: "#475569", lineHeight: 1.6 }}>
                    {text}
                  </p>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px dashed #cbd5e1",
                  margin: "14px 0 10px",
                }}
              />

              {[
                ["Join Date", "DD/MM/YEAR"],
                ["Expire Date", "DD/MM/YEAR"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{ display: "flex", gap: 6, marginBottom: 4 }}
                >
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: 9,
                      width: 60,
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ color: "#64748b", fontSize: 9 }}>:</span>
                  <span
                    style={{ color: "#0d1b3e", fontSize: 9, fontWeight: 600 }}
                  >
                    {val}
                  </span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px dashed #cbd5e1",
                  margin: "14px 0 10px",
                }}
              />

              <p
                style={{
                  color: "#0d1b3e",
                  fontWeight: 700,
                  fontSize: 10,
                  marginBottom: 20,
                }}
              >
                Your Signature
              </p>

              <div style={{ marginTop: "auto" }}>
                <p style={{ color: "#64748b", fontSize: 9 }}>Address</p>
                <p style={{ color: "#64748b", fontSize: 9 }}>
                  {student.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white/50 text-xs tracking-widest">
        {flipped ? "← BACK SIDE" : "FRONT SIDE →"}
      </p>
    </div>
  );
};

export default IdCard;
