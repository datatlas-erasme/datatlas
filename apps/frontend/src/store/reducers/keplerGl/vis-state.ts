import ActionTypes from 'kepler.gl/dist/constants/action-types';
import { handleActions } from 'redux-actions';
import * as keplerGlVisStateUpdaters from 'kepler.gl/dist/reducers/vis-state-updaters';
import { loadFilesUpdater, loadNextFileUpdater, nextFileBatchUpdater } from './vis-state-updaters';

/**
 * Important: Do not rename `actionHandler` or the assignment pattern of property value.
 * It is used to generate documentation
 */
const actionHandler = {
  [ActionTypes.ADD_FILTER]: keplerGlVisStateUpdaters.addFilterUpdater,
  [ActionTypes.ADD_LAYER]: keplerGlVisStateUpdaters.addLayerUpdater,
  [ActionTypes.DUPLICATE_LAYER]: keplerGlVisStateUpdaters.duplicateLayerUpdater,
  [ActionTypes.ENLARGE_FILTER]: keplerGlVisStateUpdaters.enlargeFilterUpdater,
  [ActionTypes.INTERACTION_CONFIG_CHANGE]: keplerGlVisStateUpdaters.interactionConfigChangeUpdater,
  [ActionTypes.LAYER_CLICK]: keplerGlVisStateUpdaters.layerClickUpdater,
  [ActionTypes.LAYER_CONFIG_CHANGE]: keplerGlVisStateUpdaters.layerConfigChangeUpdater,
  [ActionTypes.LAYER_HOVER]: keplerGlVisStateUpdaters.layerHoverUpdater,
  [ActionTypes.LAYER_TYPE_CHANGE]: keplerGlVisStateUpdaters.layerTypeChangeUpdater,
  [ActionTypes.LAYER_VIS_CONFIG_CHANGE]: keplerGlVisStateUpdaters.layerVisConfigChangeUpdater,
  [ActionTypes.LAYER_TEXT_LABEL_CHANGE]: keplerGlVisStateUpdaters.layerTextLabelChangeUpdater,
  [ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE]: keplerGlVisStateUpdaters.layerVisualChannelChangeUpdater,
  [ActionTypes.LAYER_COLOR_UI_CHANGE]: keplerGlVisStateUpdaters.layerColorUIChangeUpdater,
  [ActionTypes.TOGGLE_LAYER_ANIMATION]: keplerGlVisStateUpdaters.toggleLayerAnimationUpdater,
  [ActionTypes.TOGGLE_LAYER_ANIMATION_CONTROL]: keplerGlVisStateUpdaters.toggleLayerAnimationControlUpdater,
  [ActionTypes.LOAD_FILES]: loadFilesUpdater,
  [ActionTypes.LOAD_FILES_ERR]: keplerGlVisStateUpdaters.loadFilesErrUpdater,
  [ActionTypes.LOAD_NEXT_FILE]: loadNextFileUpdater,
  [ActionTypes.LOAD_FILE_STEP_SUCCESS]: keplerGlVisStateUpdaters.loadFileStepSuccessUpdater,
  [ActionTypes.MAP_CLICK]: keplerGlVisStateUpdaters.mapClickUpdater,
  [ActionTypes.MOUSE_MOVE]: keplerGlVisStateUpdaters.mouseMoveUpdater,
  [ActionTypes.RECEIVE_MAP_CONFIG]: keplerGlVisStateUpdaters.receiveMapConfigUpdater,
  [ActionTypes.REMOVE_DATASET]: keplerGlVisStateUpdaters.removeDatasetUpdater,
  [ActionTypes.REMOVE_FILTER]: keplerGlVisStateUpdaters.removeFilterUpdater,
  [ActionTypes.REMOVE_LAYER]: keplerGlVisStateUpdaters.removeLayerUpdater,
  [ActionTypes.REORDER_LAYER]: keplerGlVisStateUpdaters.reorderLayerUpdater,
  [ActionTypes.RESET_MAP_CONFIG]: keplerGlVisStateUpdaters.resetMapConfigUpdater,
  [ActionTypes.SET_FILTER]: keplerGlVisStateUpdaters.setFilterUpdater,
  [ActionTypes.SET_FILTER_ANIMATION_TIME]: keplerGlVisStateUpdaters.setFilterAnimationTimeUpdater,
  [ActionTypes.SET_FILTER_ANIMATION_TIME_CONFIG]: keplerGlVisStateUpdaters.setFilterAnimationTimeConfigUpdater,
  [ActionTypes.SET_FILTER_ANIMATION_WINDOW]: keplerGlVisStateUpdaters.setFilterAnimationWindowUpdater,
  [ActionTypes.SET_FILTER_PLOT]: keplerGlVisStateUpdaters.setFilterPlotUpdater,
  [ActionTypes.SET_MAP_INFO]: keplerGlVisStateUpdaters.setMapInfoUpdater,
  [ActionTypes.SHOW_DATASET_TABLE]: keplerGlVisStateUpdaters.showDatasetTableUpdater,
  [ActionTypes.TOGGLE_FILTER_ANIMATION]: keplerGlVisStateUpdaters.toggleFilterAnimationUpdater,
  [ActionTypes.UPDATE_FILTER_ANIMATION_SPEED]: keplerGlVisStateUpdaters.updateFilterAnimationSpeedUpdater,
  [ActionTypes.SET_LAYER_ANIMATION_TIME]: keplerGlVisStateUpdaters.setLayerAnimationTimeUpdater,
  [ActionTypes.UPDATE_LAYER_ANIMATION_SPEED]: keplerGlVisStateUpdaters.updateLayerAnimationSpeedUpdater,
  [ActionTypes.TOGGLE_LAYER_FOR_MAP]: keplerGlVisStateUpdaters.toggleLayerForMapUpdater,
  [ActionTypes.TOGGLE_SPLIT_MAP]: keplerGlVisStateUpdaters.toggleSplitMapUpdater,
  [ActionTypes.UPDATE_LAYER_BLENDING]: keplerGlVisStateUpdaters.updateLayerBlendingUpdater,
  [ActionTypes.UPDATE_VIS_DATA]: keplerGlVisStateUpdaters.updateVisDataUpdater,
  [ActionTypes.RENAME_DATASET]: keplerGlVisStateUpdaters.renameDatasetUpdater,
  [ActionTypes.SET_FEATURES]: keplerGlVisStateUpdaters.setFeaturesUpdater,
  [ActionTypes.DELETE_FEATURE]: keplerGlVisStateUpdaters.deleteFeatureUpdater,
  [ActionTypes.SET_POLYGON_FILTER_LAYER]: keplerGlVisStateUpdaters.setPolygonFilterLayerUpdater,
  [ActionTypes.SET_SELECTED_FEATURE]: keplerGlVisStateUpdaters.setSelectedFeatureUpdater,
  [ActionTypes.SET_EDITOR_MODE]: keplerGlVisStateUpdaters.setEditorModeUpdater,
  [ActionTypes.TOGGLE_EDITOR_VISIBILITY]: keplerGlVisStateUpdaters.toggleEditorVisibilityUpdater,
  [ActionTypes.TOGGLE_FILTER_FEATURE]: keplerGlVisStateUpdaters.toggleFilterFeatureUpdater,
  [ActionTypes.APPLY_CPU_FILTER]: keplerGlVisStateUpdaters.applyCPUFilterUpdater,
  [ActionTypes.SORT_TABLE_COLUMN]: keplerGlVisStateUpdaters.sortTableColumnUpdater,
  [ActionTypes.PIN_TABLE_COLUMN]: keplerGlVisStateUpdaters.pinTableColumnUpdater,
  [ActionTypes.COPY_TABLE_COLUMN]: keplerGlVisStateUpdaters.copyTableColumnUpdater,
  [ActionTypes.NEXT_FILE_BATCH]: nextFileBatchUpdater,
  [ActionTypes.PROCESS_FILE_CONTENT]: keplerGlVisStateUpdaters.processFileContentUpdater,
  [ActionTypes.SET_LAYER_ANIMATION_TIME_CONFIG]: keplerGlVisStateUpdaters.setLayerAnimationTimeConfigUpdater,
};

// construct vis-state reducer
export const visStateReducerFactory = (initialState = {}) =>
  handleActions(actionHandler, {
    ...keplerGlVisStateUpdaters.INITIAL_VIS_STATE,
    ...initialState,
    initialState,
  });

export default visStateReducerFactory();
