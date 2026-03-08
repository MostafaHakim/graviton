import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import admissionReducer from "./features/auth/admissionSlice";
import classesReducer from "./features/auth/classesSlice";
import subjectsReducer from "./features/auth/subjectSlice";
import chapterReducer from "./features/auth/chapterSlice";
import testsReducer from "./features/auth/testSlice";
import studentsReducer from "./features/auth/studentsSlice";
import paperReducer from "./features/auth/paperSlice";
import attemptReducer from "./features/auth/attemptSlice";
import memberReducer from "./features/auth//memberSlice";
import courseReducer from "./features/auth/courseSlice";
import flashReducer from "./features/auth/flashcardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admissions: admissionReducer,
    classes: classesReducer,
    subjects: subjectsReducer,
    chapters: chapterReducer,
    tests: testsReducer,
    students: studentsReducer,
    papers: paperReducer,
    attempt: attemptReducer,
    members: memberReducer,
    courses: courseReducer,
    flashs: flashReducer,
  },
});
