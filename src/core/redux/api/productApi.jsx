import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../../../environment.jsx';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes: ['Product', 'Category', 'Store', 'storeData', 'Sku', 'brand', 'unit', 'itemCode', 'warrantyList'],
    endpoints: (builder) => ({
        getProductDetailById: builder.query({
            query: (id)=> {
                return `product/productList/${id}`
            },
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getNewSkuId: builder.query({
            query: () => `product/generate-sku-code`,
            transformResponse: (response)=> response.code,
            providesTags: ['Sku'], 
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
            query: () => 'brandlist',
            providesTags: ['brand'],
        }),
        getUnitList: builder.query({
            query: () => 'unitlist',
            providesTags: ['unit'],
        }),
        getTypeOfWarrantyList: builder.query({
            query: () => 'warrantylist',
            providesTags: ['warrantyList'],
        }),

        // Mutations
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
                url: `product/productList/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
});

export const {
    useGetProductDetailByIdQuery,
    useGetStoreListQuery,
    useGetBrandListQuery,
    useGetNewSkuIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;