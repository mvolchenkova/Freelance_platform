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

export const getByUserId = createAsyncThunk('portfolio/getByUserId', 
    async(id, {rejectWithValue}) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}portfolio/getByUserId/${id}`)
            return response.data
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
      portfolio: {},
      statusPort: null,
      error: null,
    },
    reducers:{

    },
    extraReducers:(builder) => {
        builder
        .addCase(updPortfolio.pending, (state) => {
            state.statusPort = 'loading';
            state.error = null;
        })
        .addCase(updPortfolio.fulfilled, (state, action) => {
            state.statusPort = 'resolved';
            state.portfolio = action.payload;
        })
        .addCase(updPortfolio.rejected, (state, action) => {
            state.statusPort = 'rejected';
            state.error = action.error.message;
        })
        .addCase(getByUserId.pending, (state) => {
            state.statusPort = 'loading';
            state.error = null;
        })
        .addCase(getByUserId.fulfilled, (state, action) => {
            state.statusPort = 'resolved';
            state.portfolio = action.payload;
        })
        .addCase(getByUserId.rejected, (state, action) => {
            state.statusPort = 'rejected';
            state.error = action.error.message;
        })
    }
})
export default portfolioSlice.reducer;