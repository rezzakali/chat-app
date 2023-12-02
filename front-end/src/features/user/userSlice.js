import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onlineUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;
