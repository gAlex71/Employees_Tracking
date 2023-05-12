import { createSlice } from '@reduxjs/toolkit';
import { authApi, User } from '../../store/services/auth';
import { RootState } from '../../store/store';

interface InitialState {
    user: User & {token: string} | null,
    isAuthenticated: boolean
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Выход из аккаунта
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.registration.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })

    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.authSlice.isAuthenticated;
export const selectUser = (state: RootState) => state.authSlice.user;