import {handleActions} from 'redux-actions';
import {_actionFor, _updateProperty, ActionTypes, keplerGlInit} from '@kepler.gl/actions';
import {coreReducerFactory} from './core';

// INITIAL_STATE
const initialCoreState = {};

export function provideInitialState(initialState = {}) {
  const coreReducer = coreReducerFactory(initialState);

  const handleRegisterEntry = (
    state,
    {
      payload: {
        id,
        mint,
        mapboxApiAccessToken,
        mapboxApiUrl,
        mapStylesReplaceDefault,
        initialUiState
      }
    }
  ) => {
    // by default, always create a mint state even if the same id already exist
    // if state.id exist and mint=false, keep the existing state
    const previousState = state[id] && mint === false ? state[id] : undefined;

    return {
      // register entry to kepler.gl passing in mapbox config to mapStyle
      ...state,
      [id]: coreReducer(
        previousState,
        keplerGlInit({mapboxApiAccessToken, mapboxApiUrl, mapStylesReplaceDefault, initialUiState})
      )
    };
  };

  const handleDeleteEntry = (state, {payload: id}) =>
    Object.keys(state).reduce(
      (accu, curr) => ({
        ...accu,
        ...(curr === id ? {} : {[curr]: state[curr]})
      }),
      {}
    );

  const handleRenameEntry = (state, {payload: {oldId, newId}}) =>
    Object.keys(state).reduce(
      (accu, curr) => ({
        ...accu,
        ...{[curr === oldId ? newId : curr]: state[curr]}
      }),
      {}
    );

  return (state = initialCoreState, action) => {
    // update child states
    Object.keys(state).forEach(id => {
      const updateItemState = coreReducer(state[id], _actionFor(id, action));
      state = _updateProperty(state, id, updateItemState);
    });

    // perform additional state reducing (e.g. switch action.type etc...)
    const handlers = {
      [ActionTypes.REGISTER_ENTRY]: handleRegisterEntry,
      [ActionTypes.DELETE_ENTRY]: handleDeleteEntry,
      [ActionTypes.RENAME_ENTRY]: handleRenameEntry
    };

    return handleActions(handlers, initialCoreState)(state, action);
  };
}

const _keplerGlReducer = provideInitialState();

function mergeInitialState(saved = {}, provided = {}) {
  const keys = ['mapState', 'mapStyle', 'visState', 'uiState'];

  // shallow merge each reducer
  return keys.reduce(
    (accu, key) => ({
      ...accu,
      ...(saved[key] && provided[key]
        ? {[key]: {...saved[key], ...provided[key]}}
        : {[key]: saved[key] || provided[key] || {}})
    }),
    {}
  );
}

function decorate(target, savedInitialState = {}) {
  const targetInitialState = savedInitialState;

  target.plugin = function plugin(customReducer) {
    if (typeof customReducer === 'object') {
      // if only provided a reducerMap, wrap it in a reducer
      customReducer = handleActions(customReducer, {});
    }

    // use 'function' keyword to enable 'this'
    return decorate((state = {}, action = {}) => {
      let nextState = this(state, action);

      // for each entry in the staten
      Object.keys(nextState).forEach(id => {
        // update child states
        nextState = _updateProperty(
          nextState,
          id,
          customReducer(nextState[id], _actionFor(id, action))
        );
      });

      return nextState;
    });
  };

  target.initialState = function initialState(iniSt) {
    const merged = mergeInitialState(targetInitialState, iniSt);
    const targetReducer = provideInitialState(merged);

    return decorate(targetReducer, merged);
  };

  return target;
}

export const keplerGlReducer = decorate(_keplerGlReducer);
