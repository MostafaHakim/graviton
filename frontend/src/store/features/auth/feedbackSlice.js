import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await fetch(`${baseUrl}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "feedback Create failed");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getFeedback = createAsyncThunk(
  "feedback/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/feedback`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "feedback failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const res = await fetch(`${baseUrl}/api/feedback/${id}`, {
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

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbacks: [],
    feedback: null,
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
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.push(action.payload);
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Get All
      .addCase(getFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.loading = false;
        state.feedbacks = [];
        state.error = action.payload;
      })
      //   Delete
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(
          (contact) => contact._id !== action.payload,
        );
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.feedbacks = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
