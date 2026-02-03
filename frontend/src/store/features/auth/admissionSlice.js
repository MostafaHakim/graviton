import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createAdmission = createAsyncThunk(
  "admission/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Admission failed");
      }

      return data.data; // <-- MongoDB admission object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAdmission = createAsyncThunk(
  "admission/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/student`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Admission failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    students: [],
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
      .addCase(createAdmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      })
      .addCase(getAdmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAdmission.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = admissionSlice.actions;
export default admissionSlice.reducer;
