import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import admissionReducer from "./auth/admissionSlice";
import classesReducer from "./auth/classesSlice";
import subjectsReducer from "./auth/subjectSlice";
import chapterReducer from "./auth/chapterSlice";
import testsReducer from "./auth/testSlice";
import studentsReducer from "./auth/studentsSlice";
import paperReducer from "./auth/paperSlice";
import attemptReducer from "./auth/attemptSlice";
import memberReducer from "./auth/memberSlice";
import courseReducer from "./auth/courseSlice";
import flashReducer from "./auth/flashcardSlice";
import settingsReducer from "./auth/settingsSlice";
import promoReducer from "./auth/promoSlice";
import shareReducer from "./auth/shareSlice";
import clubReducer from "./auth/clubSlice";
import talentReducer from "./auth/talentSlice";
import contactReducer from "./auth/contactSlice";
import aboutReducer from "./auth/aboutSlice";
import feedbackReducer from "./auth/feedbackSlice";

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
    settings: settingsReducer,
    promos: promoReducer,
    share: shareReducer,
    clubs: clubReducer,
    talents: talentReducer,
    contacts: contactReducer,
    abouts: aboutReducer,
    feedbacks: feedbackReducer,
  },
});
