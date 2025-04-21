import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updPortfolio = createAsyncThunk('portfolio/updatePortfolio',
    async({phone, skills, workExperience, education, portId}, {rejectWithValue}) => {
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}portfolio/${portId}`, {
                phone, 
                skills, 
                workExperience, 
                education
            })
            return response.data;
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

export const getByUserId = createAsyncThunk(
    'portfolio/getByUserId',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}portfolio/GetByUserId/${userId}`);
        return { userId, data: response.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolio: {}, // Store portfolio data by userId
        loading: false, // Add a loading state
        error: null,
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(updPortfolio.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updPortfolio.fulfilled, (state, action) => {
            state.loading = false;
            state.portfolio[action.payload.userId] = action.payload; // Update specific user's portfolio
        })
        .addCase(updPortfolio.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.portfolio[action.payload.userId] = action.payload.data; // Update specific user's portfolio
        })
        .addCase(getByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const selectPortfolioByUserId = (state, userId) => state.portfolio.portfolio[userId];
export const selectPortfolioLoading = (state) => state.portfolio.loading;

export default portfolioSlice.reducer;