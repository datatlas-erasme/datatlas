import {
  SavedAnimationConfig,
  SavedInteractionConfig as KeplerSavedInteractionConfig,
  SavedVisState as KeplerSavedVisState,
  SavedFilter,
  SavedLayer,
  SplitMap,
  AnimationConfig,
} from '@kepler.gl/types';
import { FiltersConfigInterface, getDefaultFiltersConfig } from './DatatlasGlVisState';
import { SavedEffect } from '@kepler.gl/types/schemas';
import { COMPARE_TYPES } from '@kepler.gl/constants';

export interface SavedInteractionConfig extends KeplerSavedInteractionConfig {
  filters: FiltersConfigInterface;
}

export class SavedVisState implements KeplerSavedVisState {
  animationConfig: SavedAnimationConfig;
  filters: SavedFilter[] = [];
  interactionConfig: SavedInteractionConfig;
  layerBlending = 'normal';
  layers: SavedLayer[] = [];
  splitMaps: SplitMap[] = [];
  effects: SavedEffect[] = [];

  // Importing anything from `@kepler.gl/reducers` causes a build error.
  public static readonly DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
    domain: null,
    currentTime: null,
    speed: 1,
    isAnimating: false,
    timeFormat: null,
    timezone: null,
    defaultTimeFormat: null,
    hideControl: false,
    duration: null,
  };

  constructor() {
    this.animationConfig = SavedVisState.getDefaultSavedAnimationConfig();
    this.interactionConfig = SavedVisState.getDefaultSavedInteractionConfig();
  }

  public static getInitialState = (): SavedVisState => ({
    animationConfig: SavedVisState.getDefaultSavedAnimationConfig(),
    filters: [],
    interactionConfig: SavedVisState.getDefaultSavedInteractionConfig(),
    layerBlending: 'normal',
    layers: [],
    splitMaps: [],
    effects: [],
  });

  public static getDefaultSavedAnimationConfig = (): SavedAnimationConfig => SavedVisState.DEFAULT_ANIMATION_CONFIG;

  public static getDefaultSavedInteractionConfig = (): SavedInteractionConfig => {
    return {
      tooltip: {
        enabled: true,
        fieldsToShow: {},
        compareMode: false,
        compareType: COMPARE_TYPES.ABSOLUTE,
      },
      geocoder: {
        id: 'geocoder',
        label: 'interactions.geocoder',
        enabled: false,
        position: null,
      },
      brush: {
        id: 'brush',
        label: 'interactions.brush',
        enabled: false,
        config: {
          // size is in km
          size: 0.5,
        },
      },
      coordinate: {
        id: 'coordinate',
        label: 'interactions.coordinate',
        enabled: false,
        position: null,
      },
      filters: getDefaultFiltersConfig(),
    };
  };

  static removeInvalidFilters(visState: SavedVisState): SavedVisState {
    return {
      ...visState,
      filters: visState.filters.filter((filter) => filter.name.length > 0),
    };
  }
}
