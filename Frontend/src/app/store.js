// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../features/auth/authApiSlice';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice'; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer, // Add the auth API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the main API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(apiSlice.middleware),
});