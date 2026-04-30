import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

/* CREATE PROMO */
export const createPromo = createAsyncThunk(
  "promo/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/promo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Promo Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* GET PROMOS */
export const getPromo = createAsyncThunk(
  "promo/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/promo`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Promo Fetch failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* VALIDATE PROMO */
export const validatePromo = createAsyncThunk(
  "promo/validate",
  async (code, { rejectWithValue }) => {
    console.log(code);
    try {
      const res = await fetch(`${baseUrl}/api/promo/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Promo validation failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const promoSlice = createSlice({
  name: "promos",
  initialState: {
    promos: [],
    validatedPromo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearValidatedPromo: (state) => {
      state.validatedPromo = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE PROMO */
      .addCase(createPromo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPromo.fulfilled, (state, action) => {
        state.loading = false;
        state.promos.push(action.payload);
      })
      .addCase(createPromo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET PROMO */
      .addCase(getPromo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPromo.fulfilled, (state, action) => {
        state.loading = false;
        state.promos = action.payload;
      })
      .addCase(getPromo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VALIDATE PROMO */
      .addCase(validatePromo.pending, (state) => {
        state.loading = true;
      })
      .addCase(validatePromo.fulfilled, (state, action) => {
        state.loading = false;
        state.validatedPromo = action.payload;
      })
      .addCase(validatePromo.rejected, (state, action) => {
        state.loading = false;
        state.validatedPromo = null;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearValidatedPromo } = promoSlice.actions;

export default promoSlice.reducer;
