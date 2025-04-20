import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, dispatch, setUsers }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}user/`);
      dispatch(setUsers(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const registration = createAsyncThunk(
  'users/registration',
  async ({ email, login, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}user/registration`, {
        email,
        login,
        password,
        role,
      });

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const logout = createAsyncThunk('users/logout', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem('token');
    await axios.post(
      `${process.env.REACT_APP_API_URL}user/logout`,
      { refreshToken },
      { withCredentials: true },
    );
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});
export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, {
        email,
        password,
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.status);
    }
  },
);
export const EditInformation = createAsyncThunk(
  'users/EditInformation',
  async ({ salary, location, description }, { rejectWithValue }) => {
    try {
     const user = JSON.parse(localStorage.getItem('currentUser'))
     const id = user.user.id
     const response = await axios.post(`${process.env.REACT_APP_API_URL}UserInformation/${id}`,{
      salary,
      location,
      description
     })
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const BlockUser = createAsyncThunk('users/BlockUser', async (id, { rejectWithValue }) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}user/blockUser/${id}`);
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const fetchInf = createAsyncThunk('users/Inf', async (_, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const id = user.user.id
    const response = await axios.get(`${process.env.REACT_APP_API_URL}UserInformation/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
});

const usersSlicer = createSlice({
  name: 'users',
  initialState: {
    users: [],
    savedUsers: [],
    inf: {},
    currentUsers: null,
    status: null,
    error: null,
  },

  reducers: {
    setinf(state, action) {
      state.inf = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUsers = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSavedFreelancer(state, action) {
      state.savedUsers.push(action.payload);
    },
    removeSavedFreelancer(state, action) {
      state.savedUsers = state.savedUsers.filter((user) => user.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentUsers = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'resolved';
        state.currentUsers = null;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentUsers = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(EditInformation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(EditInformation.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.inf = action.payload;
      })
      .addCase(EditInformation.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchInf.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInf.fulfilled, (state,action) => {
        state.status = 'resolved';
        state.inf = action.payload;
      })
      .addCase(fetchInf.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});
export const { setCurrentUser, setUsers, setSavedFreelancer, removeSavedFreelancer } =
  usersSlicer.actions;
  export default usersSlicer.reducer;
