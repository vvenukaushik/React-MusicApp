import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '174ddd8042msh9ea93eb1384b2c5p1525ecjsn86b7e54f7124'),
                headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track' }),
        //getSongsByGenre: builder.query({query: (genre) => '')
        getSongDetails: builder.query({ query: ({ songid }) => `songs/get-details?key=${songid}` }),
        getRecommendedSongs: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}` }),
        getArtistDetails: builder.query({ query: (artistid) => `artists/get-top-songs?id=${artistid}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/charts/track?locale=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` }),
    }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetRecommendedSongsQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsBySearchQuery } = shazamCoreApi;