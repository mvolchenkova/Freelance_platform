import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    currentUser: null,
    error: null,
};

export const deleteUserThunk = createAsyncThunk(
    'user/deleteUser',
    async (userId) => {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the user');
        }
        return userId; // Return the user ID for further processing
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
            
    },
});

// Экспорт редьюсеров
export default userSlice.reducer;