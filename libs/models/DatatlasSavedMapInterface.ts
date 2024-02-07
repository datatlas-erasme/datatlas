import { SavedMap as KeplerSavedMap } from '@kepler.gl/schemas';
import { MapInfoInterface } from './MapInfoInterface';
import { VersionedSavedMapConfig } from './kepler';

export type SavedMap = Omit<KeplerSavedMap, 'info'> & {
  config: VersionedSavedMapConfig;
  info: MapInfoInterface;
};
