import {combineReducers} from 'redux';
import {
  mapStateReducerFactory,
  providerStateReducerFactory,
  uiStateReducerFactory
} from '@kepler.gl/reducers';
import {mapStyleReducerFactory} from '@kepler.gl/reducers/dist/map-style';
import {DatatlasGlState} from '@datatlas/models';
import {composers} from './composers';
import {visStateReducerFactory} from './vis-state';

const combined = (initialState: Partial<DatatlasGlState> = {}) =>
  combineReducers({
    visState: visStateReducerFactory(initialState.visState),
    mapState: mapStateReducerFactory(initialState.mapState),
    mapStyle: mapStyleReducerFactory(initialState.mapStyle),
    uiState: uiStateReducerFactory(initialState.uiState),
    providerState: providerStateReducerFactory(initialState.providerState)
  });

export const coreReducerFactory =
  (initialState = {}) =>
  (state, action) => {
    if (composers[action.type]) {
      return composers[action.type](state, action);
    }
    return combined(initialState)(state, action);
  };
