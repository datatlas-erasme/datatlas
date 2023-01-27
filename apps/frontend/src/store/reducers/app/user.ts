import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '@datatlas/shared/models';

export type UserState = null | UserInterface['id'];

const initialState = null as UserState;

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
