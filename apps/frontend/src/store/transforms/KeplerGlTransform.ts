import { createTransform } from 'redux-persist';
import { KeplerGlSchema } from '@kepler.gl/schemas';
import { SavedMap, DatatlasGlState } from '@datatlas/models';
import { addSavedMapToState } from '../reducers/keplerGl';

export const KeplerGlTransform = createTransform(
  (inboundState: Record<string, DatatlasGlState>) => {
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
