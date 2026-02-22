import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createSubject = createAsyncThunk(
  "subjects/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Subject Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSubjects = createAsyncThunk(
  "subjects/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/subjects`);

      const data = await res.json();
      console.log("Fetched subjects data:", data);
      if (!res.ok) {
        return rejectWithValue(data.message || "Subjects failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSubjectById = createAsyncThunk(
  "subjects/getSingle",
  async (id, { rejectWithValue }) => {
    console.log("Fetching subject with ID:", id);
    try {
      const res = await fetch(`${baseUrl}/api/subjects/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Subject failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    subject: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
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
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Subject by ID
      .addCase(getSubjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(getSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.subject = null;
        state.error = action.payload;
      })

      //   Get All Subjects
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.subjects = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = subjectsSlice.actions;
export default subjectsSlice.reducer;
