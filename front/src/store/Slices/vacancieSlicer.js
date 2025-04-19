import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVacancies = createAsyncThunk(
    'vacancie/fetchVacancies',
    async (_,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}vacancie/`)
            return response.data
        } catch (error){
            return rejectWithValue(error.message);
        }
        
    }
)

export const fetchByUserIdVacancie = createAsyncThunk(
    'vacancie/fetchByUserIdVacancie',
    async(_,{rejectWithValue}) =>{
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const id = user.user.id
            const response = await axios.get(`${process.env.REACT_APP_API_URL}vacancie/${id}`)
            return response.data
        } catch (error){
            return rejectWithValue(error.message);
        }
        
    }
)
export const createVacancie = createAsyncThunk(
    'vacancie/createVacancie',
    async({id,title,salary,isPublished,description,skills},{rejectWithValue}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}vacancie/create/${id}`,{
                title,salary,isPublished,description,skills
            })
            return response.data
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
)
export const deleleteVacancie = createAsyncThunk(
    'vacancie/deleleteVacancie',
    async(id,{rejectWithValue}) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}vacancie/delete/${id}`)
            return response.data;
        } catch(error){
            return rejectWithValue(error.message);
        }
    }
)
export const publishVacancie = createAsyncThunk(
    'vacancie/publishVacancie',
    async({idVacancie,isPublished},{rejectWithValue}) =>{
        try{
            console.log(idVacancie)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}vacancie/publish/${idVacancie}`,
             {isPublished}
            )
            return response.data
        } catch(error){
            return rejectWithValue(error.message);
        }
    }
)
const vacancieSlicer = createSlice({
    name:'vacancie',
    initialState:{
        allVacanie:[],
        vacancies:[],
        status: null,
        error: null,
    },
    reducers:{
        removeVacancie(state,action){
            state.vacancies = state.vacancies.filter(vacancie => vacancie.idVacancie !== action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVacancies.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.allVacanie = action.payload;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(fetchByUserIdVacancie.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchByUserIdVacancie.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.vacancies = action.payload;
            })
            .addCase(fetchByUserIdVacancie.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(createVacancie.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createVacancie.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(createVacancie.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(deleleteVacancie.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleleteVacancie.fulfilled, (state, action) => {
                state.status = 'resolved';
            })
            .addCase(deleleteVacancie.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(publishVacancie.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(publishVacancie.fulfilled, (state, action) => {
                const { idVacancie, isPublished } = action.payload;
                const vacancie = state.vacancies.find(t => t.idVacancie === idVacancie);
                if (vacancie) {
                    vacancie.isPublished = isPublished;
                }
            })
            
            .addCase(publishVacancie.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

    }
})
export const {removeVacancie} = vacancieSlicer.actions;
export default vacancieSlicer.reducer