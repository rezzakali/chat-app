import apiSlice from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get users
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
    }),

    // get user
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = userApi;
