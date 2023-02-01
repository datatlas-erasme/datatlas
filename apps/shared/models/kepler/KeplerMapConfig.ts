import { KeplerMapState } from './KeplerMapState';
import { KeplerMapStyle } from './KeplerMapStyle';
import { KeplerVisState } from './KeplerVisState';
import { SavedConfigV1 } from 'kepler.gl/schemas';

export type SavedMapConfig = SavedConfigV1['config'];

export class KeplerMapConfig implements SavedMapConfig {
  mapState: KeplerMapState = new KeplerMapState();
  mapStyle: KeplerMapStyle = new KeplerMapStyle();
  visState: KeplerVisState = new KeplerVisState();

  constructor(properties?: Partial<SavedMapConfig>) {
    Object.assign(this, properties);
  }
}
