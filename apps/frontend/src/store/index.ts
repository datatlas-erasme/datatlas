import { createLogger } from 'redux-logger';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { taskMiddleware } from 'react-palm/tasks';
import { reducer as rootReducer } from './reducers';
import { initialState } from './reducers';
import { api } from './api';
import { listenerMiddleware } from './listenerMiddleware';
import './effects';

const actionsBlacklist = ['@@kepler.gl/MOUSE_MOVE', '@@kepler.gl/UPDATE_MAP', '@@kepler.gl/LAYER_HOVER'];

const persistConfig = {
  key: 'root',
  // `api` slice could be persisted with a bit more work.
  blacklist: ['locale', 'keplerGl', 'api'],
  storage,
  transforms: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // @ts-ignore
  preloadedState: initialState,
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      process.env.NODE_ENV === 'development'
        ? createLogger({
            diff: false, // diff might cause unexpected errors and mess with hot reload
            predicate: (getState, { type }) => !actionsBlacklist.includes(type),
            collapsed: (getState, action, logEntry) => !(logEntry && logEntry.error),
          })
        : [],
      api.middleware,
      listenerMiddleware.middleware,
      taskMiddleware
    ),
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

const persistor = persistStore(store);

export { store, persistor };
