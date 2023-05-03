import { KeplerMapState, KeplerMapStyle, KeplerVisState, SavedMapConfig } from '@datatlas/models';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class ConfigDto implements SavedMapConfig {
  @IsOptional()
  mapState: KeplerMapState = new KeplerMapState();
  @IsOptional()
  @Exclude()
  mapStyle: KeplerMapStyle = new KeplerMapStyle();
  @IsOptional()
  @Exclude()
  visState: KeplerVisState = new KeplerVisState();

  constructor(configDto?: Partial<ConfigDto>) {
    Object.assign(this, configDto);
  }
}
