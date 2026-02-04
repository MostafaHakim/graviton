import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createAdmission = createAsyncThunk(
  "admission/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/admission`, {
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
      console.log("get Addmin");
      const res = await fetch(`${baseUrl}/api/admission`);

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

export const getAdmissionById = createAsyncThunk(
  "admission/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/admission/${id}`);

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

export const handleApprove = createAsyncThunk(
  "admission/approve",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/admission/${id}/approve?status=${status}`,
        {
          method: "PATCH", // 🔥 খুব গুরুত্বপূর্ণ
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Admission update failed");
      }

      return data.student;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const admissionSlice = createSlice({
  name: "admissions",
  initialState: {
    admissions: [],
    admission: null,
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
        state.admissions = action.payload;
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.loading = false;
        state.admissions = [];
        state.error = action.payload;
      })
      .addCase(getAdmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions = action.payload;
      })
      .addCase(getAdmission.rejected, (state, action) => {
        state.loading = false;
        state.admissions = [];
        state.error = action.payload;
      })
      .addCase(getAdmissionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.admission = action.payload;
      })
      .addCase(getAdmissionById.rejected, (state, action) => {
        state.loading = false;
        state.admission = null;
        state.error = action.payload;
      })
      .addCase(handleApprove.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleApprove.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = admissionSlice.actions;
export default admissionSlice.reducer;
