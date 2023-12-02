import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
  devTools: import.meta.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
