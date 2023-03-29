import { createAction, Reducer } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { registerEntry } from 'kepler.gl';
import keplerGlReducer, { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { addDataToMap, setMapInfo, wrapTo } from 'kepler.gl/actions';
import {
  CreateMapPayloadInterface,
  DatatlasSavedMapInterface,
  KeplerMapState,
  KeplerMapFactory,
  ProjectInterface,
} from '@datatlas/models';
import { selectCurrentUserId } from '../selectors';
import { startAppListening } from '../listenerMiddleware';

export const registerMap = (id: ProjectInterface['id']) =>
  registerEntry({
    id,
    initialUiState: undefined,
    mapStylesReplaceDefault: undefined,
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    mapboxApiUrl: undefined,
    mint: true,
  });

export const createMap = createAction<CreateMapPayloadInterface>('CREATE_MAP');
export const createMapSuccess = createAction<DatatlasSavedMapInterface>('CREATE_MAP_SUCCESS');

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    // use Finnish locale
    locale: LOCALE_CODES.fi,
  },
});

export const reducer: Reducer<KeplerGlState> = keplerGlReducer.initialState({
  mapState: new KeplerMapState(),
  uiState: {
    // use Finnish locale
    locale: LOCALE_CODES.fi,
  },
});

startAppListening({
  actionCreator: createMap,
  effect: async ({ payload }, { dispatch, getState }) => {
    const id = faker.datatype.uuid();
    dispatch(registerMap(id));

    const currentUser = selectCurrentUserId(getState());
    if (!currentUser) {
      throw new Error(`Forbidden : user isn't logged in.`);
    }

    const savedMap = KeplerMapFactory.createFromFormData(payload, currentUser);
    dispatch(wrapTo(id)(addDataToMap(KeplerGlSchema.load(savedMap))));
    dispatch(wrapTo(id)(setMapInfo(savedMap.info)));
    dispatch(wrapTo(id)(createMapSuccess(savedMap)));
  },
});
