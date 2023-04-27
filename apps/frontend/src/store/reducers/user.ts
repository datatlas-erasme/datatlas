import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '@datatlas/models';

export type UserState = null | UserInterface['id'];

export const initialState = null as UserState;

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<UserInterface>) => action.payload.id,
    logout: () => null,
  },
});

export const {
  reducer,
  actions: { loggedIn, logout },
} = slice;
