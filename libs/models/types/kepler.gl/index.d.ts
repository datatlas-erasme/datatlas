declare module 'kepler.gl' {
  export * from 'kepler.gl/src';
}

declare module 'kepler.gl/actions' {
  export * from 'kepler.gl/src/actions';
  export * as visStateActions from 'kepler.gl/src/actions/vis-state-actions';
  export * as uiStateActions from 'kepler.gl/src/actions/ui-state-actions';
  export * as mapStateActions from 'kepler.gl/src/actions/map-state-actions';
  export * as mapStyleActions from 'kepler.gl/src/actions/map-style-actions';
}

declare module 'kepler.gl/processors' {
  export * from 'kepler.gl/src/processors/data-processor';
  export * from 'kepler.gl/src/processors/file-handler';
}

declare module 'kepler.gl/reducers' {
  export * from 'kepler.gl/src/reducers';
  export * from 'kepler.gl/src/reducers/core';
  export * from 'kepler.gl/src/reducers/combined-updaters';
}

declare module 'kepler.gl/dist/reducers/vis-state-updaters' {
  export { DEFAULT_ANIMATION_CONFIG } from 'kepler.gl/src/reducers/vis-state-updaters';
}

declare module 'kepler.gl/schemas' {
  export * from 'kepler.gl/src/schemas';
}

declare module 'kepler.gl/schemas/schema-manager' {
  export * from 'kepler.gl/src/schemas/schema-manager';
}

declare module 'kepler.gl/dist/utils' {
  export * from 'kepler.gl/src/utils';
  export * from 'kepler.gl/src/utils/table-utils/data-container-utils';
  export function hexToRgb(s: string): RGBColor;
}

declare module 'kepler.gl/dist/utils/interaction-utils' {
  export * from 'kepler.gl/src/utils/interaction-utils';
}

declare module 'kepler.gl/dist/constants' {
  export const DataVizColors: Record<string, string>;
}

declare module 'kepler.gl/dist/constants/default-settings' {
  import { LayerGroup } from 'kepler.gl/src';
  export const DEFAULT_LAYER_GROUPS: LayerGroup[];
  export const ICON_PREFIX: string;
}
