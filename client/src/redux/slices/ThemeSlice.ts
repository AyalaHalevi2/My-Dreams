import { createSlice } from '@reduxjs/toolkit'
export interface ThemeState {
    theme: 'light' | 'dark';
}


const getInitialTheme = (): 'light' | 'dark' => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark' ? saved : 'dark');
};
const initialState: ThemeState = {
    theme: getInitialTheme(),
};

const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
         toggleTheme(state) {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        }
    }
});

export const {toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer
