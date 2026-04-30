import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const updateSetting = createAsyncThunk(
  "setting/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue("Setting Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSetting = createAsyncThunk(
  "setting/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/settings`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue("Settings failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: null,
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
      .addCase(updateSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.loading = false;
        state.settings = null;
        state.error = action.payload;
      })

      //   Get All Member
      .addCase(getSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getSetting.rejected, (state, action) => {
        state.loading = false;
        state.settings = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
