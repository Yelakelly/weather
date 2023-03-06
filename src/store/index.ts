import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { weatherApi } from 'api/weather';
import positionEditorReducer from './position-editor';
import geoPositionReducer from './geoposition';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  geoPosition: geoPositionReducer,
  positionEditor: positionEditorReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
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

export const persistor = persistStore(store);
