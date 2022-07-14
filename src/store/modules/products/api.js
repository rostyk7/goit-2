import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ activePage, total }) => `/products?limit=${total}&skip=${total * activePage}`
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`
    })
  })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

export default productsApi;