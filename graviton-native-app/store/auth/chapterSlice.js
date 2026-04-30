import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

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

export const updateChapter = createAsyncThunk(
  "chapter/update",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      const res = await fetch(`${baseUrl}/api/chapters/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteChapter = createAsyncThunk(
  "chapter/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/chapters/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return id;
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
      })
      // =============Update==============
      .addCase(updateChapter.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateChapter.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.chapters.findIndex(
          (item) => item._id === action.payload,
        );

        if (index !== -1) {
          state.chapters[index] = action.payload;
        }
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Delete
      .addCase(deleteChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = state.chapters.filter(
          (chapter) => chapter._id !== action.payload,
        );
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.loading = false;
        state.chapters = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = chaptersSlice.actions;
export default chaptersSlice.reducer;
