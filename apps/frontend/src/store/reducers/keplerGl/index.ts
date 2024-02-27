/* eslint-disable no-useless-computed-key */
import {AnyAction, createAction, Reducer} from '@reduxjs/toolkit';
import {Layer, LayerBaseConfig} from '@kepler.gl/layers';
import {INITIAL_VIS_STATE} from '@kepler.gl/reducers';
import {keplerGlReducer} from './root';
import {
  addDataToMap,
  setMapInfo,
  wrapTo,
  setLocale as setKeplerMapLocale,
  registerEntry
} from '@kepler.gl/actions';
import {MapInfoInterface, SavedMap, DatatlasGlInstances} from '@datatlas/models';
import {ProjectDto} from '@datatlas/dtos';
import {getDefaultLocale} from '../../../i18n/utils';
import {getProject, getProjects} from '../../api';
import {keplerMapFactory, KeplerMapFactory} from '../../../kepler';
import {toKeplerId} from '../../selectors';

export const registerMap = (id: string, mint = true) =>
  registerEntry({
    id,
    initialUiState: undefined,
    mapStylesReplaceDefault: undefined,
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    mapboxApiUrl: undefined,
    mint
  });

export const UPDATE_MAP_INFO = 'UPDATE_MAP_INFO';
export const updateMapInfo = createAction<Partial<MapInfoInterface>>(UPDATE_MAP_INFO);

export const UPDATE_READ_STATE = 'UPDATE_READ_STATE';
export const updateReadState = createAction<boolean>(UPDATE_READ_STATE);

export const keplerReducer: Reducer<DatatlasGlInstances> = keplerGlReducer
  .initialState({visState: INITIAL_VIS_STATE})
  .plugin({
    // If you want to use an existing "updater" function, make sur to pass the right state slice as argument.
    // Kepler lenses might be helpful for this.
    [UPDATE_MAP_INFO]: (state, action) => ({
      ...state,
      visState: {
        ...state.visState,
        mapInfo: {
          ...state.visState.mapInfo,
          ...action.payload
        }
      }
    }),
    [UPDATE_READ_STATE]: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: action.payload
      }
    }),
    // When the color of layer change, propagate the color change to the dataset.
    ['@@kepler.gl/LAYER_CONFIG_CHANGE']: (
      state,
      action: {oldLayer: Layer; newConfig: Partial<LayerBaseConfig>}
    ) => {
      if (!action?.newConfig?.color) {
        return state;
      }

      const {color} = action.newConfig;
      const {dataId} = action.oldLayer.config;
      return {
        ...state,
        visState: {
          ...state.visState,
          datasets: {
            ...state.visState.datasets,
            [dataId]: {
              ...state.visState.datasets[dataId],
              color
            }
          }
        }
      };
    }
  });

export const addProjectToKeplerState = (state: DatatlasGlInstances = {}, projectDto: ProjectDto) =>
  addSavedMapToState(state, {
    id: toKeplerId(projectDto.id),
    savedMap: KeplerMapFactory.createFromProjectDto(projectDto)
  });

// This deserves a better name.
export const getConversionActions = (
  keplerId: string,
  savedMap: SavedMap,
  locale = getDefaultLocale()
) => {
  const loadedMap = keplerMapFactory.load(savedMap);
  const wrapToMap = wrapTo(keplerId);
  return [
    registerMap(keplerId),
    wrapToMap(
      addDataToMap({config: loadedMap.config || undefined, datasets: loadedMap.datasets || []})
    ),
    wrapToMap(setMapInfo(savedMap.info)),
    wrapToMap(setKeplerMapLocale(locale))
  ];
};

export const addSavedMapToState = (
  state: DatatlasGlInstances = {},
  {
    id,
    savedMap
  }: {
    id: string;
    savedMap: SavedMap;
  }
) => {
  const actions = getConversionActions(id, savedMap);

  return actions.reduce(keplerReducer, state);
};

/**
 * @todo We shouldn't re-add a project each time but only if the instance isn't registered yet.
 * Registering a project even with the `mint` flag to `false` trigger a UI re-render.
 */
export const customReducer = (state: DatatlasGlInstances, action: AnyAction) => {
  if (getProjects.matchFulfilled(action)) {
    return action.payload.reduce((previousState, projectDto) => {
      return {...previousState, ...addProjectToKeplerState(state, projectDto)};
    }, {});
  }

  if (getProject.matchFulfilled(action)) {
    return addProjectToKeplerState(state, action.payload);
  }

  return keplerReducer(state, action);
};
export const reducer = customReducer;
