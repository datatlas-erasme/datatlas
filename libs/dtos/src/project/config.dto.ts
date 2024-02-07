import { SavedMapConfig, SavedMapState, SavedMapStyle, SavedVisState } from '@datatlas/models';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class ConfigDto implements SavedMapConfig {
  @IsOptional()
  mapState: SavedMapState = new SavedMapState();
  @IsOptional()
  @Exclude()
  mapStyle: SavedMapStyle = new SavedMapStyle();
  @IsOptional()
  @Exclude()
  visState: SavedVisState = new SavedVisState();

  constructor(configDto?: Partial<ConfigDto>) {
    Object.assign(this, configDto);
  }
}
