import { createLogger } from 'redux-logger';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { enhanceReduxMiddleware } from 'kepler.gl';
import { reducer as rootReducer } from './reducers';
import { initialState } from './reducers';
import { api } from '../api';

const actionsBlacklist = ['@@kepler.gl/MOUSE_MOVE', '@@kepler.gl/UPDATE_MAP', '@@kepler.gl/LAYER_HOVER'];

const persistConfig = {
  key: 'root',
  blacklist: ['keplerGl', 'api'],
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    createLogger({
      predicate: (getState, { type }) => !actionsBlacklist.includes(type),
      collapsed: (getState, action, logEntry) => !(logEntry && logEntry.error),
    }),
    api.middleware,
    ...enhanceReduxMiddleware([]),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

const persistor = persistStore(store);

export { store, persistor };
