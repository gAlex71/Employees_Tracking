import { api } from './api';

export type User = {
    id: string,
    name: string
    email: string,
    password: string,
}

//Удаляем из типа id пользователя
export type UserData = Omit<User, "id">
type ResponceLoginData = User & {token: string}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //В дженерик помещаем то, что мы получим от сервера, и то, что отправляем
        login: builder.mutation<ResponceLoginData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),
        registration: builder.mutation<ResponceLoginData, UserData>({
            query: (userData) => ({
                url: '/user/registration',
                method: 'POST',
                body: userData
            })
        }),
        //Здесь мы делаем просто запрос, не отправляя никаких данных
        current: builder.query<ResponceLoginData, void>({
            query: () => ({
                url: '/user/current',
                method: 'GET'
            })
        })
    })
})

//Для всех этих методов автоматически генерируются хуки
export const { useLoginMutation, useRegistrationMutation, useCurrentQuery } = authApi;