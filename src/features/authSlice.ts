import { LoginFormData, User } from '@/types/app-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nextAuthApi } from '@/services/apiServices';
import cookie from 'cookie';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean
    message: string;
};

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    message: ''
};

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (formData: LoginFormData, { rejectWithValue }) => {
        try {
            const res = await nextAuthApi.post('/login', formData);
            const data = await res.data;
            return data;
        } catch(err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const refreshTokenThunk = createAsyncThunk(
    'auth/refreshTokenThunk',
    async (_, { rejectWithValue }) => {
        try {
            const res = await nextAuthApi.post('/refresh-token');
            const cookies = document?.cookie;
            const user = JSON.parse(cookie.parse(cookies).user);
            return user;
        } catch(err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logoutThunk',
    async (_, { rejectWithValue }) => {
        try {
            const res = await nextAuthApi.post('/logout');
            return 'Logged Out Successfully!';
        } catch(err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.loading = true;
                state.message = 'Loading...'
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data
                state.isAuthenticated = true;
                state.message = action.payload.success
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = (action.payload as any).error
            })
            .addCase(refreshTokenThunk.pending, (state, action) => {
                state.loading = true;
                state.message = 'Loading...'
            })
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
                state.isAuthenticated = true;
            })
            .addCase(refreshTokenThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = (action.payload as any).error
            })
            .addCase(logoutThunk.pending, (state, action) => {
                state.loading = true;
                state.message = 'Loading...'
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.message = action.payload
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = (action.payload as any).error
            })
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;