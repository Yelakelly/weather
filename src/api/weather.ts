import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherApiResponse } from 'types/forecast';

interface WeatherOptions {
  lat: number;
  lon: number;
  lang?: string;
}

export const weatherApi = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({ baseUrl: '/weather/v2' }),
  endpoints: builder => ({
    getForecast: builder.query<WeatherApiResponse, WeatherOptions>({
      query: (options: WeatherOptions) => ({
        url: '/forecast',
        method: 'GET',
        params: {
          lat: options.lat,
          lon: options.lon,
          lang: options.lang || 'ru_RU',
          limit: 7,
        },
      }),
    }),
  }),
});

export const { useGetForecastQuery } = weatherApi;
