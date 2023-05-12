import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
})

//Повторение запроса в случае сброса
const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 1
})

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});