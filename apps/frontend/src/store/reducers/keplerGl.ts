import { Reducer } from '@reduxjs/toolkit';
import keplerGlReducer from 'kepler.gl/reducers';
import { KeplerGlState } from 'kepler.gl/src/reducers/core';

export const reducer: Reducer<KeplerGlState> = keplerGlReducer.initialState();
