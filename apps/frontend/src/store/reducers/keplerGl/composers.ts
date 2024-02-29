import {ActionTypes} from '@kepler.gl/actions';
import {combinedUpdaters as keplerCombinedUpdaters} from '@kepler.gl/reducers';
import {addDataToMapUpdater, loadFilesSuccessUpdater} from './combined-updaters';

export const composers = {
  [ActionTypes.ADD_DATA_TO_MAP]: addDataToMapUpdater,
  [ActionTypes.MAP_STYLE_CHANGE]: keplerCombinedUpdaters.combinedMapStyleChangeUpdater,
  [ActionTypes.LAYER_TYPE_CHANGE]: keplerCombinedUpdaters.combinedLayerTypeChangeUpdater,
  [ActionTypes.LOAD_FILES_SUCCESS]: loadFilesSuccessUpdater,
  [ActionTypes.TOGGLE_SPLIT_MAP]: keplerCombinedUpdaters.toggleSplitMapUpdater,
  [ActionTypes.REPLACE_DATA_IN_MAP]: keplerCombinedUpdaters.replaceDataInMapUpdater
};
