import { motion } from "framer-motion";
import { BookOpen, Brain, Lightbulb, Rocket } from "lucide-react";

const MadeEasySection = () => {
  const items = [
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "সহজ পাঠ্য পদ্ধতি",
      desc: "জটিল বিষয়গুলোকে সহজ ভাষায় ও বাস্তব উদাহরণ দিয়ে শেখানো হয়",
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "ধাপে ধাপে শেখা",
      desc: "প্রতিটি টপিক ধাপে ধাপে শেখানো হয় যাতে সবাই বুঝতে পারে",
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: "কনসেপ্ট ক্লিয়ার",
      desc: "শুধু মুখস্থ নয়, কনসেপ্ট বুঝে শেখার উপর জোর দেওয়া হয়",
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: "পরীক্ষা প্রস্তুতি",
      desc: "বোর্ড ও ভর্তি পরীক্ষার জন্য বিশেষ প্রস্তুতি দেওয়া হয়",
    },
  ];

  return (
    <section
      id="madeeasy"
      className="py-20 bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-kalpurush">
            Made Easy শিক্ষা পদ্ধতি
          </h2>

          <p className="text-white/70 mt-4 max-w-2xl mx-auto font-kalpurush">
            জটিল বিষয়গুলোকে সহজ ও আকর্ষণীয়ভাবে শেখানোর জন্য আমাদের বিশেষ “Made
            Easy” পদ্ধতি ব্যবহার করা হয়।
          </p>

          <div className="w-24 h-1 bg-[#3BD480] mx-auto mt-6"></div>
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
      </div>
    </section>
  );
};

export default MadeEasySection;
