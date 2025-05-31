// src/store/api/cartApi.js
import { productApi } from './productApi';
import { setUser } from '../slice/userSlice';
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Optionally store user data in Redux if needed
          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
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
      query: (formData) => ({
        url: `/user/profile`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['User'],
    }),
    getAllSupplier: builder.query({
      query: () => '/users/suppliers',
      providesTags: ['supplier'],
    }),
    getAllCustomer: builder.query({
      query: () => '/users/customers',
      providesTags: ['customer'],
    })
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useGetAllSupplierQuery,
  useGetAllCustomerQuery,
  useRemoveFromUserMutation,
  useGetUserTotalsQuery,
  useUserProfileUpdateMutation
} = extendedUserApi;
