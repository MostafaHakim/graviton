import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  Globe,
  Calculator,
  Microscope,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { loadSubjects } from "../store/features/auth/subjectSlice";
import { useNavigate } from "react-router-dom";

const MadeEasy = () => {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null);
  const [expandedPaper, setExpandedPaper] = useState(null);
  const { subjects } = useSelector((state) => state.subject);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubjects());
  }, []);

  console.log(subjects);

  // const subjects = [
  //   {
  //     id: 1,
  //     name: "বাংলা",
  //     description: "সাহিত্য, ব্যাকরণ ও রচনা সহজ উপায়ে আয়ত্ত করুন",
  //     color: "from-emerald-500 to-green-500",
  //     icon: BookOpen,
  //     classes: [
  //       {
  //         id: "class-9",
  //         name: "নবম শ্রেণি",
  //         papers: [
  //           {
  //             id: "paper-1",
  //             name: "১ম পত্র",
  //             chapters: ["ব্যাকরণ", "রচনা", "সাহিত্য"],
  //             hasPaper: true,
  //           },
  //           {
  //             id: "paper-2",
  //             name: "২য় পত্র",
  //             chapters: ["নাটক", "উপন্যাস", "কবিতা"],
  //             hasPaper: true,
  //           },
  //         ],
  //       },
  //       {
  //         id: "class-10",
  //         name: "দশম শ্রেণি",
  //         papers: [
  //           {
  //             id: "paper-1",
  //             name: "১ম পত্র",
  //             chapters: ["ব্যাকরণ", "রচনা", "সাহিত্য"],
  //             hasPaper: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "ইংরেজি",
  //     description: "ব্যাকরণ, লিখন ও কথোপকথন দক্ষতা উন্নয়ন",
  //     color: "from-blue-500 to-cyan-500",
  //     icon: Globe,
  //     classes: [
  //       {
  //         id: "class-9",
  //         name: "Class 9",
  //         papers: [
  //           {
  //             id: "grammar",
  //             name: "Grammar",
  //             chapters: ["Tenses", "Parts of Speech", "Sentence Structure"],
  //             hasPaper: false,
  //           },
  //           {
  //             id: "composition",
  //             name: "Composition",
  //             chapters: ["Essay Writing", "Letter Writing", "Report Writing"],
  //             hasPaper: false,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "গণিত",
  //     description: "জটিল সমস্যা সহজ সমাধান ও ধারণা বোধগম্য",
  //     color: "from-purple-500 to-pink-500",
  //     icon: Calculator,
  //     classes: [
  //       {
  //         id: "class-9",
  //         name: "নবম শ্রেণি",
  //         papers: [
  //           {
  //             id: "paper-1",
  //             name: "বাংলা ভার্সন",
  //             chapters: ["বীজগণিত", "জ্যামিতি", "ত্রিকোণমিতি"],
  //             hasPaper: true,
  //           },
  //           {
  //             id: "paper-2",
  //             name: "ইংরেজি ভার্সন",
  //             chapters: ["Algebra", "Geometry", "Trigonometry"],
  //             hasPaper: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "বিজ্ঞান",
  //     description: "পদার্থ, রসায়ন ও জীববিজ্ঞানের ব্যবহারিক ধারণা",
  //     color: "from-amber-500 to-orange-500",
  //     icon: Microscope,
  //     classes: [
  //       {
  //         id: "class-9",
  //         name: "নবম শ্রেণি",
  //         papers: null,
  //         chapters: ["পদার্থ বিজ্ঞান", "রসায়ন বিজ্ঞান", "জীববিজ্ঞান"],
  //         hasPaper: false,
  //       },
  //     ],
  //   },
  // ];

  const toggleSubject = (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
      setExpandedClass(null);
      setExpandedPaper(null);
    } else {
      setExpandedSubject(subjectId);
      setExpandedClass(null);
      setExpandedPaper(null);
    }
  };

  const toggleClass = (classId, subjectId) => {
    if (expandedClass === classId && expandedSubject === subjectId) {
      setExpandedClass(null);
      setExpandedPaper(null);
    } else {
      setExpandedClass(classId);
      setExpandedSubject(subjectId);
      setExpandedPaper(null);
    }
  };

  const togglePaper = (paperId, classId, subjectId) => {
    if (
      expandedPaper === paperId &&
      expandedClass === classId &&
      expandedSubject === subjectId
    ) {
      setExpandedPaper(null);
    } else {
      setExpandedPaper(paperId);
      setExpandedClass(classId);
      setExpandedSubject(subjectId);
    }
  };

  const handleChapterClick = (subjectId, classId, paperId, chapterIndex) => {
    navigate(
      `/student/madeeasy/${subjectId}/${classId}/${paperId}/${chapterIndex}`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
      {/* Mesh Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-grid-madeeasy"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 212, 128, 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid-madeeasy)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            মেড ইজি সিস্টেম
            <span className="block text-[#3BD480]">বিষয়ভিত্তিক সমাধান</span>
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto font-kalpurush">
            আপনার পছন্দের বিষয় নির্বাচন করুন → ক্লাস নির্বাচন করুন → পেপার
            নির্বাচন করুন → চ্যাপ্টার দেখুন
          </p>
        </div>

        {/* Subjects Accordion */}
        <div className="space-y-6">
          {subjects.map((subject) => {
            const Icon = BookOpen;
            const isSubjectExpanded = expandedSubject === subject.id;

            return (
              <div
                key={subject.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
              >
                {/* Subject Header */}
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className="w-full p-6 text-left transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${subject.color}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white font-kalpurush">
                          {subject.name}
                        </h3>
                        <p className="text-white/70 mt-1 font-kalpurush">
                          {subject.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/70 font-kalpurush">
                        {subject.classes.length} ক্লাস
                      </span>
                      {isSubjectExpanded ? (
                        <ChevronDown className="w-5 h-5 text-white" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isSubjectExpanded && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      {subject.classes.map((classItem) => {
                        const isClassExpanded = expandedClass === classItem.id;

                        return (
                          <div
                            key={classItem.id}
                            className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                          >
                            {/* Class Header */}
                            <button
                              onClick={() =>
                                toggleClass(classItem.id, subject.id)
                              }
                              className="w-full p-4 text-left transition-all duration-200 hover:bg-white/10"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Layers className="w-5 h-5 text-white/70" />
                                  <span className="text-lg font-medium text-white font-kalpurush">
                                    {classItem.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-white/50 font-kalpurush">
                                    {classItem.papers
                                      ? `${classItem.papers.length} পেপার`
                                      : `${classItem.chapters?.length || 0} চ্যাপ্টার`}
                                  </span>
                                  {isClassExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-white/70" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-white/70" />
                                  )}
                                </div>
                              </div>
                            </button>

                            {/* Expanded Class Content */}
                            {isClassExpanded && (
                              <div className="px-4 pb-4">
                                {/* If has papers */}
                                {classItem.papers ? (
                                  <div className="space-y-3">
                                    {classItem.papers.map((paper) => {
                                      const isPaperExpanded =
                                        expandedPaper === paper.id;

                                      return (
                                        <div
                                          key={paper.id}
                                          className="bg-white/5 rounded-lg border border-white/5 overflow-hidden"
                                        >
                                          {/* Paper Header */}
                                          <button
                                            onClick={() =>
                                              togglePaper(
                                                paper.id,
                                                classItem.id,
                                                subject.id,
                                              )
                                            }
                                            className="w-full p-3 text-left transition-all duration-200 hover:bg-white/10"
                                          >
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-white/70" />
                                                <span className="text-white font-medium font-kalpurush">
                                                  {paper.name}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-sm text-white/50 font-kalpurush">
                                                  {paper.chapters.length}{" "}
                                                  চ্যাপ্টার
                                                </span>
                                                {isPaperExpanded ? (
                                                  <ChevronDown className="w-4 h-4 text-white/70" />
                                                ) : (
                                                  <ChevronRight className="w-4 h-4 text-white/70" />
                                                )}
                                              </div>
                                            </div>
                                          </button>

                                          {/* Expanded Paper Content */}
                                          {isPaperExpanded && (
                                            <div className="px-4 pb-3">
                                              <div className="space-y-2">
                                                {paper.chapters.map(
                                                  (chapter, index) => (
                                                    <button
                                                      key={index}
                                                      onClick={() =>
                                                        handleChapterClick(
                                                          subject._id,
                                                          classItem.classId,
                                                          paper.paperId,
                                                          index,
                                                        )
                                                      }
                                                      className="w-full flex items-center justify-between p-2 rounded hover:bg-white/10 transition-colors"
                                                    >
                                                      <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 flex items-center justify-center text-sm bg-white/10 rounded">
                                                          {index + 1}
                                                        </div>
                                                        <span className="text-white/90 font-kalpurush">
                                                          {chapter.name}
                                                        </span>
                                                      </div>
                                                      <ArrowRight className="w-4 h-4 text-white/50" />
                                                    </button>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  /* If no papers, show direct chapters */
                                  <div className="space-y-2">
                                    {classItem.chapters?.map(
                                      (chapter, index) => (
                                        <button
                                          key={index}
                                          onClick={() =>
                                            handleChapterClick(
                                              subject.name,
                                              classItem.name,
                                              null,
                                              chapter,
                                            )
                                          }
                                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 flex items-center justify-center text-sm bg-white/10 rounded-lg">
                                              {index + 1}
                                            </div>
                                            <div>
                                              <span className="block text-white font-medium font-kalpurush">
                                                {chapter}
                                              </span>
                                              <span className="text-sm text-white/50 font-kalpurush">
                                                ১০+ লেসন, ৫০+ সলিউশন
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm text-white/50">
                                              <Clock className="w-4 h-4 inline mr-1" />
                                              ৮ ঘণ্টা
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-white/50" />
                                          </div>
                                        </button>
                                      ),
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#3BD480]/20 rounded-lg">
                <Layers className="w-6 h-6 text-[#3BD480]" />
              </div>
              <h3 className="text-lg font-bold text-white font-kalpurush">
                স্তরবদ্ধ সিস্টেম
              </h3>
            </div>
            <p className="text-white/70 font-kalpurush">
              বিষয় → ক্লাস → পেপার → চ্যাপ্টার সিলেকশন
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-white font-kalpurush">
                পেপার ভিত্তিক
              </h3>
            </div>
            <p className="text-white/70 font-kalpurush">
              ১ম ও ২য় পেপার আলাদাভাবে সমাধান
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-white font-kalpurush">
                সহজ নেভিগেশন
              </h3>
            </div>
            <p className="text-white/70 font-kalpurush">
              ক্লিক করে এক্সপেন্ড ও সিলেক্ট করুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadeEasy;
