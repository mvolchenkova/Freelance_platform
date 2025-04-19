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
export const fetchProposal = createAsyncThunk(
    'proposal/fetchProposal',
    async ({id},{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}proposal/${id}`)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchProposalbyId = createAsyncThunk(
    'proposal/fetchProposalbyId',
    async (_,{rejectWithValue}) =>{
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const id = user.user.id
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}proposal/foruser/${id}`)
            return response.data;
        } catch (error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const deleteProposal = createAsyncThunk(
    'proposal/deleteProposal',
    async (idProposal,{rejectWithValue}) =>{
        try{
            await axios.delete(`${process.env.REACT_APP_API_URL}proposal/delete/${idProposal}`)
        } catch (error){
            return rejectWithValue(error.response?.data || error.message);
        }
       
    }
)
export const publishProposal = createAsyncThunk(
    'proposal/publishProposal',
    async ({idProposal,isPublished},{rejectWithValue}) =>{
        try{
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}proposal/update/${idProposal}`,{isPublished})
        return response.data
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
)
export const fetchAllProposal = createAsyncThunk(
    'proposal/fetchAllProposal',
    async(_,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}proposal/`);
            return response.data
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
)
const proposalSlicer = createSlice({
    name:'proposal',
    initialState:{
        allProposal:[],
        proposal:[],
        status:null,
        error:null
    },
    reducers:{
        setProposal(state,action){
            state.proposal = action.payload
        },
        removeProposal(state,action){
            state.proposal = state.proposal.filter(proposal => proposal.idProposal !== action.payload);
        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createProposal.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(createProposal.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.proposal = action.payload;
        })
        .addCase(createProposal.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(fetchProposalbyId.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchProposalbyId.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.proposal = action.payload;
        })
        .addCase(fetchProposalbyId.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(fetchAllProposal.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchAllProposal.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.allProposal = action.payload;
        })
        .addCase(fetchAllProposal.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(deleteProposal.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(deleteProposal.fulfilled, (state) => {
            state.status = 'resolved';
        })
        .addCase(deleteProposal.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(publishProposal.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(publishProposal.fulfilled, (state, action) => {
            const { idProposal, isPublished } = action.payload;
            const task = state.proposal.find(t => t.idProposal === idProposal);
            if (task) {
              task.isPublished = isPublished;
            }
          })
        
        .addCase(publishProposal.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })

    }
})
export const { setProposal, removeProposal } =
proposalSlicer.actions;
export default proposalSlicer.reducer;