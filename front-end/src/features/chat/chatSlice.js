import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  selectedChat: null,
  isChatSelect: false,
  selectedUser: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    updateChats: (state, action) => {
      const newChat = action.payload;
      const existingChat = state.chats.find(
        (chat) => chat?._id?.toString() === newChat?.[0]?._id?.toString()
      );

      if (!existingChat) {
        state.chats = [...state.chats, newChat];
      }
    },
    setSelectedChat: (state, action) => {
      const { id, user } = action.payload;
      state.selectedUser = user;
      const foundedChat = state.chats.find(
        (chat) => chat._id?.toString() === id?.toString()
      );
      state.isChatSelect = true;
      state.selectedChat = foundedChat;
    },
  },
});

export const { setChats, updateChats, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
