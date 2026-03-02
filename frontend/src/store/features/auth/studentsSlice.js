import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

// =========================================================
// ==================GET ALL STUDENTS===========================
// =========================================================
export const getAllStudents = createAsyncThunk(
  "students/getAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Students failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =========================================================
// ==================GET STUDENT BY CLASS===========================
// =========================================================

export const getStudentsByClassId = createAsyncThunk(
  "students/getStudents",
  async (classId, { rejectWithValue }) => {
    console.log(classId);
    try {
      const res = await fetch(`${baseUrl}/api/students/${classId}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Subject failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getStudentsByStudentId = createAsyncThunk(
  "students/getStudentStudentId",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/student/${studentId}`);

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "student failed to fetch");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: null,
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

      //   Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      })
      //   Subject by class ID
      .addCase(getStudentsByClassId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudentsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      })

      //   Subject by ID
      .addCase(getStudentsByStudentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsByStudentId.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(getStudentsByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
