import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
export const createProposal = createAsyncThunk(
    'proposal/createProposal',
    async ({id,title,description,cost,isPublished,skills},{rejectWithValue}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}proposal/create/`,{
                description,isPublished,cost,skills,title,id
            })
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const proposalSlicer = createSlice({
    name:'proposal',
    initialState:{
        skills:[],
        status:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createProposal.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(createProposal.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.skills = action.payload;
        })
        .addCase(createProposal.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    }
})
export default proposalSlicer.reducer;