import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAllUserRequests = createAsyncThunk('request/fetchUserRequests',
    async(id, {rejectWithValue}) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}request/${id}`)
            return response.data
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

export const sendRequest = createAsyncThunk('request/createRequest',
    async({idFreelancer,idVacancie}, {rejectWithValue}) => {
        try{
               console.log(idFreelancer)
                console.log(idVacancie)
            const freelancer = JSON.parse(localStorage.getItem('currentUser'))
            const id = freelancer.user.id
            const response = await axios.post(`${process.env.REACT_APP_API_URL}request/${id}`,
                {
                    idFreelancer:idFreelancer,
                    idVacancie
                }
            )
            return response.data
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

export const acceptRequest = createAsyncThunk('request/acceptRequest',
    async(idRequest, {rejectWithValue}) => {
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}request/acceptRequest/${idRequest}`)
            return response.data;
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)

export const rejectRequest = createAsyncThunk('request/rejectRequest',
    async(idRequest, {rejectWithValue}) => {
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}request/rejectRequest/${idRequest}`)
            return response.data;
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)

const requestSlice = createSlice({
    name: 'request',
    initialState: {
      request: [],
      statusReq: null,
      error: null,
    },
    reducers:{

    },
    extraReducers:(builder) => {
        builder
        .addCase(sendRequest.pending, (state) => {
            state.statusReq = 'loading';
            state.error = null;
        })
        .addCase(sendRequest.fulfilled, (state, action) => {
            state.statusReq = 'resolved';
            state.request = action.payload;
        })
        .addCase(sendRequest.rejected, (state, action) => {
            state.statusReq = 'rejected';
            state.error = action.error.message;
        })
        .addCase(acceptRequest.pending, (state) => {
            state.statusReq = 'loading';
            state.error = null;
        })
        .addCase(acceptRequest.fulfilled, (state, action) => {
            state.statusReq = 'resolved';

        })
        .addCase(acceptRequest.rejected, (state, action) => {
            state.statusReq = 'rejected';
            state.error = action.error.message;
        })
        .addCase(rejectRequest.pending, (state) => {
            state.statusReq = 'loading';
            state.error = null;
        })
        .addCase(rejectRequest.fulfilled, (state, action) => {
            state.statusReq = 'resolved';

        })
        .addCase(rejectRequest.rejected, (state, action) => {
            state.statusReq = 'rejected';
            state.error = action.error.message;
        })
        .addCase(fetchAllUserRequests.pending, (state) => {
            state.statusReq = 'loading';
            state.error = null;
        })
        .addCase(fetchAllUserRequests.fulfilled, (state, action) => {
            state.statusReq = 'resolved';
            state.request = action.payload;
        })
        .addCase(fetchAllUserRequests.rejected, (state, action) => {
            state.statusReq = 'rejected';
            state.error = action.error.message;
        })
    }
})
export default requestSlice.reducer;