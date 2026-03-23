import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const createShare = createAsyncThunk(
  "share/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        return rejectWithValue(result.message);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getShare = createAsyncThunk(
  "share/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/share`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteShare = createAsyncThunk(
  "share/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/share/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateShare = createAsyncThunk(
  "share/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log(id, formData);
      const res = await fetch(`${baseUrl}/api/share/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const shareSlice = createSlice({
  name: "shares",
  initialState: {
    loading: false,
    share: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShare.fulfilled, (state, action) => {
        state.loading = false;
        state.share.push(action.payload);
        toast.success("শেয়ার হোল্ডার এড হয়েছে");
      })
      .addCase(createShare.rejected, (state, action) => {
        state.loading = false;
        state.share = [];
        state.error = action.payload;
        toast.error(action.payload || "কিছু একটা সমস্যা হয়েছে!");
      })

      //   ===========Get Share===============
      .addCase(getShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShare.fulfilled, (state, action) => {
        state.loading = false;
        state.share = action.payload;
      })
      .addCase(getShare.rejected, (state, action) => {
        state.loading = false;
        state.share = [];
        state.error = action.payload;
      })
      // ===========Update============
      .addCase(updateShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateShare.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.share.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.share[index] = action.payload;
        }
      })
      .addCase(updateShare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   ===========Delete Share===============
      .addCase(deleteShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShare.fulfilled, (state, action) => {
        state.loading = false;
        state.share = state.share.filter((sh) => sh._id !== action.payload);
      })
      .addCase(deleteShare.rejected, (state, action) => {
        state.loading = false;
        state.share = [];
        state.error = action.payload;
      });
  },
});

export default shareSlice.reducer;
