import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { getPosition } from 'utils/geoposition';
import { v4 as uuid } from 'uuid';

export type EditablePosition = {
  id: string;
  name: string | null;
  edit: boolean;
  new?: boolean;
  default?: boolean;
  coords: {
    latitude: number;
    longitude: number;
  };
};

export interface GeoPositionState {
  geoLocationPosition: GeolocationPosition | null;
  selectedPosition: string | null;
  positions: EditablePosition[];
  loading?: boolean;
  error?: GeolocationPositionError;
}

type NewPosition = Omit<EditablePosition, 'id' | 'coords'> & {
  id?: string;
  coords: {
    latitude?: number | null;
    longitude?: number | null;
  };
};

const initialState: GeoPositionState = {
  geoLocationPosition: null,
  selectedPosition: null,
  positions: [
    {
      id: uuid(),
      name: 'По умолчанию',
      edit: false,
      new: false,
      default: true,
      coords: {
        latitude: 0,
        longitude: 0,
      },
    },
  ],
  loading: undefined,
  error: undefined,
};

export const initDefaultPosition = createAsyncThunk<void, void, { state: RootState }>(
  'geoPosition/initDefaultPosition',
  async (_, { dispatch, getState }) => {
    try {
      const { positions, selectedPosition } = getState().geoPosition;
      const currentPosition = await dispatch(getCurrentPosition()).unwrap();
      let defaultPosition = positions.find(p => p.default);

      if (defaultPosition) {
        defaultPosition = {
          ...defaultPosition,
          coords: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          },
        };
        dispatch(updatePosition(defaultPosition));
        if (!selectedPosition) dispatch(setSelectedPosition(defaultPosition.id));
      }
    } catch (e) {
      console.error('Failed to get current position', e);
    }
  },
);

export const getCurrentPosition = createAsyncThunk<
  GeolocationPosition,
  void,
  { rejectValue: GeolocationPositionError }
>('geoPosition/getPosition', async (_, ThunkApi) => {
  try {
    return await getPosition();
  } catch (e) {
    const error = e as GeolocationPositionError;
    return ThunkApi.rejectWithValue({
      ...error,
    });
  }
});

export const addPosition = createAction(
  'geoPosition/addPosition',
  (position: NewPosition, isNew: boolean = false) => {
    return {
      payload: {
        ...position,
        id: position?.id ?? uuid(),
        new: isNew,
      },
    };
  },
);

export const setSelectedPosition = createAction<string>('geoPosition/setSelectedPosition');
export const updatePosition = createAction<EditablePosition>('geoPosition/updatePosition');
export const removePosition = createAction<string>('geoPosition/removePosition');
export const refreshPosition = createAction('geoPosition/refreshPosition');

export const geoPositionSlice = createSlice({
  name: 'geoPosition',
  initialState,
  reducers: {
    addPosition: (state, action) => {
      const position = action.payload;
      position.new = action.payload.new ?? false;
      state.positions.push(position);
    },
    updatePosition: (state, action: PayloadAction<EditablePosition>) => {
      const index = state.positions.findIndex(position => position.id === action.payload.id);
      if (index !== -1) {
        state.positions[index] = action.payload;
      }
    },
    removePosition: (state, action: PayloadAction<string>) => {
      state.positions = state.positions.filter(position => position.id !== action.payload);
    },
    setSelectedPosition: (state, action: PayloadAction<string>) => {
      state.selectedPosition = action.payload;
    },
    refreshPosition: state => {
      const positions = state.positions;
      const activePosition = positions.find(obj => obj.id === state.selectedPosition);

      if (!activePosition) {
        state.selectedPosition = positions[0].id;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentPosition.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getCurrentPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.geoLocationPosition = action.payload;
      })
      .addCase(getCurrentPosition.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload.payload;
      });
  },
});

export const selectPosition = (state: RootState) => state.geoPosition;
export const selectActivePosition = (state: RootState) =>
  state.geoPosition.positions.find(obj => obj.id === state.geoPosition.selectedPosition);

export default geoPositionSlice.reducer;
