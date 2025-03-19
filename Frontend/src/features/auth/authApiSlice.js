// features/auth/authApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the base URL from the environment variable
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Define the base query for auth endpoints (no token required)
const authBaseQuery = fetchBaseQuery({
  baseUrl,
});

// Create the auth API slice
export const authApiSlice = createApi({
  reducerPath: 'authApi', // Unique key for the reducer
  baseQuery: authBaseQuery, // Use the base query without token
  endpoints: (builder) => ({
    // Define your auth endpoints here
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApiSlice;