import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface UserInfoState{
  email: string;
  name: string;

}

const initialState:UserInfoState = {
    email:  "example@gmail.com",
  name:"user",

}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeUserInfo:(state, action: PayloadAction<UserInfoState>)=>{
        state= action.payload
    }
  }
});

export const {} = userInfoSlice.actions

export default userInfoSlice.reducer
