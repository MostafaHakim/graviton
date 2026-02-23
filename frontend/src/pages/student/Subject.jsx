import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../../store/features/auth/subjectSlice";

const Subject = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { subjectId } = useParams();
  const { subject } = useSelector((state) => state.subjects);
  const dispatch = useDispatch();

  console.log(subject);

  useEffect(() => {
    if (!subjectId) return;
    dispatch(getSubjectById(subjectId));
  }, [subjectId, dispatch]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="capitalize text-center">
        <h2 className="text-2xl">Class {user.class}</h2>
        <h2 className="text-xl">Subject {subject?.name}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {subject &&
          subject.chapter.map((sub) => (
            <Link to={sub._id} className="border rounded p-4 text-center">
              <h2>{sub.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Subject;
