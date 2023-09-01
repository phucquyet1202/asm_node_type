import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const productApi = createApi({
  reducerPath: "product",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<any, void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query<any, any>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    removeProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/products`,
        method: "POST",
        body: pro,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/products/${pro._id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    createComments: builder.mutation({
      query: (data: any) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteComments: builder.mutation({
      query: (id: any) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetAllProductQuery,
  useGetOneProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
  useCreateCommentsMutation,
  useDeleteCommentsMutation,
} = productApi;
export default productApi;
