import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdditionalServices = createAsyncThunk(
  'additionalServices/fetchAll',
  async ({rejectWithValue}) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}additionalservices`);
        return res.data;
    }
    catch(error){
        return rejectWithValue(error)
    }
    
  }
);

export const createAdditionalService = createAsyncThunk(
  'additionalServices/addService',
  async ({serviceName, description, price}, {rejectWithValue}) => {
    try{
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const idUser = user.user.id
        const response = await axios.post(`${process.env.REACT_APP_API_URL}additionalServices/${idUser}`, 
            {serviceName, description, price})
        return response.data
    }
    catch(error){
        return rejectWithValue(error);
    }
  }
);

export const fetchAdditionalServicesByIds = createAsyncThunk(
    'services/fetchById',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}additionalServices/byId/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
      }
    }
  );

  export const deleteAdditionalService = createAsyncThunk(
    'additionalServices/deleteService',
    async ({serviceId}, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}additionalServices/${serviceId}`
        );
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Delete failed');
      }
    }
  );
  
  
const additionalServicesSlice = createSlice({
  name: 'additionalServices',
  initialState: {
    addService: [],
    statusService: 'idle',
    error: null,
  },
  reducers: {
    removeService(state, action){
        state.addService = state.addService.filter(addService => addService.serviceId !== action.payload);
    },
    
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAdditionalServices.pending, (state) => {
            state.statusService = 'loading';
            state.error = null;
        })
        .addCase(fetchAdditionalServices.fulfilled, (state, action) => {
            state.statusService = 'resolved';
            state.addService = action.payload;
        })
        .addCase(fetchAdditionalServices.rejected, (state, action) => {
            state.statusService = 'rejected';
            state.error = action.error.message;
        })
        .addCase(createAdditionalService.pending, (state) => {
            state.statusService = 'loading';
            state.error = null;
        })
        .addCase(createAdditionalService.fulfilled, (state, action) => {
          state.statusService = 'resolved';
          const exists = state.addService.some(s => s.serviceId === action.payload.serviceId);
          if (!exists) {
            state.addService.push(action.payload);
          }
        })
        
        .addCase(createAdditionalService.rejected, (state, action) => {
            state.statusService = 'rejected';
            state.error = action.error.message;
        })
        .addCase(fetchAdditionalServicesByIds.pending, (state) => {
            state.statusService = 'loading';
            state.error = null;
        })
        .addCase(fetchAdditionalServicesByIds.fulfilled, (state, action) => {
            state.statusService = 'resolved';
            const exists = state.addService.some(s => s.serviceId === action.payload.serviceId);
            if (!exists) {
              state.addService = action.payload;
            }
        })
        .addCase(fetchAdditionalServicesByIds.rejected, (state, action) => {
            state.statusService = 'rejected';
            state.error = action.error.message;
        })
        .addCase(deleteAdditionalService.fulfilled, (state, action) => {
          state.statusService = 'resolved';
          const deletedId = action.payload.serviceId;
          state.addService = state.addService.filter(service => service.serviceId !== deletedId);
        })
        
          
          
  },
});
export const { removeService, setService } = additionalServicesSlice.actions;
export default additionalServicesSlice.reducer;
