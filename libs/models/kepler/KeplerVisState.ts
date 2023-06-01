import { SplitMap } from 'kepler.gl/reducers';
import {
  SavedAnimationConfig,
  SavedInteractionConfig,
  SavedVisState,
  SavedFilter,
  SavedLayer,
} from 'kepler.gl/schemas/schema-manager';
import { DEFAULT_ANIMATION_CONFIG } from 'kepler.gl/dist/reducers/vis-state-updaters';
import { DatatlasGlInteractionConfigInterface, getDefaultInteractionConfig } from './DatatlasGlVisState';

export class KeplerVisState implements SavedVisState {
  animationConfig: SavedAnimationConfig;
  filters: SavedFilter[] = [];
  interactionConfig: SavedInteractionConfig;
  layerBlending = 'normal';
  layers: SavedLayer[] = [];
  splitMaps: SplitMap[] = [];

  constructor() {
    this.animationConfig = KeplerVisState.getDefaultAnimationConfig();
    this.interactionConfig = KeplerVisState.getDefaultInteractionConfig();
  }

  public static getInitialState = (): SavedVisState => ({
    animationConfig: KeplerVisState.getDefaultAnimationConfig(),
    filters: [],
    interactionConfig: KeplerVisState.getDefaultInteractionConfig(),
    layerBlending: 'normal',
    layers: [],
    splitMaps: [],
  });

  public static getDefaultInteractionConfig = (): DatatlasGlInteractionConfigInterface => getDefaultInteractionConfig();

  public static getDefaultAnimationConfig = (): SavedAnimationConfig => DEFAULT_ANIMATION_CONFIG;

  static removeInvalidFilters(visState: KeplerVisState): KeplerVisState {
    return {
      ...visState,
      filters: visState.filters.filter((filter) => filter.name.length > 0),
    };
  }
}
