import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createClass = createAsyncThunk(
  "classes/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/classes`, {
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

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getClasses = createAsyncThunk(
  "classes/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/classes`);

      const data = await res.json();
      console.log("Fetched classes data:", data);
      if (!res.ok) {
        return rejectWithValue(data.message || "Classes failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getClassById = createAsyncThunk(
  "classes/getSingle",
  async (id, { rejectWithValue }) => {
    console.log("Fetching class with ID:", id);
    try {
      const res = await fetch(`${baseUrl}/api/classes/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Class failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    class: null,
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
      .addCase(createClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Class by ID
      .addCase(getClassById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.class = action.payload;
      })
      .addCase(getClassById.rejected, (state, action) => {
        state.loading = false;
        state.class = null;
        state.error = action.payload;
      })

      //   Get All Classes
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.classes = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = classesSlice.actions;
export default classesSlice.reducer;
