import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://back-voit-wallet.herokuapp.com/api',
    prepareHeaders: async (headers, { getState }) => {
      const token = await getState().authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Transaction'],
  endpoints: builder => ({
    getTransactions: builder.query({
      query: (page = 1, limit = 10) =>
        `/transactions?page=${page}&limit=${limit}`,
      providesTags: ['Transaction'],
    }),
    getTransactionsStatistics: builder.query({
      query: (month = 9, year = 2022) =>
        `/transactions/statistics?month=${month}&year=${year}`,
      providesTags: ['Transaction'],
    }),
    addTransaction: builder.mutation({
      query: value => ({
        url: '/transactions/add',
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Transaction'],
    }),
    getTransactionsFullStatistic: builder.query({
      query: () => `/transactions`,
      providesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useGetTransactionsStatisticsQuery,
  useGetTransactionsFullStatisticQuery,
} = transactionApi;
