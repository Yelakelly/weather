import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface PositionEditorState {
  isSelectMode: boolean;
  useLocation: boolean;
}

const initialState: PositionEditorState = {
  isSelectMode: false,
  useLocation: false,
};

export const toggleSelectMode = createAction('positionEditor/toggleSelectMode');
export const setUseLocation = createAction<boolean>('positionEditor/setUseLocation');

export const positionEditorSlice = createSlice({
  name: 'positionEditor',
  initialState,
  reducers: {
    toggleSelectMode: state => {
      state.isSelectMode = !state.isSelectMode;
    },
    setUseLocation: (state, action: PayloadAction<boolean>) => {
      state.useLocation = action.payload;
    },
  },
});

export const selectPositionEditor = (state: RootState) => state.positionEditor;
export default positionEditorSlice.reducer;
