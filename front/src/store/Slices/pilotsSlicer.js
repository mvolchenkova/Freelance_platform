import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPilots = createAsyncThunk(
    'pilots/fetchPilots',async(page,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}pilot?limit=7&page=${page}`)
            return response.data;
            }
        catch(error){
            console.error("Fetch pilots error:", error);
            return rejectWithValue(error.message)
        }
    }
)
export const searchPilots = createAsyncThunk(
    'pilots/searchPilots', async (search,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}pilot?limit=10&search=${search}`)
            const data = response.data;
            return data
        }catch(error){
            console.error("Find pilot error:", error);
            return rejectWithValue(error.message)
        }
    }
)
export const getByIdPilot = createAsyncThunk(
    'pilots/getByIdPilot',async(id,{rejectWithValue}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}pilot/${id}`)
            return response.data
        }catch(error){
            console.log('Find pilot error');
            return rejectWithValue(error.message);
        }
    }
)
export const getSavedPilots = createAsyncThunk(
    'pilots/getSavedPilots', async (_,{rejectWithValue,dispatch}) =>{
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const id = user.user.id
            const response = await axios.get(`${process.env.REACT_APP_API_URL}savedpilots/${id}`)
            dispatch(addSavedPilots(response.data))
            return response.data
        }catch(error){
            console.log('Find Saved pilot error'+error);
            return rejectWithValue(error.message);
        }
    }
)
export const SavePilot = createAsyncThunk(
    'pilots/SavePilot' , async (idPilot,{rejectWithValue}) =>{
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const id = user.user.id
            await axios.post(`${process.env.REACT_APP_API_URL}savedpilots/save`,{
                idPilot:idPilot,
                idUser: id
            })
        }catch(error){
            
            return rejectWithValue(error.message);
        }
    }
)
export const DeleteSavePilot = createAsyncThunk(
    'pilots/DeleteSavePilot' , async (idPilot,{rejectWithValue}) =>{
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const id = user.user.id
          
            await axios.delete(`${process.env.REACT_APP_API_URL}savedpilots/delete`,{
                data: {
                    idPilot: idPilot,
                    idUser: id
                }
            })
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)


const pilotSlicer = createSlice({
    name:'pilots',
    initialState:{
        pilots:[],
        savedPilots:[],
        currentPilot:null,
        comporationPilots:[],
        search:'',
        page:1,
        status: null,
        error: null
    },
    reducers:{
        setCurrentPilot(state, action) {
            state.currentPilot = action.payload;
        },
        addToComporation(state,action){
            state.comporationPilots = [...state.comporationPilots, action.payload]
        },
        addSavedPilots(state,action){
            state.savedPilots = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchPilots.pending, (state) =>{
             state.status = 'loading';
             state.error = null
         })
         .addCase(fetchPilots.fulfilled, (state, action) =>{
             state.status = 'resolved';
             state.pilots = action.payload;
             state.page = action.payload.pages;
         })
         .addCase(fetchPilots.rejected, (state, action) =>{
             state.status ='rejected';
             state.error = action.error.message;
         })
         .addCase(searchPilots.fulfilled, (state, action) => {
             state.status = 'resolved';
             state.pilots = action.payload;
             
         })
         .addCase(searchPilots.rejected, (state, action) =>{
             state.status ='rejected';
             state.error = action.payload;
         })
         .addCase(getByIdPilot.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.currentPilot = action.payload;
        })
         .addCase(getByIdPilot.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.payload;
        })
        .addCase(getByIdPilot.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(getSavedPilots.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.savedPilots = action.payload;
        })
         .addCase(getSavedPilots.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.payload;
        })
        .addCase(getSavedPilots.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(SavePilot.fulfilled, (state, action) => {
            state.status = 'resolved';
        })
         .addCase(SavePilot.rejected, (state, action) =>{
            state.status ='rejected';
            state.error = action.payload;
        })
        .addCase(SavePilot.pending, (state) =>{
            state.status = 'loading';
            state.error = null
        })
     }
})
export const {setCurrentPilot, addToComporation,addSavedPilots} = pilotSlicer.actions;
export default pilotSlicer.reducer;