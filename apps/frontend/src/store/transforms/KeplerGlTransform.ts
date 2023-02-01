import { createTransform } from 'redux-persist';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { SavedMap } from 'kepler.gl/src';
import { reducer as keplerGlReducer, registerMap } from '../reducers/keplerGl';
import { addDataToMap, setMapInfo, wrapTo } from 'kepler.gl/actions';

export const KeplerGlTransform = createTransform(
  (inboundState: Record<string, KeplerGlState>) => {
    return Object.keys(inboundState).reduce((outboundState, id) => {
      outboundState[id] = KeplerGlSchema.save(inboundState[id]);
      return outboundState;
    }, {});
  },
  (outboundState: Record<string, SavedMap>) => {
    return Object.keys(outboundState).reduce((inboundState, id) => {
      const wrapToMap = wrapTo(id);
      const savedMap = outboundState[id];
      const loadedMap = KeplerGlSchema.load(savedMap);
      const actions = [registerMap(id), wrapToMap(addDataToMap(loadedMap)), wrapToMap(setMapInfo(savedMap.info))];

      return { ...inboundState, ...actions.reduce(keplerGlReducer, {}) };
    }, {});
  },
  { whitelist: ['keplerGl'] }
);
