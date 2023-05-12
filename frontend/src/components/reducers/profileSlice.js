import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const profileSlice = createSlice({
    name: 'profileStore',
    initialState,
    reducers: {
        update_skills:(state, action)=>{
            return action.payload
        },
        update_about_me:(state,action)=>{
            return action.payload
        }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { update_skills, update_about_me } = profileSlice.actions
  
  export default profileSlice.reducer