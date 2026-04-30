import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const createClub = createAsyncThunk(
  "club/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/club/create`, {
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
export const createNotice = createAsyncThunk(
  "club/NoticeCreate",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const res = await fetch(`${baseUrl}/api/club/notice/add`, {
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
      console.log(data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getClubs = createAsyncThunk(
  "club/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/club`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getClubById = createAsyncThunk(
  "club/getById",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await fetch(`${baseUrl}/api/club/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const getClubNotice = createAsyncThunk(
  "club/getNoticeById",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await fetch(`${baseUrl}/api/club/notice/${id}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSingleNotice = createAsyncThunk(
  "club/getSingleNotice",
  async (noticeId, { rejectWithValue }) => {
    try {
      console.log(noticeId);
      const res = await fetch(`${baseUrl}/api/club/notice/single/${noticeId}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// DELETE CLUB
export const deleteClub = createAsyncThunk(
  "club/deleteClub",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}/api/club/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
// DELETE Notice
export const deleteNotice = createAsyncThunk(
  "club/deleteNotice",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}/api/club/notice/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const clubSlice = createSlice({
  name: "clubs",
  initialState: {
    clubs: [],
    club: null,
    notices: [],
    notice: null,
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
      .addCase(createClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs.push(action.payload);
      })
      .addCase(createClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Get All Classes
      .addCase(getClubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(getClubs.rejected, (state, action) => {
        state.loading = false;
        state.clubs = [];
        state.error = action.payload;
      })
      //   Get By Id
      .addCase(getClubById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClubById.fulfilled, (state, action) => {
        state.loading = false;
        state.club = action.payload;
      })
      .addCase(getClubById.rejected, (state, action) => {
        state.loading = false;
        state.club = null;
        state.error = action.payload;
      })
      //   Get By Notice Club Id
      .addCase(getClubNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClubNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(getClubNotice.rejected, (state, action) => {
        state.loading = false;
        state.notices = [];
        state.error = action.payload;
      })
      //   Get By Notice Club Id
      .addCase(getSingleNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.notice = action.payload;
      })
      .addCase(getSingleNotice.rejected, (state, action) => {
        state.loading = false;
        state.notice = null;
        state.error = action.payload;
      })
      //   Add Notice
      .addCase(createNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.notices.push(action.payload);
      })
      .addCase(createNotice.rejected, (state, action) => {
        state.loading = false;
        state.notices = [];
        state.error = action.payload;
      })
      //   Delete Club
      .addCase(deleteClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = state.clubs.filter((club) => club._id !== action.payload);
      })
      .addCase(deleteClub.rejected, (state, action) => {
        state.loading = false;
        state.clubs = [];
        state.error = action.payload;
      })
      //   Delete Notice
      .addCase(deleteNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = state.notices.filter(
          (notice) => notice._id !== action.payload,
        );
      })
      .addCase(deleteNotice.rejected, (state, action) => {
        state.loading = false;
        state.notices = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = clubSlice.actions;
export default clubSlice.reducer;
