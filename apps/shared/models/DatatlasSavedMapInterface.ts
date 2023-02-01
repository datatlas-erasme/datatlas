import { SavedMap } from 'kepler.gl/schemas';
import { MapInfoInterface } from './MapInfoInterface';

export type DatatlasSavedMapInterface = Omit<SavedMap, 'info'> & {
  info: MapInfoInterface;
};
