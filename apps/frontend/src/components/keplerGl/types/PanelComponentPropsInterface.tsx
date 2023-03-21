import { UIEventHandler } from 'react';
import { Filter, Layer, Datasets } from 'kepler.gl';
import { mapStateActions, mapStyleActions, uiStateActions, visStateActions } from 'kepler.gl/actions';
import { BaseMapStyle } from 'kepler.gl/src/reducers/map-style-updaters';
import { InteractionConfig } from 'kepler.gl/src/reducers/vis-state-updaters';

/**
 * Describe the props injected by default in each "panel component" (~managers) :
 * - layer: LayerManager
 * - filter: FilterManager
 * - interaction: InteractionManager
 * - map: MapManager
 */
export interface PanelComponentPropsInterface {
  datasets: Datasets;
  filters: Filter[];
  layers: Layer[];
  layerClasses: Record<string, Layer>;
  layerOrder: number[];
  layerBlending: string;
  mapStyle: BaseMapStyle;
  mapStyleActions: mapStyleActions;
  mapStateActions: mapStateActions;
  interactionConfig: InteractionConfig;
  removeDataset: UIEventHandler;
  showDatasetTable: UIEventHandler;
  showAddDataModal: UIEventHandler;
  showAddMapStyleModal: UIEventHandler;
  uiStateActions: uiStateActions;
  visStateActions: visStateActions;
}
