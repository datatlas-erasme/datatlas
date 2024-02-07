import { BaseInteraction, InteractionConfig as KeplerInteractionConfig, TooltipField } from '@kepler.gl/types';
import { VisState as KeplerVisState } from '@kepler.gl/schemas';
import { MapInfoInterface } from '../MapInfoInterface';
import { Filter } from '../filters';

export type FilterField = TooltipField;

export interface FiltersConfigInterface extends BaseInteraction {
  id: 'filters';
  config: {
    fieldsToShow: {
      [key: string]: FilterField[];
    };
  };
}

export interface InteractionConfig extends KeplerInteractionConfig {
  filters: FiltersConfigInterface;
}

export interface VisState extends Omit<KeplerVisState, 'mapInfo'> {
  interactionConfig: InteractionConfig;
  mapInfo: MapInfoInterface;
  filters: Filter[];
}

export const getDefaultMapInfo = (): MapInfoInterface => ({
  createdAt: new Date(),
  description: '',
  draft: true,
  contributorsIds: [],
  title: '',
  ownerId: 0,
});

export const getDefaultFiltersConfig = (): FiltersConfigInterface => ({
  id: 'filters',
  label: 'interactions.filters',
  enabled: true,
  config: {
    fieldsToShow: {},
  },
});

export const enhanceVisState = (keplerVisState: VisState | KeplerVisState): VisState => ({
  ...keplerVisState,
  mapInfo: {
    ...getDefaultMapInfo(),
    ...keplerVisState.mapInfo,
  },
  interactionConfig: {
    ...keplerVisState.interactionConfig,
    filters: getDefaultFiltersConfig(),
  },
  filters: keplerVisState.filters.map((filter) => ({
    public: false,
    ...filter,
  })),
});
