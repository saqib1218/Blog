// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Retrieve the token from localStorage (if it exists)
const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set credentials (token and user) after successful login or registration
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Store the user in localStorage

    },
    // Clear credentials on logout
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user'); // Remove the user from localStorage
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;