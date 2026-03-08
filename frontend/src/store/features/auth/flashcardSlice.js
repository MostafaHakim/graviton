import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/flash`;

// CREATE catagory
export const createFlashCategory = createAsyncThunk(
  "flash/createFlashCategory",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/category`, formData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// GET ALL category
export const getFlashCategory = createAsyncThunk(
  "flash/getFlashCategory",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/category`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// // DELETE COURSE
// export const deleteCourse = createAsyncThunk(
//   "course/deleteCourse",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

// CREATE LEVEL
export const createFlashLevel = createAsyncThunk(
  "flash/createFlashLevel",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/level`, formData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// GET ALL category
export const getFlashLevelById = createAsyncThunk(
  "flash/getFlashLevelById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/level/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// CREATE Dake
export const createFlashDack = createAsyncThunk(
  "flash/createFlashDack",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/deck`, formData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// GET ALL category
export const getFlashDackByLevelId = createAsyncThunk(
  "flash/getFlashDackByLevelId",
  async (levelId, thunkAPI) => {
    try {
      console.log(levelId);
      const res = await axios.get(`${API_URL}/deck/${levelId}`);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// CREATE FLASH CARD
export const createFlashCard = createAsyncThunk(
  "flash/createFlashCard",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/flashcard`, formData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// GET ALL Card By Dack
export const getFlashCardsByDeckId = createAsyncThunk(
  "flash/getFlashDackByDeckId",
  async (deckId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/flashcard/${deckId}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const flashSlice = createSlice({
  name: "flashs",
  initialState: {
    flashCategorys: [],
    level: null,
    levels: [],
    dack: null,
    dacks: [],
    cards: [],
    card: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE CATEGORY
      .addCase(createFlashCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFlashCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flashCategorys.push(action.payload);
      })
      .addCase(createFlashCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.flashCategorys = [];
        state.isErrorerror = action.payload;
      })

      // GET CATEGORY
      .addCase(getFlashCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlashCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flashCategorys = action.payload;
      })
      .addCase(getFlashCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.flashCategorys = [];
        state.isErrorerror = action.payload;
      })

      // CREATE LEVEL
      .addCase(createFlashLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFlashLevel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.levels.push(action.payload);
      })
      .addCase(createFlashLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.levels = [];
        state.isErrorerror = action.payload;
      })

      // GET LEVELS BY ID
      .addCase(getFlashLevelById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlashLevelById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.levels = action.payload;
      })
      .addCase(getFlashLevelById.rejected, (state, action) => {
        state.isLoading = false;
        state.levels = [];
        state.isErrorerror = action.payload;
      })
      // CREATE DACK
      .addCase(createFlashDack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFlashDack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dacks.push(action.payload);
      })
      .addCase(createFlashDack.rejected, (state, action) => {
        state.isLoading = false;
        state.dacks = [];
        state.isErrorerror = action.payload;
      })

      // GET Dacks BY level ID
      .addCase(getFlashDackByLevelId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlashDackByLevelId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dacks = action.payload;
      })
      .addCase(getFlashDackByLevelId.rejected, (state, action) => {
        state.isLoading = false;
        state.dacks = [];
        state.isErrorerror = action.payload;
      })
      // CREATE CARD
      .addCase(createFlashCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFlashCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards.push(action.payload);
      })
      .addCase(createFlashCard.rejected, (state, action) => {
        state.isLoading = false;
        state.cards = [];
        state.isErrorerror = action.payload;
      })

      // GET Dacks BY level ID
      .addCase(getFlashCardsByDeckId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlashCardsByDeckId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(getFlashCardsByDeckId.rejected, (state, action) => {
        state.isLoading = false;
        state.cards = [];
        state.isErrorerror = action.payload;
      });
  },
});

export const { clearError } = flashSlice.actions;
export default flashSlice.reducer;
