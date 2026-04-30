import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "expo-react-native-toastify";
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const submitExam = createAsyncThunk(
  "attempt/submitExam",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/attempts/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result.message);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const checkExam = createAsyncThunk(
  "attempt/checkExam",
  async (paperId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user) {
        return rejectWithValue("User not logged in");
      }
      const res = await fetch(
        `${baseUrl}/api/attempts/check/${paperId}?studentId=${user._id}`,
      );

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const checkExamByStudent = createAsyncThunk(
  "attempt/checkExamByStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/attempts/student/${studentId}`);

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const attemptSlice = createSlice({
  name: "attempt",
  initialState: {
    loading: false,
    result: null,
    check: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        toast.success("পরীক্ষা সফলভাবে জমা হয়েছে!");
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "কিছু একটা সমস্যা হয়েছে!");
      })

      //   ============Check By StudentId===============
      .addCase(checkExamByStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkExamByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.check = action.payload;
      })
      .addCase(checkExamByStudent.rejected, (state, action) => {
        state.loading = false;
        state.check = null;
        state.error = action.payload;
      })
      //   ============Check===============
      .addCase(checkExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkExam.fulfilled, (state, action) => {
        state.loading = false;
        state.check = action.payload;
      })
      .addCase(checkExam.rejected, (state, action) => {
        state.loading = false;
        state.check = null;
        state.error = action.payload;
      });
  },
});

export default attemptSlice.reducer;
