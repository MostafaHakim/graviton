import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

/* ========== Create Subject ========== */
export const createSubject = createAsyncThunk(
  "subject/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/subjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) return rejectWithValue(result.message);
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const loadSubjects = createAsyncThunk(
  "subject/load",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hello");
      const res = await fetch(`${baseUrl}/api/subjects`);

      const result = await res.json();
      if (!res.ok) return rejectWithValue("Subject Not Found");
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSubject(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
        state.success = true;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
        state.success = true;
      })
      .addCase(loadSubjects.rejected, (state, action) => {
        state.loading = false;
        state.subjects = [];
        state.error = action.payload;
      });
  },
});

export const { resetSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
