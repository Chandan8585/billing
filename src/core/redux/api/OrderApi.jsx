
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
    }),
    createPurchaseOrder: builder.mutation({
      query: (purchaseOrderData) => {
        console.log('[RTK Query] Creating purchase order with data:', purchaseOrderData);
        return {
          url: 'orders/purchase-orders',
          method: 'POST',
          body: purchaseOrderData,
          credentials: 'include'
        }
      },
      invalidatesTags: ['PurchaseOrder'],
      // Add transformResponse and transformErrorResponse for more debugging
      transformResponse: (response, meta, arg) => {
        console.log('[RTK Query] Transform response:', response);
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log('[RTK Query] Transform error response:', response);
        return response;
      }
    }),
    getPurchaseOrders: builder.query({
      query: () => '/orders/purchase-orders',
      transformResponse: (response) => response.data,
      providesTags: ['PurchaseOrder']
    }),
    getTodayPurchaseOrder: builder.query({
      query: () => '/orders/today-purchase-orders',
      transformResponse: (response) => response.data,
      providesTags: ['PurchaseOrder']
    }),
    getPurchaseOrderById: builder.query({
      query: (id) => `/orders/purchase-orders/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'PurchaseOrder', id }]
    }),

    updatePurchaseOrder: builder.mutation({
      query: ({ _id, ...data }) => {
        // Debug: Log the complete data being sent
        console.group('updatePurchaseOrder Mutation Request');
        console.log('Endpoint:', `/orders/purchase-orders/${_id}`);
        console.log('Method:', 'PATCH');
        console.log('Full payload data:', JSON.parse(JSON.stringify(data)));
        console.groupEnd();
    
        return {
          url: `/orders/purchase-orders/${_id}`,
          method: 'PATCH',
          body: data,
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: 'PurchaseOrder', _id },
        'PurchaseOrder'
      ],
      // Add transformResponse to log the API response
      transformResponse: (response, meta, arg) => {
        console.group('updatePurchaseOrder Mutation Response');
        console.log('Response:', response);
        console.log('Original arg:', arg);
        console.groupEnd();
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response, meta, arg) => {
        console.group('updatePurchaseOrder Mutation Error');
        console.error('Error response:', response);
        console.log('Status:', response.status);
        console.log('Original arg:', arg);
        console.groupEnd();
        return response;
      }
    }),
    deletePurchaseOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/purchase-orders/${id}`,
        method: 'DELETE',
        credentials: 'include'
      }),
      invalidatesTags: ['PurchaseOrder']
    }),
    getTodaySalesOrder: builder.query({
      query: () => '/orders/today-sales-orders',
      transformResponse: (response) => response.data,
      providesTags: ['SalesOrder']
    }),
    
    getSalesOrders: builder.query({
      query: () => '/orders/sales-orders',
      transformResponse: (response) => response.data,
      providesTags: ['SalesOrder']
    }),
    
    getSalesOrderById: builder.query({
      query: (id) => `/orders/sales-orders/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'SalesOrder', id }]
    }),
    
    createSalesOrder: builder.mutation({
      query: (salesOrderData) => {
        console.log('[RTK Query] Creating sales order with data:', salesOrderData);
        return {
          url: 'orders/sales-orders',
          method: 'POST',
          body: salesOrderData,
          credentials: 'include'
        };
      },
      invalidatesTags: ['SalesOrder'],
      transformResponse: (response, meta, arg) => {
        console.log('[RTK Query] Sales order created:', response);
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.error('[RTK Query] Sales order create error:', response);
        return response;
      }
    }),
    
    updateSalesOrder: builder.mutation({
      query: ({ _id, ...data }) => {
        console.group('updateSalesOrder Mutation Request');
        console.log('Endpoint:', `/orders/sales-orders/${_id}`);
        console.log('Payload:', data);
        console.groupEnd();
    
        return {
          url: `/orders/sales-orders/${_id}`,
          method: 'PATCH',
          body: data,
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: 'SalesOrder', _id },
        'SalesOrder'
      ],
      transformResponse: (response, meta, arg) => {
        console.group('updateSalesOrder Mutation Response');
        console.log('Response:', response);
        console.log('Original arg:', arg);
        console.groupEnd();
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.group('updateSalesOrder Mutation Error');
        console.error('Error response:', response);
        console.log('Status:', response.status);
        console.log('Original arg:', arg);
        console.groupEnd();
        return response;
      }
    }),
    
    deleteSalesOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/sales-orders/${id}`,
        method: 'DELETE',
        credentials: 'include'
      }),
      invalidatesTags: ['SalesOrder']
    })
    

}),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useCreatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useGetTodayPurchaseOrderQuery,
  useGetTodaySalesOrderQuery,
  useGetSalesOrderByIdQuery,
  useDeleteSalesOrderMutation,
  useCreateSalesOrderMutation,
  useUpdateSalesOrderMutation
} = extendedOrderApi;
