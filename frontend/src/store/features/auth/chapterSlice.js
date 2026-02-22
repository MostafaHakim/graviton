import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createChapter = createAsyncThunk(
  "chapters/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Chapter Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getChapters = createAsyncThunk(
  "chapters/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/chapters`);

      const data = await res.json();
      console.log("Fetched chapters data:", data);
      if (!res.ok) {
        return rejectWithValue(data.message || "Chapters failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getChapterById = createAsyncThunk(
  "chapters/getSingle",
  async (id, { rejectWithValue }) => {
    console.log("Fetching chapter with ID:", id);
    try {
      const res = await fetch(`${baseUrl}/api/chapters/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Chapter failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const chaptersSlice = createSlice({
  name: "chapters",
  initialState: {
    chapters: [],
    chapter: null,
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
      .addCase(createChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters.push(action.payload);
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Chapter by ID
      .addCase(getChapterById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapterById.fulfilled, (state, action) => {
        state.loading = false;
        state.chapter = action.payload;
      })
      .addCase(getChapterById.rejected, (state, action) => {
        state.loading = false;
        state.chapter = null;
        state.error = action.payload;
      })

      //   Get All Chapters
      .addCase(getChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.loading = false;
        state.chapters = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = chaptersSlice.actions;
export default chaptersSlice.reducer;
