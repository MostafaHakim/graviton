import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectByClassName } from "../../store/features/auth/subjectSlice";
import { Link } from "react-router-dom";

const MadeEasy = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { subjects } = useSelector((state) => state.subjects);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user?.class) return;
    dispatch(getSubjectByClassName(user?.class));
  }, [user?.class]);

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-2xl min-h-screen">
      <div className="font-kalpurush">
        <h2 className="capitalize text-2xl text-center">মেড ইজি</h2>
        <h3 className="text-xl text-center">ক্লাসঃ {user.class}</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center">
        {subjects &&
          subjects.length > 0 &&
          subjects.map((subject) => (
            <Link
              to={`subject/${subject._id}`}
              key={subject._id}
              className="border rounded p-4 shadow"
            >
              <h2>{subject.name}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MadeEasy;
