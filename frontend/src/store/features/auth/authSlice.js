import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createUser = createAsyncThunk(
  "user/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "User Create failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "User fetch failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ============Update Role=======================
export const UpdateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "User fetch failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ============Delete User=======================
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user/${id}`, {
        method: "delete",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "User fetch failed");
      }

      return data._id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ============Update Status=======================
export const UpdateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ status, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user/status?status=${status}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "User fetch failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return {
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${baseUrl}/api/user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`, // expired token বা null safe
        },
      });

      const data = await res.json().catch(() => ({}));

      // সবসময় localStorage ক্লিয়ার করো
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (!res.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }

      return true;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue("Server error", err);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    users: [],
    token: localStorage.getItem("token") || null,
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

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL USER
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER ROLE
      .addCase(UpdateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(UpdateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE USER STATUS
      .addCase(UpdateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(UpdateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
