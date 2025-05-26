// src/store/api/cartApi.js
import { productApi } from './productApi';

const extendedCartApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['cart'],
      // Disable automatic refetching
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: '/cart/add',
        method: 'POST',
        body: product
      }),   
      invalidatesTags: ['Cart']
    }),
    updateCartQuantity: builder.mutation({
    query: ({ productId, quantity }) => {
      const id = typeof productId === 'object' ? productId._id || productId.id : productId;
      
      return {
        url: `cart/${id}`,
        method: 'PATCH',
        body: { quantity },
      };
    },
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    emptyCart: builder.mutation({
      query:()=> ({
        url: '/cart/empty',
        method: 'DELETE',
      })
    }),
    getCartTotals: builder.query({
      query: () => '/cart/totals',
      providesTags: ['Cart'],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useEmptyCartMutation,
  useRemoveFromCartMutation,
  useGetCartTotalsQuery,
} = extendedCartApi;
