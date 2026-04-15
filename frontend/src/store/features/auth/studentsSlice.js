import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const res = await fetch(
        `${baseUrl}/api/students/student/${encodeURIComponent(studentId)}`,
      );

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

export const updateStudentStatus = createAsyncThunk(
  "students/updateStudentStatus",
  async ({ status, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/student/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "student failed to fetch");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "student failed to delete");
      }
      console.log(data);
      return data.student._id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createPayment = createAsyncThunk(
  "students/getPayment",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "student failed to fetch");
      }

      return data.student;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const updatePassword = createAsyncThunk(
  "students/updatePassword",
  async ({ formData, studentId }, { rejectWithValue }) => {
    try {
      console.log(formData, studentId);
      const res = await fetch(`${baseUrl}/api/students/password/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(
          data.message || "student failed to update password",
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Student update failed");
      }

      return data.data;
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
      })
      //   Update Status
      .addCase(updateStudentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(updateStudentStatus.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      })
      //   ==================Delete Student==================
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload,
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.payload;
      })

      //   Get Payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      })
      //   Update
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        toast.success("Profile updated successfully!");
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Update failed");
      })
      //   Update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
