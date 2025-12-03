import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import studentReducer from '../slices/studentSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    auth: authReducer,
  },
});