import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { enhanceReduxMiddleware } from 'kepler.gl';
import reducer from './reducers';

const actionsBlacklist = ['@@kepler.gl/MOUSE_MOVE', '@@kepler.gl/UPDATE_MAP', '@@kepler.gl/LAYER_HOVER'];

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    createLogger({
      predicate: (getState, { type }) => !actionsBlacklist.includes(type),
      collapsed: (getState, action, logEntry) => !(logEntry && logEntry.error),
    }),
    ...enhanceReduxMiddleware([]),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});
