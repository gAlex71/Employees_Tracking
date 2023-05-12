import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, {getState}) => {
    //Берем токен из глобального стейта
    const token = (getState() as RootState).authSlice.user?.token || localStorage.getItem('token');

    //Помещаем токен в заголовок запроса, поле авторизации
    if(token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
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