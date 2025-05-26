
import { productApi } from './productApi';
const extendedOrderApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: () => ({
        url: '/cart/create-order',
        method: 'POST',
        credentials: 'include' 
      }),
      invalidatesTags: ['Cart'] 
  }),
    getAllOrders: builder.query({
        query: ()=> 'cart/get-all-orders',
        transformResponse: (response) => response.data,
        providesTags: ['Order']
    })
}),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
} = extendedOrderApi;
