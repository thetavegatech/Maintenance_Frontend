import { apiSlice } from './apiSlice'
const USERS_URL = 'http://192.168.29.93:5000/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${'http://192.168.29.93:5000/api/users'}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${'http://192.168.29.93:5000/api/users'}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
