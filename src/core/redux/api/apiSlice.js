// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../../../environment.jsx';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [
    'Cart', 
    'Product', 
    'Category', 
    'Store', 
    'storeData', 
    'Sku', 
    'brand', 
    'unit', 
    'itemCode', 
    'warrantyList',
    'CategoryCode'
  ],
  endpoints: () => ({}), // Start with empty endpoints
});