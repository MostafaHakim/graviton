import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createMember = createAsyncThunk(
  "member/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Member Create failed");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllMember = createAsyncThunk(
  "member/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/member`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Member failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMemberById = createAsyncThunk(
  "member/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/member/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "member failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    member: null,
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
      .addCase(createMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Member by ID
      .addCase(getMemberById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.loading = false;
        state.member = null;
        state.error = action.payload;
      })

      //   Get All Member
      .addCase(getAllMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getAllMember.rejected, (state, action) => {
        state.loading = false;
        state.members = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = memberSlice.actions;
export default memberSlice.reducer;
