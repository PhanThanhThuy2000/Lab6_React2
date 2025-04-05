import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
}

interface ResponseData {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.100.163:3000',
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<ResponseData, UserData>({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;