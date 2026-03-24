import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createAbout = createAsyncThunk(
  "about/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/about`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Class Create failed");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAbout = createAsyncThunk(
  "about/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/about`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return data.about;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateAbout = createAsyncThunk(
  "about/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/about/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result.message || "Update failed");
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteAbout = createAsyncThunk(
  "about/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/about/${id}`, {
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

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    abouts: [],
    about: null,
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
      .addCase(createAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.abouts.push(action.payload);
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Get All
      .addCase(getAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.abouts = action.payload;
      })
      .addCase(getAbout.rejected, (state, action) => {
        state.loading = false;
        state.abouts = [];
        state.error = action.payload;
      })
      //   Delete
      .addCase(deleteAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.abouts = state.abouts.filter(
          (contact) => contact._id !== action.payload,
        );
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.loading = false;
        state.abouts = [];
        state.error = action.payload;
      })
      // =============Update==============
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAbout.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.abouts.findIndex(
          (item) => item._id === action.payload,
        );

        if (index !== -1) {
          state.abouts[index] = action.payload;
        }
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = aboutSlice.actions;
export default aboutSlice.reducer;
