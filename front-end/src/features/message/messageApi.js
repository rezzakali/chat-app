import apiSlice from '../api/apiSlice';

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get messages
    getMessages: builder.query({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: 'GET',
      }),
      providesTags: ['Messages'],
    }),

    // create message
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Messages'],

      //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //     try {
      //       const response = await queryFulfilled;
      //       console.log('response', response);

      //       dispatch(
      //         apiSlice.util.updateQueryData('getMessages', arg.data, (draft) => {
      //           console.log(arg);
      //           //   const post = draft.posts.find((post) => post._id === arg.postId);
      //           console.log('draftData', current(draft));
      //           //   if (post) {
      //           //     const findIndex = draft.posts.indexOf(post);

      //           //     draft.posts[findIndex] = response?.data?.updatedPost;
      //           //   }
      //         })
      //       );
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   },
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
