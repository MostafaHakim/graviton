import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;
const user = JSON.parse(localStorage.getItem("user")) || null;
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
  async (paperId, { rejectWithValue }) => {
    try {
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
