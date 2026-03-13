import { motion } from "framer-motion";
import { Trophy, Target, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessGuarantee = () => {
  const items = [
    {
      icon: <Target className="w-7 h-7" />,
      title: "লক্ষ্যভিত্তিক প্রস্তুতি",
      desc: "বোর্ড ও ভর্তি পরীক্ষার জন্য নির্দিষ্ট পরিকল্পনায় পড়ানো হয়",
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: "সেরা ফলাফল",
      desc: "আমাদের শিক্ষার্থীরা প্রতি বছর সেরা ফলাফল অর্জন করে",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "গাইডেন্স ও মনিটরিং",
      desc: "প্রতিটি শিক্ষার্থীর অগ্রগতি নিয়মিত পর্যবেক্ষণ করা হয়",
    },
    {
      icon: <Trophy className="w-7 h-7" />,
      title: "সাফল্যের নিশ্চয়তা",
      desc: "সঠিক গাইডলাইন ও পরিশ্রমের মাধ্যমে সফলতা নিশ্চিত",
    },
  ];

  const stats = [
    { value: "৯৫%", label: "সাফল্যের হার" },
    { value: "১০০০+", label: "ভর্তি পরীক্ষায় সফল" },
    { value: "৫০০+", label: "বোর্ড পরীক্ষায় GPA-5" },
  ];

  return (
    <section
      id="success"
      className="py-20 bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-kalpurush">
            সাফল্যের গ্যারান্টি
          </h2>

          <p className="text-white/70 mt-4 max-w-2xl mx-auto font-kalpurush">
            আমাদের দক্ষ শিক্ষক, আধুনিক শিক্ষা পদ্ধতি এবং নিয়মিত মনিটরিংয়ের
            মাধ্যমে শিক্ষার্থীদের সফলতা নিশ্চিত করা হয়।
          </p>

          <div className="w-24 h-1 bg-[#3BD480] mx-auto mt-6"></div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
              <p className="text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#3BD480]/20 rounded-xl text-[#3BD480]">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-kalpurush">
                {item.title}
              </h3>

              <p className="text-white/70 text-sm font-kalpurush">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/admission"
            className="inline-block px-10 py-4 bg-[#3BD480] text-[#17202F] font-bold rounded-xl hover:bg-[#2da866] transition"
          >
            এখনই ভর্তি হও
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessGuarantee;
