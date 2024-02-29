import { SavedConfigV1 as KeplerSavedConfigV1 } from '@kepler.gl/schemas';
import { SavedMapConfig } from './KeplerMapConfig';

export type VersionedSavedMapConfigType = KeplerSavedConfigV1 & { config: SavedMapConfig };
