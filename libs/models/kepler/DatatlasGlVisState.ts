import {
  BaseInteraction,
  InteractionConfig,
  TooltipField,
  VisState as KeplerGlVisState,
} from 'kepler.gl/src/reducers/vis-state-updaters';
import { getDefaultInteraction } from 'kepler.gl/dist/utils/interaction-utils';
import { Messages } from 'kepler.gl/dist/components/common/icons';

export type FilterField = TooltipField;

export interface FiltersConfigInterface extends BaseInteraction {
  config: {
    fieldsToShow: {
      [key: string]: FilterField[];
    };
  };
}

export interface DatatlasGlInteractionConfigInterface extends InteractionConfig {
  filters: FiltersConfigInterface;
}

export interface DatatlasGlVisStateInterface extends KeplerGlVisState {
  interactionConfig: DatatlasGlInteractionConfigInterface;
}

export const getDefaultFiltersConfig = () => ({
  id: 'filters',
  label: 'interactions.filters',
  enabled: true,
  iconComponent: Messages,
  config: {
    fieldsToShow: {},
  },
});

export const getDefaultInteractionConfig = () => ({
  ...getDefaultInteraction(),
  filters: getDefaultFiltersConfig(),
});
