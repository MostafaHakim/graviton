import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import admissionReducer from "./features/auth/admissionSlice";
import classesReducer from "./features/auth/classesSlice";
import subjectsReducer from "./features/auth/subjectSlice";
import chapterReducer from "./features/auth/chapterSlice";
import testsReducer from "./features/auth/testSlice";
import studentsReducer from "./features/auth/studentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admissions: admissionReducer,
    classes: classesReducer,
    subjects: subjectsReducer,
    chapters: chapterReducer,
    tests: testsReducer,
    students: studentsReducer,
  },
});
