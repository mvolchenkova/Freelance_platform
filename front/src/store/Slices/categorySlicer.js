import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (name, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/category/', { 
          nameOfCategory: name // Исправляем на имя, которое ждёт сервер
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || err.message);
      }
    }
  );

  export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/');
        console.log('API Response:', response.data); // Логируем ответ
        return response.data;
      } catch (err) {
        console.error('API Error:', err.response?.data || err.message);
        return rejectWithValue(err.response?.data?.error || err.message);
      }
    }
  );

  const categorySlice = createSlice({
    name: 'categories',
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Обработчики для fetchCategories
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Ваши существующие обработчики для createCategory...
        .addCase(createCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.items.push(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  

export default categorySlice.reducer;