import {WrappedComponentProps} from 'react-intl';
import {Datasets} from '@kepler.gl/table';
import {Layer, LayerClassesType} from '@kepler.gl/layers';
import {UIStateActions, VisStateActions, ActionHandler} from '@kepler.gl/actions';
import {PanelListView} from '@kepler.gl/types';
import {SidePanelItem} from '@kepler.gl/components/dist/types';

export type LayerManagerProps = {
  datasets: Datasets;
  layers: Layer[];
  layerOrder: string[];
  layerClasses: LayerClassesType;
  layerBlending: string;
  overlayBlending: string;
  uiStateActions: typeof UIStateActions;
  visStateActions: typeof VisStateActions;
  showAddDataModal: () => void;
  removeDataset: ActionHandler<typeof UIStateActions.openDeleteModal>;
  showDatasetTable: ActionHandler<typeof VisStateActions.showDatasetTable>;
  updateTableColor: ActionHandler<typeof VisStateActions.updateTableColor>;
  panelListView: PanelListView;
  panelMetadata: SidePanelItem;
} & WrappedComponentProps;
