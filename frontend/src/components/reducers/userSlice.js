import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
        login:(state, action)=>{
            return action.payload
        },
        logout:(state,action)=>{
            localStorage.clear() 
            return action.payload
        }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { login, logout } = userSlice.actions
  
  export default userSlice.reducer