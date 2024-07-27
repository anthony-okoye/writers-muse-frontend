// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/redux/slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
