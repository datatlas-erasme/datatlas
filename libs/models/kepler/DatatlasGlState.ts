import { KeplerGlState } from '@kepler.gl/reducers';
import { enhanceVisState, VisState } from './DatatlasGlVisState';

export interface DatatlasGlState extends Omit<KeplerGlState, 'visState'> {
  visState: VisState;
}

export type DatatlasGlInstances = Record<string, DatatlasGlState>;

export const enhanceGlState = (glState: DatatlasGlState | KeplerGlState): DatatlasGlState => ({
  ...glState,
  visState: enhanceVisState(glState.visState),
});
