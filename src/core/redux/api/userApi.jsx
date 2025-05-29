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
    
    // removeFromUser: builder.mutation({
    //   query: (productId) => ({
    //     url: `/cart/product/${productId}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    // getUserTotals: builder.query({
    //   query: () => '/cart/totals',
    //   providesTags: ['User'],
    // }),
    
    getAllSupplier: builder.query({
      query: ()=> ({
        query: () => '/users/suppliers',
        providesTags: ['User'],
      }),
    })
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useGetAllSupplierQuery,
  useRemoveFromUserMutation,
  useGetUserTotalsQuery,
  useUserProfileUpdateMutation
} = extendedUserApi;
