import { addListener, createListenerMiddleware } from '@reduxjs/toolkit';
import type { RootState } from './reducers';
import type { AppDispatch } from './index';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
