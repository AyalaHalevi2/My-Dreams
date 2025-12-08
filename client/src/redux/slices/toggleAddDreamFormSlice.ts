import { createSlice } from '@reduxjs/toolkit'

export interface ToggleAddDreamFormState {
  isOpen: boolean;
}
const initialState: ToggleAddDreamFormState = {
  isOpen: false,
}

const toggleAddDreamFormSlice = createSlice({
  name: 'toggleAddDreamForm',
  initialState,
  reducers: {
    openAddDreamForm:(state) => {
      state.isOpen = true;
    },
    closeAddDreamForm:(state) => {
      state.isOpen = false;
    }
  }
});

export const { openAddDreamForm, closeAddDreamForm } = toggleAddDreamFormSlice.actions

export default toggleAddDreamFormSlice.reducer
