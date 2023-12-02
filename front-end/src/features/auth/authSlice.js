import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },

    Logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.user = null;
    },
  },
});

export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;
