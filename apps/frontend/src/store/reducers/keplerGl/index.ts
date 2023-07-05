/* eslint-disable no-useless-computed-key */
import { AnyAction, createAction, Reducer } from '@reduxjs/toolkit';
import { registerEntry } from 'kepler.gl';
import { KeplerGlState } from 'kepler.gl/reducers';
import { keplerGlReducer } from './root';
import { addDataToMap, setMapInfo, wrapTo, setLocale as setKeplerMapLocale } from 'kepler.gl/actions';
import { DatatlasSavedMapInterface, Filter, KeplerMapState, KeplerMapStyle, MapInfoInterface } from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';
import { getDefaultLocale } from '../../../i18n/utils';
import { getProject, getProjects } from '../../api';
import { keplerMapFactory, KeplerMapFactory } from '../../../kepler';
import { toKeplerId } from '../../selectors';
import { INITIAL_VIS_STATE } from 'kepler.gl/dist/reducers/vis-state-updaters';
import { DatatlasGlVisStateInterface, getDefaultInteractionConfig } from '@datatlas/models';

export const registerMap = (id: string, mint = true) =>
  registerEntry({
    id,
    initialUiState: undefined,
    mapStylesReplaceDefault: undefined,
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    mapboxApiUrl: undefined,
    mint,
  });

export const UPDATE_MAP_INFO = 'UPDATE_MAP_INFO';
export const updateMapInfo = createAction<Partial<MapInfoInterface>>(UPDATE_MAP_INFO);

export const UPDATE_READ_STATE = 'UPDATE_READ_STATE';
export const updateReadState = createAction<boolean>(UPDATE_READ_STATE);

export interface DatatlasGlState extends KeplerGlState {
  visState: DatatlasGlVisStateInterface;
  filters: Filter[];
}

export const keplerReducer: Reducer<DatatlasGlState> = keplerGlReducer
  .initialState({
    mapState: new KeplerMapState(),
    visState: {
      ...INITIAL_VIS_STATE,
      interactionConfig: getDefaultInteractionConfig(),
    },
    mapStyle: new KeplerMapStyle({ mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN }),
  })
  .plugin({
    // If you want to use an existing "updater" function, make sur to pass the right state slice as argument.
    // Kepler lenses might be helpful for this.
    [UPDATE_MAP_INFO]: (state, action) => ({
      ...state,
      visState: {
        ...state.visState,
        mapInfo: {
          ...state.visState.mapInfo,
          ...action.payload,
        },
      },
    }),
    [UPDATE_READ_STATE]: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: action.payload,
      },
    }),
    ['@@kepler.gl/ADD_DATA_TO_MAP']: (state, action) => {
      const emptyFieldsToShow = Array.isArray(action.payload.datasets)
        ? action.payload.datasets.reduce((fieldsToShow, { info: { id } }) => ({ ...fieldsToShow, [id]: [] }), {})
        : { [action.payload.datasets.info.id]: [] };

      const fieldsToShow =
        action.payload?.config?.visState?.interactionConfig?.filters?.fieldsToShow || emptyFieldsToShow;

      return {
        ...state,
        visState: {
          ...state.visState,
          interactionConfig: {
            ...state.visState.interactionConfig,
            filters: {
              ...state.visState.interactionConfig.filters,
              config: {
                ...state.visState.interactionConfig.filters.config,
                fieldsToShow: {
                  ...state.visState.interactionConfig.filters.config.fieldsToShow,
                  ...fieldsToShow,
                },
              },
            },
          },
        },
      };
    },
    ['@@kepler.gl/REMOVE_DATASET']: (state, action) => {
      const fieldsToShow = Object.keys(state.visState.interactionConfig.filters.config.fieldsToShow).reduce(
        (leftFieldsToShow, datasetId) => {
          if (datasetId !== action.dataId) {
            leftFieldsToShow[datasetId] = state.visState.interactionConfig.filters.config.fieldsToShow[datasetId];
          }
          return leftFieldsToShow;
        },
        {}
      );

      return {
        ...state,
        visState: {
          ...state.visState,
          interactionConfig: {
            ...state.visState.interactionConfig,
            filters: {
              ...state.visState.interactionConfig.filters,
              config: {
                ...state.visState.interactionConfig.filters.config,
                fieldsToShow,
              },
            },
          },
        },
      };
    },
  });

export const addProjectToKeplerState = (state: Record<string, KeplerGlState> = {}, project: ProjectDto) =>
  addSavedMapToState(state, {
    id: toKeplerId(project.id),
    savedMap: KeplerMapFactory.createFromProjectDto(project),
  });

// This deserves a better name.
export const getConversionActions = (
  keplerId: string,
  savedMap: DatatlasSavedMapInterface,
  locale = getDefaultLocale()
) => {
  const loadedMap = keplerMapFactory.load(savedMap);
  const wrapToMap = wrapTo(keplerId);
  return [
    registerMap(keplerId),
    wrapToMap(addDataToMap(loadedMap)),
    wrapToMap(setMapInfo(savedMap.info)),
    wrapToMap(setKeplerMapLocale(locale)),
  ];
};

export const addSavedMapToState = (
  state: Record<string, KeplerGlState> = {},
  {
    id,
    savedMap,
  }: {
    id: string;
    savedMap: DatatlasSavedMapInterface;
  }
) => {
  const actions = getConversionActions(id, savedMap);

  return actions.reduce(keplerReducer, state);
};

export const customReducer = (state: KeplerGlState, action: AnyAction) => {
  if (getProjects.matchFulfilled(action)) {
    return action.payload.reduce((previousState, project) => {
      return { ...previousState, ...addProjectToKeplerState(state, project) };
    }, {});
  }

  if (getProject.matchFulfilled(action)) {
    return addProjectToKeplerState(state, action.payload);
  }

  return keplerReducer(state, action);
};
export const reducer = customReducer;
