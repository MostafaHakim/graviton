import { motion } from "framer-motion";
import { Target, CalendarCheck, BookCheck, Trophy } from "lucide-react";

const TargetEducation = () => {
  const steps = [
    {
      icon: <Target className="w-7 h-7" />,
      title: "লক্ষ্য নির্ধারণ",
      desc: "প্রতিটি শিক্ষার্থীর জন্য নির্দিষ্ট লক্ষ্য নির্ধারণ করা হয়",
    },
    {
      icon: <CalendarCheck className="w-7 h-7" />,
      title: "পরিকল্পিত সিলেবাস",
      desc: "লক্ষ্য অনুযায়ী পরিকল্পিত সিলেবাস তৈরি করা হয়",
    },
    {
      icon: <BookCheck className="w-7 h-7" />,
      title: "নিয়মিত প্র্যাকটিস",
      desc: "সাপ্তাহিক পরীক্ষা ও অনুশীলনের মাধ্যমে প্রস্তুতি",
    },
    {
      icon: <Trophy className="w-7 h-7" />,
      title: "সফলতা অর্জন",
      desc: "পরিশ্রম ও গাইডেন্সের মাধ্যমে কাঙ্ক্ষিত ফলাফল",
    },
  ];

  return (
    <section
      id="target"
      className="py-20 bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-kalpurush">
            লক্ষ্য নির্ভর শিক্ষা
          </h2>

          <p className="text-white/70 mt-4 max-w-2xl mx-auto font-kalpurush">
            প্রতিটি শিক্ষার্থীর সফলতার জন্য নির্দিষ্ট লক্ষ্য নির্ধারণ করে
            পরিকল্পিতভাবে পড়ানো হয়।
          </p>

          <div className="w-24 h-1 bg-[#3BD480] mx-auto mt-6"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#3BD480]/20 rounded-xl text-[#3BD480]">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-kalpurush">
                {step.title}
              </h3>

              <p className="text-white/70 text-sm font-kalpurush">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetEducation;
