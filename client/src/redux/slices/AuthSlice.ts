import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from "react-router"
import type { PayloadAction } from '@reduxjs/toolkit'

import { logout } from '../../functions/FetchFuncitons';

export interface AuthState {
    isLoggedIn: boolean;
}
const initialState: AuthState = {
    isLoggedIn: false,
}

const navigate = useNavigate()

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogin:(state) => {
            state.isLoggedIn = true;

            navigate('/');
        },
        hadleLogout:(state) => {
            try {
                logout();
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                console.log('logged out successfully');
                state.isLoggedIn = false;
                navigate('/login');
            }
        },
        changeLoginState:(state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { hadleLogout, handleLogin, changeLoginState } = AuthSlice.actions

export default AuthSlice.reducer
