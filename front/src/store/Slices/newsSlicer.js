import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchNews = createAsyncThunk(
    'news/fetchNews', async(_,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}news?limit=10`)
            
            return response.data
        }catch(error){
            console.error('Fetch news error: ', error)
            return rejectWithValue(error.message);
        }
    }
)

const newsSlice = createSlice({
    name:'news',
    initialState:{
        news:[],
        page:1,
        status: null,
        error: null
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchNews.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchNews.fulfilled, (state, action) =>{
            state.status = 'resolved';
            state.news = action.payload;
            state.page = action.payload.pages;
        })
        .addCase(fetchNews.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.error.message;
        })
    }
})

export default newsSlice.reducer