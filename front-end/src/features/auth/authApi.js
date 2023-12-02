import apiSlice from '../api/apiSlice';
import { Login } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    // signin
    signin: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          const { user, token } = response?.data || {};

          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(user));

          dispatch(Login({ token, user }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
