import { SavedAnimationConfig, SavedInteractionConfig, SavedVisState } from 'kepler.gl/schemas/schema-manager';
import { getDefaultInteraction } from 'kepler.gl/dist/utils/interaction-utils';
import { DEFAULT_ANIMATION_CONFIG } from 'kepler.gl/dist/reducers/vis-state-updaters';

export class KeplerVisState implements SavedVisState {
  animationConfig: SavedAnimationConfig;
  filters = [];
  interactionConfig: SavedInteractionConfig;
  layerBlending = 'normal';
  layers = [];
  splitMaps = [];

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

  public static getDefaultInteractionConfig = (): SavedInteractionConfig => getDefaultInteraction();

  public static getDefaultAnimationConfig = (): SavedAnimationConfig => DEFAULT_ANIMATION_CONFIG;
}
