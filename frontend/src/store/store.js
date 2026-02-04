import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import admissionReducer from "./features/auth/admissionSlice";
import subjectReducer from "./features/auth/subjectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: admissionReducer,
    subject: subjectReducer,
  },
});
