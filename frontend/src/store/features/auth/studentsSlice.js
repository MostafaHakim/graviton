import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

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

      //   Subject by ID
      .addCase(getStudentsByClassId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudentsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.students = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
