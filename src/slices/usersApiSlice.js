import { apiSlice } from './apiSlice'
const USERS_URL = 'https://mms-backend-n2zv.onrender.com/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${'https://mms-backend-n2zv.onrender.com/api/users'}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${'https://mms-backend-n2zv.onrender.com/api/users'}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
