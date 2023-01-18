import { Reducer } from '@reduxjs/toolkit';
import keplerGlReducer from 'kepler.gl/reducers';
import { KeplerGlState } from 'kepler.gl/src/reducers/core';


// { addFilter, enlargeFilter, removeFilter, setFilter, toggleAnimation, toggleFilterFeature, showDatasetTable } =


/**
 * Add a new filter
 * @memberof visStateActions
 * @param dataId - dataset `id` this new filter is associated with
 * @returns action
 * @type {typeof import('./vis-state-actions').addFilter}
 * @public
 */
export function addFilter(dataId) {
  return {
    type: ActionTypes.ADD_FILTER,
    dataId
  };
}

/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateActions
 * @param idx - index of filter to enlarge
 * @type {typeof import('./vis-state-actions').enlargeFilter}
 * @returns action
 * @public
 */
export function enlargeFilter(idx) {
  return {
    type: ActionTypes.ENLARGE_FILTER,
    idx
  };
}

/**
 * Remove a filter from `visState.filters`, once a filter is removed, data will be re-filtered and layer will be updated
 * @memberof visStateActions
 * @param idx idx of filter to be removed
 * @returns action
 * @type {typeof import('./vis-state-actions').removeFilter}
 * @public
 */
export function removeFilter(idx) {
  return {
    type: ActionTypes.REMOVE_FILTER,
    idx
  };
}



/**
 * Update filter property
 * @memberof visStateActions
 * @param idx -`idx` of filter to be updated
 * @param prop - `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param value - new value
 * @param valueIndex - dataId index
 * @returns action
 * @type {typeof import('./vis-state-actions').setFilter}
 * @public
 */
export function setFilter(idx, prop, value, valueIndex) {
  return {
    type: ActionTypes.SET_FILTER,
    idx,
    prop,
    value,
    valueIndex
  };
}

/**
 * Show/hide filter feature on map
 * @memberof visStateActions
 * @param idx - index of filter feature to show/hide
 * @type {typeof import('./vis-state-actions').toggleFilterFeature}
 * @return action
 */
export function toggleFilterFeature(idx) {
  return {
    type: ActionTypes.TOGGLE_FILTER_FEATURE,
    idx
  };
}

/**
 * Start and end filter animation
 * @memberof visStateActions
 * @param {Number} idx of filter
 * @type {typeof import('./vis-state-actions').toggleFilterAnimation}
 * @returns action
 * @public
 */
export function toggleFilterAnimation(idx) {
  return {
    type: ActionTypes.TOGGLE_FILTER_ANIMATION,
    idx
  };
}


export const reducer: Reducer<KeplerGlState> = keplerGlReducer.initialState().plugin({
  HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
    ...state,
    uiState: {
      ...state.uiState,
      readOnly: !state.uiState.readOnly,
    },
  }),
});


/**
 * Display dataset table in a modal
 * @memberof visStateActions
 * @param dataId dataset id to show in table
 * @returns action
 * @type {typeof import('./vis-state-actions').showDatasetTable}
 * @public
 */
export function showDatasetTable(dataId) {
  return {
    type: ActionTypes.SHOW_DATASET_TABLE,
    dataId
  };
}
