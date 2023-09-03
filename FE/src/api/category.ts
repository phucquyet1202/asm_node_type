import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],
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
    getAllCate: builder.query<any, void>({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    getOneCate: builder.query<any, any>({
      query: (id) => `/category/${id}`,
      providesTags: ["Category"],
    }),
    removeCate: builder.mutation<any, any>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    addCate: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/category`,
        method: "POST",
        body: pro,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCate: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/category/${pro._id}`,
        method: "PUT",
        body: pro,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
export const {
  useGetAllCateQuery,
  useGetOneCateQuery,
  useRemoveCateMutation,
  useAddCateMutation,
  useUpdateCateMutation,
} = categoryApi;
export default categoryApi;
