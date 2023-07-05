import { combineReducers } from 'redux';
import { mapStateReducerFactory } from 'kepler.gl/dist/reducers/map-state';
import { mapStyleReducerFactory } from 'kepler.gl/dist/reducers/map-style';
import { uiStateReducerFactory } from 'kepler.gl/dist/reducers/ui-state';
import { providerStateReducerFactory } from 'kepler.gl/dist/reducers/provider-state';
import composers from 'kepler.gl/dist/reducers/composers';
import { KeplerGlState } from 'kepler.gl/reducers';
import { visStateReducerFactory } from './vis-state';

const combined = (initialState: KeplerGlState = {}) =>
  combineReducers({
    visState: visStateReducerFactory(initialState.visState),
    mapState: mapStateReducerFactory(initialState.mapState),
    mapStyle: mapStyleReducerFactory(initialState.mapStyle),
    uiState: uiStateReducerFactory(initialState.uiState),
    providerState: providerStateReducerFactory(initialState.providerState),
  });

export const coreReducerFactory =
  (initialState = {}) =>
  (state, action) => {
    if (composers[action.type]) {
      return composers[action.type](state, action);
    }
    return combined(initialState)(state, action);
  };
