import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',async(_,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}group?limit=7`)
            return response.data;
            }
        catch(error){
            console.error("Fetch groups error: ", error);
            return rejectWithValue(error.message)
        }
    }
)
export const searchGroups = createAsyncThunk(
    'groups/searchGroups', async (search,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}group?limit=4&search=${search}`)
            const data = response.data;
            return data

        }catch(error){
            console.error("Find groups error:", error);
            return rejectWithValue(error.message)
        }
    }
)

const groupSlice = createSlice({
    name:'groups',
    initialState:{
        groups:[],
        search:'',
        page:1,
        status: null,
        error: null
    },
    extraReducers: (builder) =>{
       builder
       .addCase(fetchGroups.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchGroups.fulfilled, (state, action) =>{
            state.status = 'resolved';
            state.groups = action.payload;
        })
        .addCase(fetchGroups.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.error.message;
        })
        .addCase(searchGroups.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.groups = action.payload;
        })
        .addCase(searchGroups.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.payload;
        })
    }
})

export default groupSlice.reducer;