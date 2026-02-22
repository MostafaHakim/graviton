import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTestById } from "../../store/features/auth/testSlice";

const TestGuidLine = () => {
  const { testId } = useParams();
  const { tests } = useSelector((state) => state.tests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!testId) return;
    dispatch(getTestById(testId));
  }, [testId, dispatch]);

  console.log(tests);
  return (
    <div className="flex flex-col  font-kalpurush">
      <h2 className="text-2xl text-center">
        পরিক্ষার নিয়মাবলি ভালো করে পড়ে নিন
      </h2>
      <div className="flex flex-col items-center justify-center text-xl">
        <h3>{tests.title}</h3>
        <p>{tests.description}</p>
      </div>
      <div className="flex flex-col items-start justify-start">
        <h2>নিয়মাবলী</h2>
        <p>{tests?.guidline || "নিয়মাবলী এখানে দেখাবে"}</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button className="px-4 py-2 bg-rose-500 text-white rounded">
          Back Test List
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Start Test
        </button>
      </div>
    </div>
  );
};

export default TestGuidLine;
