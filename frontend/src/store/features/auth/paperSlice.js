// store/features/auth/paperSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  papers: [],
  paper: null,
  loading: false,
  error: null,
};

//
// ================= CREATE PAPER =================
//
export const createPaper = createAsyncThunk(
  "paper/create",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await fetch(`${baseUrl}/api/papers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.paper;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//
// ================= GET ALL PAPERS =================
//
export const getAllPapers = createAsyncThunk(
  "paper/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/papers`);
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
//
// ================= GET ALL SKILL PAPERS =================
//
export const getAllSkillPapers = createAsyncThunk(
  "paper/getAllSkillPaper",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/papers/skills`);
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

//
// ================= GET PAPER BY ID =================
//
export const getPaperById = createAsyncThunk(
  "paper/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/papers/${id}`);
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
//
// ================= GET PAPER BY Chapter ID =================
//
export const getPaperByChapterId = createAsyncThunk(
  "paper/getByChapterId",
  async (chapterId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/papers/chapter/${chapterId}`);
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

//
// ================= DELETE PAPER =================
//
export const deletePaper = createAsyncThunk(
  "paper/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/papers/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//
// ================= SLICE =================
//
const paperSlice = createSlice({
  name: "paper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE PAPER
      .addCase(createPaper.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaper.fulfilled, (state, action) => {
        state.loading = false;
        state.papers.push(action.payload);
      })
      .addCase(createPaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL PAPERS
      .addCase(getAllPapers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload;
      })
      .addCase(getAllPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET ALL SKILLS PAPERS
      .addCase(getAllSkillPapers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSkillPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload;
      })
      .addCase(getAllSkillPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PAPER BY CHAPTER ID
      .addCase(getPaperByChapterId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaperByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload;
      })
      .addCase(getPaperByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PAPER BY ID
      .addCase(getPaperById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaperById.fulfilled, (state, action) => {
        state.loading = false;
        state.paper = action.payload;
      })
      .addCase(getPaperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE PAPER
      .addCase(deletePaper.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePaper.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = state.papers.filter(
          (paper) => paper._id !== action.payload,
        );
      })
      .addCase(deletePaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paperSlice.reducer;
