import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/features/auth/classesSlice";
import { Link } from "react-router-dom";

const StudentManagement = () => {
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-center"> ক্লাস মেনেজমেন্ট</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center">
        {classes.map((cls, i) => (
          <Link to={cls._id} key={i} className="border rounded px-4 py-2 ">
            <h2>{cls.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentManagement;
