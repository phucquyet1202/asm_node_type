import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
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
    getAllUser: builder.query<any, void>({
      query: () => "/auth",
      providesTags: ["Auth"],
    }),
    getOneUser: builder.query<any, any>({
      query: (id) => `/auth/${id}`,
      providesTags: ["Auth"],
    }),

    signup: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/signup`,
        method: "POST",
        body: pro,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation<any, any>({
      query: (pro) => ({
        url: `/signin`,
        method: "POST",
        body: pro,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUserByToken: builder.mutation({
      query: (token: string | null) => ({
        url: `/get-user-token`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
export const {
  useGetAllUserQuery,
  useGetOneUserQuery,
  useSigninMutation,
  useSignupMutation,
  useGetUserByTokenMutation,
} = authApi;
export default authApi;
