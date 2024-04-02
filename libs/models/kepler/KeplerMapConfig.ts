import { SavedConfigV1 } from '@kepler.gl/schemas';
import { SavedMapState } from './KeplerMapState';
import { SavedMapStyle } from './KeplerMapStyle';
import { SavedVisState } from './KeplerVisState';

export type KeplerSavedMapConfig = SavedConfigV1['config'];

export class SavedMapConfig implements KeplerSavedMapConfig {
  mapState: SavedMapState = new SavedMapState();
  mapStyle: SavedMapStyle = new SavedMapStyle();
  visState: SavedVisState = new SavedVisState();

  constructor({ visState, ...properties }: Partial<SavedMapConfig> = {}) {
    Object.assign(this, properties);

    if (visState) {
      this.visState = SavedVisState.removeInvalidFilters(visState);
    }
  }
}
