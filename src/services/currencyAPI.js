import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const APIHeader = {
    'X-RapidAPI-Key': '016b7ba00fmshef131593a0f48aep148dd1jsn2fac535cf7d5',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const processReq = (url) => ({ url, headers: APIHeader });

export const currencyAPI = createApi({
    reducerPath: 'currencyAPI',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCurrency: builder.query({
            query: (counter) =>processReq(`/coins?limit=${counter}`),
        }),
        getDetails: builder.query({
            query: (coinId) => processReq(`/coin/${coinId}`),
        }),
    }),
});

export const {
    useGetCurrencyQuery,
    useGetDetailsQuery,
} = currencyAPI;
