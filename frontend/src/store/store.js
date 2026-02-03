import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import admissionReducer from "./features/auth/admissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: admissionReducer,
  },
});
