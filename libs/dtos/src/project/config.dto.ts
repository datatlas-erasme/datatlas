import { KeplerMapState, KeplerMapStyle, KeplerVisState, SavedMapConfig } from '@datatlas/models';

export class ConfigDto implements SavedMapConfig {
  mapState: KeplerMapState;
  mapStyle: KeplerMapStyle;
  visState: KeplerVisState;

  constructor(configDto: ConfigDto) {
    Object.assign(this, configDto);
  }
}
