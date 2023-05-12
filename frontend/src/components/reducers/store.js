import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userSlice from './userSlice'
import profileSlice from './profileSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userStore: userSlice,
    profileStore: profileSlice
  },
})