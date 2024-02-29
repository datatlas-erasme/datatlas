import {UIEventHandler} from 'react';
import {Filter, InteractionConfig, BaseMapStyle} from '@kepler.gl/types';
import {Layer} from '@kepler.gl/layers';
import {
  MapStateActions,
  MapStyleActions,
  UIStateActions,
  VisStateActions
} from '@kepler.gl/actions';
import {Datasets} from '@kepler.gl/table';

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
  mapStyleActions: typeof MapStyleActions;
  mapStateActions: typeof MapStateActions;
  interactionConfig: InteractionConfig;
  removeDataset: UIEventHandler;
  showDatasetTable: UIEventHandler;
  showAddDataModal: UIEventHandler;
  showAddMapStyleModal: UIEventHandler;
  uiStateActions: typeof UIStateActions;
  visStateActions: typeof VisStateActions;
}
