// store/Slices/reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Async thunks
export const fetchReports = createAsyncThunk('report/fetchReports', async () => {
  const response = await axios.get(`${API_URL}reports`);
  return response.data;
});

export const fetchReportById = createAsyncThunk('report/fetchReportById', async (id) => {
  const response = await axios.get(`${API_URL}reports/${id}`);
  return response.data;
});

export const createReport = createAsyncThunk('report/createReport', async (reportData) => {
  const response = await axios.post(`${API_URL}reports`, reportData);
  return response.data;
});

export const updateReport = createAsyncThunk('report/updateReport', async ({ id, data }) => {
  await axios.put(`${API_URL}reports/${id}`, data);
  return { id, data };
});

export const deleteReport = createAsyncThunk('report/deleteReport', async (id) => {
  await axios.delete(`${API_URL}reports/${id}`);
  return id;
});

// Slice
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    reports: [],
    report: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.report = action.payload;
      })

      .addCase(createReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      })

      .addCase(updateReport.fulfilled, (state, action) => {
        const index = state.reports.findIndex(r => r.idReport === action.payload.id);
        if (index !== -1) {
          state.reports[index] = { ...state.reports[index], ...action.payload.data };
        }
      })

      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(r => r.idReport !== action.payload);
      });
  }
});

export default reportSlice.reducer;
