// src/store/api/productApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../../../environment.jsx';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url,  credentials: 'include',}),
  tagTypes: ['Product', 'Category', 'Store', 'storeData', 'ProductId', 'brand', 'unit', 'itemCode', 'warrantyList', 'Cart'],
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ()=> `product/productList`,
      providesTags: ['Product list']
    }),
    getProductDetailById: builder.query({
      query: (id) => `product/productList/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
   
    // In your API slice
    getNewProductId: builder.query({
      query: () => 'product/generateProductId',
     // Adjust based on your backend
    }),
    getItemCode: builder.query({
      query: () => `product/generate-itemCode`,
      providesTags: ['itemCode'],
    }),
    getStoreList: builder.query({
      query: () => '/store/store-list',
      providesTags: ['storeData'],
    }),
    getBrandList: builder.query({
      query: () => '/product/brand',
      // transformResponse: (response) => response.data,
      // console.log(response);
      providesTags: ['brand'],
    }),
    createBrand: builder.mutation({
         query: (newBrand) => ({
        url: '/product/addNewBrand',
        method: 'POST',
        body: newBrand,
      }),
      invalidatesTags: ['Product'],
    }),
   
    getUnitList: builder.query({
      query: () => '/product/unit',
      transformResponse: (response) => response.data,
      providesTags: ['unit'],
    }),
    createUnit: builder.mutation({
      query: (newUnit) => ({
        url: '/product/addNewUnit',
        method: 'POST',
        body: newUnit,
      }),
      invalidatesTags: ['unit'],
    }),
    getTypeOfWarrantyList: builder.query({
      query: () => 'warrantylist',
      providesTags: ['warrantyList'],
    }),
    getCategoryCode: builder.query({
      query: () => '/category/generate-category-code',
      providesTags: () => [{ type: 'CategoryCode' }],
    }),
    getCategoryList: builder.query({
      query: () => '/category',
    }),
    createCategory: builder.mutation({
         query: (category) => ({
        url: '/category/add-category',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['category'],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/product/addNewProduct',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `product/productList/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    }),   
    filterProduct: builder.query({
      query: (args) => {  // Take the whole args object
      
        // Create URLSearchParams to prevent duplicates
        const params = new URLSearchParams();
        
        if (args.category && args.category !== 'all') {
          params.append('category', args.category);
        }
        
        if (args.search) {
          params.append('search', args.search);
        }
        
        const url = `product/filter?${params.toString()}`;
        const requestConfig = {
          url,
          method: 'GET'
        };
        
      
        
        return requestConfig;
      },
      providesTags: ['Product'],
    }),
  }),
});


export const {
    useGetProductDetailByIdQuery,
    useGetStoreListQuery,
    useGetBrandListQuery,
    useGetCategoryListQuery,
    useCreateCategoryMutation,
    useGetNewProductIdQuery,
    useFilterProductQuery,
    useCreateProductMutation,
    useCreateBrandMutation,
    useCreateUnitMutation,
    useGetUnitListQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductListQuery,
  } = productApi;
  