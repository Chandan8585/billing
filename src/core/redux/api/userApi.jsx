// src/store/api/cartApi.js
import { productApi } from './productApi';

const extendedUserApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['User'],
    }),
    signUpUser: builder.mutation({
      query: ({name, email, password}) => ({
        url: `/signup`,
        method: 'POST',
        body: { name, email, password },
      }),
      invalidatesTags: ['User'],
    }),
    userProfileUpdate: builder.mutation({
      query: (productId) => ({
        url: `/cart`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    removeFromUser: builder.mutation({
      query: (productId) => ({
        url: `/cart/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserTotals: builder.query({
      query: () => '/cart/totals',
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useRemoveFromUserMutation,
  useGetUserTotalsQuery,
} = extendedUserApi;
