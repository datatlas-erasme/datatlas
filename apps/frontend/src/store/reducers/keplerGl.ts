import { AnyAction, createAction, Reducer } from '@reduxjs/toolkit';
import { registerEntry } from 'kepler.gl';
import keplerGlReducer, { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { addDataToMap, setMapInfo, wrapTo, setLocale as setKeplerMapLocale } from 'kepler.gl/actions';
import { DatatlasSavedMapInterface, KeplerMapState, MapInfoInterface } from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';
import { getDefaultLocale } from '../../i18n/utils';
import { getProject, getProjects } from '../api';
import { KeplerMapFactory } from '../../kepler';
import { toKeplerId } from '../selectors';

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

export const keplerReducer: Reducer<KeplerGlState> = keplerGlReducer
  .initialState({
    mapState: new KeplerMapState(),
  })
  .plugin({
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
  const loadedMap = KeplerGlSchema.load(savedMap);
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
