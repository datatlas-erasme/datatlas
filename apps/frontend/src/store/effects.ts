import { AnyAction, isAnyOf } from '@reduxjs/toolkit';
import { ActionTypes } from '@kepler.gl/actions';
import { deleteEntry } from '@kepler.gl/actions/dist/identity-actions';
import { setLocale as setMapLocale } from '@kepler.gl/actions/dist/ui-state-actions';
import { startAppListening } from './listenerMiddleware';
import { setLocale } from './reducers/locale';
import { UPDATE_MAP_INFO } from './reducers/keplerGl';
import { selectInstance, selectLoggedIn } from './selectors';
import { deleteProject, updateProject } from './api';
import { projectFactory } from '../kepler';

interface KeplerWrappedAction extends AnyAction {
  payload: {
    meta: { _id_: string };
  };
}

const isAKeplerWrappedAction = (action: AnyAction): action is KeplerWrappedAction => action.payload?.meta?._id_;

const isOneOfTheseKeplerTypes =
  (types: string[]) =>
  (action: AnyAction): action is KeplerWrappedAction =>
    types.some((type) => action.type === type);

startAppListening({
  matcher: isAnyOf(
    isOneOfTheseKeplerTypes([
      UPDATE_MAP_INFO,
      // '@@kepler.gl/UPDATE_MAP',
      '@@kepler.gl/ADD_DATA_TO_MAP',
      '@@kepler.gl/SET_MAP_INFO',
      '@@kepler.gl/LOAD_FILES_SUCCESS', // Loading data via a file upload
      '@@kepler.gl/REMOVE_DATASET',
      '@@kepler.gl/MAP_CONFIG_CHANGE',
      // Layers
      '@@kepler.gl/LAYER_TYPE_CHANGE',
      '@@kepler.gl/LAYER_CONFIG_CHANGE',
      '@@kepler.gl/LAYER_VIS_CONFIG_CHANGE',
      // Filters
      '@@kepler.gl/SET_FILTER',
      '@@kepler.gl/REMOVE_FILTER',
      // Interactions
      '@@kepler.gl/INTERACTION_CONFIG_CHANGE',
      // Map style
      '@@kepler.gl/MAP_STYLE_CHANGE',
    ])
  ),
  effect: async (action, { dispatch, getState }) => {
    const state = getState();
    if (!selectLoggedIn(state)) {
      return;
    }

    if (isAKeplerWrappedAction(action)) {
      const id = action.payload.meta._id_;
      const keplerInstance = selectInstance(state, action.payload.meta._id_);

      if (!keplerInstance) {
        throw new Error(`Couldn't find a project with id ${id}`);
      }

      const updateProjectRequest = projectFactory.createUpdateProjectRequestFromKeplerInstance(id, keplerInstance);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(updateProject.initiate(updateProjectRequest));
    } else {
      console.warn(`Action with type ${action.type} wasn't a Kepler wrapped action.`);
    }
  },
});

startAppListening({
  // @ts-ignore
  type: ActionTypes.DELETE_ENTRY,
  // @ts-ignore
  effect: async ({ payload }: ReturnType<typeof deleteEntry>, { dispatch, getState }) => {
    const state = getState();
    if (!selectLoggedIn(state)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(deleteProject.initiate(payload));
  },
});

startAppListening({
  // @ts-ignore
  type: ActionTypes.SET_LOCALE,
  // @ts-ignore
  effect: async (
    {
      payload: {
        payload: { locale },
      },
    }: { payload: ReturnType<typeof setMapLocale> },
    { dispatch }
  ) => {
    dispatch(setLocale(locale));
  },
});
