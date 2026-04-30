import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const createContact = createAsyncThunk(
  "contact/create",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
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

export const getContact = createAsyncThunk(
  "contact/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/contact`);

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

export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/contact/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Club failed to fetch");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    contact: null,
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
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Get All
      .addCase(getContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.loading = false;
        state.contacts = [];
        state.error = action.payload;
      })
      //   Delete
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.contacts = [];
        state.error = action.payload;
      });
  },
});

export const { clearError } = contactSlice.actions;
export default contactSlice.reducer;
