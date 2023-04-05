import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDefaultLocale } from '../../i18n/utils';

export type LocaleState = string;

export const initialState: LocaleState = getDefaultLocale();

const slice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleState>) => action.payload,
  },
});

export const {
  reducer,
  actions: { setLocale },
} = slice;
