import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/courses`;

// CREATE COURSE
export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData, thunkAPI) => {
    try {
      console.log(courseData);
      const res = await axios.post(API_URL, courseData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// GET ALL COURSES
export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// DELETE COURSE
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses.push(action.payload);
      })

      // GET
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })

      // DELETE
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload,
        );
      });
  },
});

export default courseSlice.reducer;
