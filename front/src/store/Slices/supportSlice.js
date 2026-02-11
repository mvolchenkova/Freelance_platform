import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Thunks
export const createSupport = createAsyncThunk(
  'support/create',
  async (payload, { rejectWithValue }) => {
    try {
        console.log(payload)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}support`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
export const fetchSupportByUserId = createAsyncThunk(
  'support/fetchByUserId',
  async (UserIdUser, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}support/user/${UserIdUser}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
export const fetchSupports = createAsyncThunk(
  'support/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}support`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchSupportById = createAsyncThunk(
  'support/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}support/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateSupport = createAsyncThunk(
  'support/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}support/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteSupport = createAsyncThunk(
  'support/delete',
  async (id, { rejectWithValue }) => {

    console.log('Thunk deleteSupport started with id:', id);
    try {
      await axios.delete(`${API_URL}support/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Slice
const supportSlice = createSlice({
  name: 'support',
  initialState: {
    supports: [],
    support: null,
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createSupport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupport.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.supports=action.payload;
      })
      .addCase(createSupport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchSupports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supports = action.payload;
      })
      .addCase(fetchSupports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchSupportById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupportById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.support = action.payload;
      })
      .addCase(fetchSupportById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSupport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupport.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateSupport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSupport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSupport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supports = state.supports.filter(s => s.idSupport !== action.payload);
      })
      .addCase(deleteSupport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchSupportByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupportByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supports = action.payload;
      })
      .addCase(fetchSupportByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
        }
      });

export default supportSlice.reducer;
