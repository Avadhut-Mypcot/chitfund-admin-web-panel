import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/auth.types";

const initialState: AuthState = {
    token: null,
    user: null,
    permission: null,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.permission = null;
            localStorage.clear();
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setUserPermission: (state, action: PayloadAction<string[] | null>) => {
            state.permission = action.payload;
        },
    },
});

export const {
    setToken,
    setError,
    setLoading,
    clearAuth,
    setUserInfo,
    setUserPermission,
} = authSlice.actions;

export default authSlice.reducer;
