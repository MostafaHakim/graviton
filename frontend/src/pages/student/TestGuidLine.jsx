import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkExam } from "../../store/features/auth/attemptSlice";
import { getPaperById } from "../../store/features/auth/paperSlice";

const TestGuidLine = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const { paper } = useSelector((state) => state.papers);
  const { check } = useSelector((state) => state.attempt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!paperId) return;
    dispatch(getPaperById(paperId));
    dispatch(checkExam(paperId));
  }, [paperId, dispatch]);

  return (
    <div className="flex flex-col  font-kalpurush max-w-6xl mx-auto p-8 bg-white rounded-2xl">
      <h2 className="text-2xl text-center">
        পরিক্ষার নিয়মাবলি ভালো করে পড়ে নিন
      </h2>
      {check !== null ? (
        <span className="text-center text-red-500 text-xl p-4 bg-red-500/10 rounded-2xl">
          আপনি ইতিমধ্যে এই পরিক্ষায় অংশ গ্রহন করেছেন
        </span>
      ) : (
        ""
      )}

      <div className="flex flex-col items-center justify-center text-xl">
        <h3>{paper?.title}</h3>
        <p>{paper?.description}</p>
      </div>
      <div className="flex flex-col items-start justify-start p-6">
        <h2>নিয়মাবলী</h2>
        <p>{paper?.guidline || "নিয়মাবলী এখানে দেখাবে"}</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-rose-500 text-white rounded cursor-pointer"
        >
          Back Test List
        </button>
        <Link
          to={`/student/madeeasy/${paperId}/start`}
          className={`px-4 py-2   rounded ${check !== null ? "disabled:cursor-not-allowed bg-gray-400 text-gray-300" : "bg-green-500 text-white"}`}
        >
          Start Test
        </Link>
      </div>
    </div>
  );
};

export default TestGuidLine;
