import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store';
import { selectActivePosition } from 'store/geoposition';
import { useGetForecastQuery } from 'api/weather';
import { skipToken } from '@reduxjs/toolkit/query';

// Use instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetForecastData = () => {
  const currentPosition = useAppSelector(selectActivePosition);
  const { data, isLoading } = useGetForecastQuery(
    currentPosition
      ? { lat: currentPosition.coords.latitude, lon: currentPosition.coords.longitude }
      : skipToken,
  );

  return { data, isLoading };
};
