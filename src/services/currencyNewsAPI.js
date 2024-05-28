import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const APIHeader = {
    'X-RapidAPI-Key': '016b7ba00fmshef131593a0f48aep148dd1jsn2fac535cf7d5',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';
const processReq = (url) => ({ url, headers: APIHeader });

export const currencyNewsAPI = createApi({
    reducerPath: 'currencyNewsAPI',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCurrencyNews: builder.query({
            query: (outlet) =>processReq(`/v1/${outlet}`),
        }),
    }),
});

export const {
    useGetCurrencyNewsQuery,
} = currencyNewsAPI;