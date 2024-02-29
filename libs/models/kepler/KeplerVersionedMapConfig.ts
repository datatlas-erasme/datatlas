import { SavedMapConfig } from './KeplerMapConfig';
import { VersionedSavedMapConfigType } from './KeplerVersionedMapConfigInterface';

export class VersionedSavedMapConfig implements VersionedSavedMapConfigType {
  config: SavedMapConfig = new SavedMapConfig();
  version = 'v1' as const;

  constructor(config: SavedMapConfig = new SavedMapConfig(), version = 'v1' as const) {
    this.config = new SavedMapConfig(config);
    this.version = version;
  }
}
