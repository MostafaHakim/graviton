import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createTest = createAsyncThunk(
  "test/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Test Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTests = createAsyncThunk(
  "test/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Tests failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTestById = createAsyncThunk(
  "test/getById",
  async (testId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests/single/${testId}`);
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tests failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTestByChapterId = createAsyncThunk(
  "test/getByChapter",
  async (chapterId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests/${chapterId}`);
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tests failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getQuestionsByTest = createAsyncThunk(
  "test/getQuestionsByTest",
  async (testId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests/questions/${testId}`);
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tests failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ================Delete Questins=================
export const deleteTest = createAsyncThunk(
  "test/deleteTest",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Delete failed");
      }

      return data.data._id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ================Delete Questins=================
export const deleteQuestion = createAsyncThunk(
  "test/deleteQuestionsByTest",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/tests/questions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        return rejectWithValue(data.message || "tests failed to fetch");
      }
      const data = res.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    tests: [],
    questions: [],
    test: null,
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
      .addCase(createTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests.push(action.payload);
      })
      .addCase(createTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Chapter by ID
      .addCase(getTestById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(getTestById.rejected, (state, action) => {
        state.loading = false;
        state.tests = null;
        state.error = action.payload;
      })
      //   Chapter by Chapter ID
      .addCase(getTestByChapterId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(getTestByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.tests = null;
        state.error = action.payload;
      })
      //   get Question by Test ID
      .addCase(getQuestionsByTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionsByTest.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(getQuestionsByTest.rejected, (state, action) => {
        state.loading = false;
        state.questions = null;
        state.error = action.payload;
      })

      //   Get All Chapters
      .addCase(getTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(getTests.rejected, (state, action) => {
        state.loading = false;
        state.tests = [];
        state.error = action.payload;
      })

      //   Delete A test
      .addCase(deleteTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = state.tests.filter((test) => test._id !== action.payload);
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.loading = false;
        state.tests = [];
        state.error = action.payload;
      })
      //   Delete A Question
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter(
          (question) => question !== action.payload,
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.questions = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = testsSlice.actions;
export default testsSlice.reducer;
