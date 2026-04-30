import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "expo-react-native-toastify";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

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
        toast.error(data.message);
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
    console.log("Login form data slice:", formData);
    try {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response data:", data);
      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

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

      // সবসময় AsyncStorage ক্লিয়ার করো
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      if (!res.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }

      return true;
    } catch (err) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      return rejectWithValue("Server error", err);
    }
  },
);

// ============Load User=======================
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        return {
          token,
          user: JSON.parse(user),
        };
      }
      return rejectWithValue("No user found");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ============Update Password=======================
export const UpdateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${baseUrl}/api/user/password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

// =================All Teacher================

export const getTeachers = createAsyncThunk(
  "user/getAllTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user/teachers`);

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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [],
    teachers: [],
    token: null,
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

      // GET ALL TEACHERS
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.teachers = [];
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
      // UPDATE USER PASSWORD
      .addCase(UpdateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(UpdateUserPassword.rejected, (state, action) => {
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
      })

      // LOAD USER
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
