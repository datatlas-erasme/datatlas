import { createTransform } from 'redux-persist';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { SavedMap } from 'kepler.gl/src';
import { addSavedMapToState } from '../reducers/keplerGl';

export const KeplerGlTransform = createTransform(
  (inboundState: Record<string, KeplerGlState>) => {
    return Object.keys(inboundState).reduce((outboundState, id) => {
      outboundState[id] = KeplerGlSchema.save(inboundState[id]);
      return outboundState;
    }, {});
  },
  (outboundState: Record<string, SavedMap>) => {
    return Object.keys(outboundState).reduce((inboundState, id) => {
      return addSavedMapToState(inboundState, { id, savedMap: outboundState[id] });
    }, {});
  },
  { whitelist: ['keplerGl'] }
);
