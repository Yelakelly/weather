import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { weatherApi } from 'api/weather';
import positionEditorReducer from './position-editor';
import geoPositionReducer from './geoposition';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    geoPosition: geoPositionReducer,
    positionEditor: positionEditorReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
