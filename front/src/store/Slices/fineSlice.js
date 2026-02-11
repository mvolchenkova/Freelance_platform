import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; //  Вынесем URL API для удобства

export const createFine = createAsyncThunk(
    'fines/createFine',
    async ({idUser,Reason,Cost}, { rejectWithValue }) => {
        console.log(idUser,Reason,Cost)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}fines`, {
                idUser,
                Reason,
                Cost
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message); //  Более информативное сообщение об ошибке
        }
    }
);

export const fetchFines = createAsyncThunk(
    'fines/fetchFines',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}fine`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const fetchFineById = createAsyncThunk(
    'fines/fetchFineById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}fine/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const updateFine = createAsyncThunk(
    'fines/updateFine',
    async ({ id, fineData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}fine/${id}`, fineData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const deleteFine = createAsyncThunk(
    'fines/deleteFine',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}fine/${id}`);
            return id; // Возвращаем id удаленного штрафа
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);
export const fetchFinesByUserId = createAsyncThunk(
    'fines/fetchFinesByUserId',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}fines/user/${userId}`);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);
const finesSlice = createSlice({
    name: 'fines',
    initialState: {
        fines: [],
        fine: null, //  Для хранения одного штрафа (getById)
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createFine
            .addCase(createFine.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createFine.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.fines=action.payload; //  Добавляем новый штраф в массив
            })
            .addCase(createFine.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            // fetchFines
            .addCase(fetchFines.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFines.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.fines = action.payload;
            })
            .addCase(fetchFines.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            // fetchFineById
            .addCase(fetchFineById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFineById.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.fine = action.payload;
            })
            .addCase(fetchFineById.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            // updateFine
            .addCase(updateFine.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateFine.fulfilled, (state, action) => {
                state.status = 'resolved';
                //  Можно обновить массив fines здесь, если нужно
            })
            .addCase(updateFine.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            // deleteFine
            .addCase(deleteFine.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteFine.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.fines = state.fines.filter((fine) => fine.idFine !== action.payload); //  Удаляем штраф из массива
            })
            .addCase(deleteFine.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(fetchFinesByUserId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFinesByUserId.fulfilled, (state, action) => {
                console.log("Fines from server:", action.payload); // Логирование данных из API
                state.status = 'resolved';
                state.fines = action.payload; // Записываем данные в state.fines
            })
            .addCase(fetchFinesByUserId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            
            
            
    },
});

export default finesSlice.reducer;