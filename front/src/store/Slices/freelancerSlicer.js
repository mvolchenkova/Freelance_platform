import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFreelancers = createAsyncThunk(
  'freelancers/fetchFreelancers',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/freelancer`, {
        params: filters // Передаем параметры фильтрации
      });
      return response.data;
    } catch (error) {
      // Проверяем, есть ли response в error (стандартное поведение axios)
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.statusText);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchFreelancerById = createAsyncThunk(
  'freelancers/fetchFreelancerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/freelancer/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.statusText);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  freelancers: [],
  currentFreelancer: null,
  loading: false,
  error: null,
  filters: {
    profession: '',
    location: '',
    minRate: 0,
    skills: [],
    search: ''
  },
};

const freelancerSlice = createSlice({
  name: 'freelancers',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetFreelancerState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreelancers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancers = action.payload;
      })
      .addCase(fetchFreelancers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch freelancers';
      })
      .addCase(fetchFreelancerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFreelancerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFreelancer = action.payload;
      })
      .addCase(fetchFreelancerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch freelancer';
      });
  },
});

// Селекторы
export const selectAllFreelancers = (state) => state.freelancers.freelancers;
export const selectCurrentFreelancer = (state) => state.freelancers.currentFreelancer;
export const selectFreelancerLoading = (state) => state.freelancers.loading;
export const selectFreelancerError = (state) => state.freelancers.error;
export const selectFreelancerFilters = (state) => state.freelancers.filters;

export const selectFilteredFreelancers = (state) => {
  const { freelancers } = state.freelancers;
  const { profession, location, minRate, skills, search } = state.freelancers.filters;

  return freelancers.filter(freelancer => {
    const professionMatch = !profession || 
      freelancer.Profession.toLowerCase().includes(profession.toLowerCase());
    
    const locationMatch = !location || 
      freelancer.location.toLowerCase().includes(location.toLowerCase());
    
    const rateMatch = !minRate || 
      parseInt(freelancer.payment.replace(/,/g, '')) >= minRate;
    
    const skillsMatch = skills.length === 0 || 
      skills.every(skill => 
        freelancer.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
    
    const searchMatch = !search ||
      freelancer.name.toLowerCase().includes(search.toLowerCase()) ||
      (freelancer.smallDesc && freelancer.smallDesc.toLowerCase().includes(search.toLowerCase()));
    
    return professionMatch && locationMatch && rateMatch && skillsMatch && searchMatch;
  });
};

export const { setFilters, clearFilters, resetFreelancerState } = freelancerSlice.actions;

export default freelancerSlice.reducer;