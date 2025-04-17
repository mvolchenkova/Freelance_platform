import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchSkills = createAsyncThunk(
    'skills/fetchSkills',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
const skillsSlicer = createSlice({
    name:'skills',
    initialState:{
        skills:[],
        status:null,
        error:null
    },
    reducers:{
        setSkills(state,action){
            state.skills = action.payload;
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchSkills.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchSkills.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.skills = action.payload;
        })
        .addCase(fetchSkills.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
            
    }
})

export default skillsSlicer.reducer;