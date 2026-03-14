import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createTalent = createAsyncThunk(
  "talent/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/talents`, {
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

export const getTalents = createAsyncThunk(
  "talents/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/talents`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tallents failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTalentById = createAsyncThunk(
  "talent/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/talents/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "talent failed to fetch");
      }
      console.log(data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTalentRegistration = createAsyncThunk(
  "talent/createReg",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/talents/registration`, {
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

export const getRegistrationByTelentId = createAsyncThunk(
  "talents/getRegTiD",
  async (telentId, { rejectWithValue }) => {
    console.log(telentId);
    try {
      const res = await fetch(
        `${baseUrl}/api/talents/registration/${telentId}`,
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tallents failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getRegistrationByRegId = createAsyncThunk(
  "talents/getRegId",
  async (regId, { rejectWithValue }) => {
    try {
      console.log(regId);
      const res = await fetch(
        `${baseUrl}/api/talents/registration/single/${encodeURIComponent(regId)}`,
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "tallents failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const talentSlice = createSlice({
  name: "talents",
  initialState: {
    talents: [],
    talent: null,
    registrations: [],
    registration: null,
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
      .addCase(createTalent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.talents.push(action.payload);
      })
      .addCase(createTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Get All
      .addCase(getTalents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(getTalents.rejected, (state, action) => {
        state.loading = false;
        state.talents = [];
        state.error = action.payload;
      })
      //   Get By Id
      .addCase(getTalentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTalentById.fulfilled, (state, action) => {
        state.loading = false;
        state.talent = action.payload;
      })
      .addCase(getTalentById.rejected, (state, action) => {
        state.loading = false;
        state.talent = null;
        state.error = action.payload;
      })
      //   Get reg
      .addCase(getRegistrationByTelentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByTelentId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(getRegistrationByTelentId.rejected, (state, action) => {
        state.loading = false;
        state.registrations = [];
        state.error = action.payload;
      })
      //   Get reg regId
      .addCase(getRegistrationByRegId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByRegId.fulfilled, (state, action) => {
        state.loading = false;
        state.registration = action.payload;
      })
      .addCase(getRegistrationByRegId.rejected, (state, action) => {
        state.loading = false;
        state.registration = null;
        state.error = action.payload;
      })
      //   Registration Create
      .addCase(createTalentRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTalentRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations.push(action.payload);
      })
      .addCase(createTalentRegistration.rejected, (state, action) => {
        state.loading = false;
        state.registrations = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = talentSlice.actions;
export default talentSlice.reducer;
