import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isLoggedIn: boolean;
}
const initialState: AuthState = {
    isLoggedIn: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogin: (state) => {
            state.isLoggedIn = true;
        },
        handleLogout: (state) => {
            state.isLoggedIn = false;
        },
        changeLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { handleLogout, handleLogin, changeLoginState } = AuthSlice.actions

export default AuthSlice.reducer
