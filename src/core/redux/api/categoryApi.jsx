import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { base_url } from '../../../environment';
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    tagTypes: ['categoryList' , 'CategoryCode'],
    endpoints: (builder)=> ({
        getCategoryCode: builder.query({
            query: () => '/category/generate-category-code',
            providesTags: () => [{type: 'CategoryCode'}],
        }),
        getCategoryList: builder.query({
            query: () => '/category',
          }),
    })

})

export const { useGetCategoryCodeQuery, useGetCategoryListQuery } = categoryApi;
export const {
    reducer: categoryApiReducer,
  } = categoryApi;