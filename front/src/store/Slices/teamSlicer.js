import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',async(page,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}teams?limit=7&page=${page}`)
            
            return response.data;
            }
        catch(error){
            console.error("Fetch teams error:", error);
            return rejectWithValue(error.message)
        }
    }
)
export const searchTeams = createAsyncThunk(
    'teams/searchTeams', async (search,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}teams?limit=10&search=${search}`)
            const data = response.data;
            return data
        }catch(error){
            console.error("Find teams error:", error);
            return rejectWithValue(error.message)
        }
    }
)

const teamSlicer = createSlice({
    name:'teams',
    initialState:{
        teams:[],
        search:'',
        page:1,
        status: null,
        error: null
    },
    extraReducers: (builder) =>{
       builder
       .addCase(fetchTeams.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchTeams.fulfilled, (state, action) =>{
            state.status = 'resolved';
            state.teams = action.payload;
            state.page = action.payload.pages;
        })
        .addCase(fetchTeams.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.error.message;
        })
        .addCase(searchTeams.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.teams = action.payload;
            
        })
        .addCase(searchTeams.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.payload;
        })
    }
})

export default teamSlicer.reducer;