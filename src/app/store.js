import { configureStore } from '@reduxjs/toolkit';
import { currencyAPI } from '../services/currencyAPI';
import { currencyNewsAPI } from '../services/currencyNewsAPI';

export default configureStore({
    reducer: {
        [currencyAPI.reducerPath]: currencyAPI.reducer,
        [currencyNewsAPI.reducerPath]: currencyNewsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(currencyAPI.middleware, currencyNewsAPI.middleware),
});