import React, { useEffect, useState } from "react";
import { Star, Quote, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeedback,
  getFeedback,
} from "../../store/features/auth/feedbackSlice";
import DeleteModal from "../../components/DeleteModal";

const FeedbackManagement = () => {
  const [line, setLine] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const { feedbacks, loading, error } = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const res = await dispatch(deleteFeedback(id));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getFeedback());
      setShowModal(null);
    }
  };

  if (feedbacks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            ফিটব্যাক
          </h1>

          <p className="text-xl  text-[#3BD480] max-w-3xl mx-auto font-kalpurush">
            ভিজিটর, স্টুডেন্ট'স ও অভিভাবকগনের মতামত!!!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-xl text-white/60 font-kalpurush font-bold mb-4">
            কোন মতামত পাওয়া যায়নি
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17202F] via-[#134C45] to-[#3BD480] py-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-kalpurush font-bold mb-4">
            ফিটব্যাক
          </h1>

          <p className="text-xl  text-[#3BD480] max-w-3xl mx-auto font-kalpurush">
            ভিজিটর, স্টুডেন্ট'স ও অভিভাবকগনের মতামত!!!
          </p>
        </div>

        <div className="grid grid-cols-1  gap-8">
          {/* Left Column - Form */}
          <div className=" space-y-8">
            {/* Testimonials Section */}
            <div>
              {/* Testimonials Grid */}
              <div className="grid grid-cols-1  gap-6">
                {feedbacks.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#3BD480]/50 transition-all duration-300 hover:-translate-y-1 relative"
                  >
                    <button
                      onClick={() => setShowModal(testimonial._id)}
                      className="absolute bottom-0 right-0 p-4 cursor-pointer"
                    >
                      <Trash2 size={16} color="red" />
                    </button>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3BD480] to-[#134C45] flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white font-kalpurush">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white/70 font-kalpurush">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <Quote className="w-6 h-6 text-white/30" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/90 mb-4 leading-relaxed font-kalpurush ">
                      <span className={!line ? "line-clamp-5" : " "}>
                        "{testimonial.message}"
                      </span>{" "}
                      <button
                        onClick={() => setLine(!line)}
                        className="text-[#b4c4b8]"
                      >
                        {line ? "Show less" : " See more..."}
                      </button>
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-sm text-white/50 font-kalpurush">
                        {testimonial.createdAt}
                      </span>
                      <span className="text-sm font-medium text-[#3BD480] font-kalpurush">
                        {testimonial.course}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal !== null && (
        <DeleteModal
          title="Are you sure to delete"
          onDelete={handleDelete}
          onClose={() => setShowModal(null)}
          id={showModal}
        />
      )}
    </div>
  );
};

export default FeedbackManagement;
