import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '@datatlas/dtos';

export type UserState = {
  id: number | null;
  accessToken: string | null;
};

export const initialState: UserState = {
  id: null,
  accessToken: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, { payload }: PayloadAction<LoginResponse>) => ({
      id: payload.user_id,
      accessToken: payload.access_token,
    }),
    logout: () => initialState,
  },
});

export const {
  reducer,
  actions: { loggedIn, logout },
} = slice;
