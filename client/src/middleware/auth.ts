import {createListenerMiddleware} from '@reduxjs/toolkit';
import { authApi } from '../store/services/auth';

export const listenerMiddleware = createListenerMiddleware();

//Начинаем прослушивать, и заносим в localStorage токен
listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if(action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
    }
})