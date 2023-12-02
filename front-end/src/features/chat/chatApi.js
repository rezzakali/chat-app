import apiSlice from '../api/apiSlice';

const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create chat
    createChat: builder.mutation({
      query: (data) => ({
        url: `/chats`,
        method: 'POST',
        body: data,
      }),
    }),

    // get chats
    getChats: builder.query({
      query: (userId) => ({
        url: `/chats/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatApi;
