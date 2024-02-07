import {ActionHandler, toggleModal, VisStateActions} from '@kepler.gl/actions';
import {CSSProperties, MouseEventHandler, TouchEventHandler, ElementType} from 'react';
import {Layer} from '@kepler.gl/layers';
import {Datasets} from '@kepler.gl/table';

export type LayerPanelProps = {
  className?: string;
  style?: CSSProperties;
  onMouseDown?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  layer: Layer;
  datasets: Datasets;
  layerTypeOptions: {
    id: string;
    label: string;
    icon: any; //
    requireData: any; //
  }[];
  isDraggable?: boolean;
  idx: number;
  openModal: ActionHandler<typeof toggleModal>;
  layerColorUIChange: ActionHandler<typeof VisStateActions.layerColorUIChange>;
  layerConfigChange: ActionHandler<typeof VisStateActions.layerConfigChange>;
  layerVisualChannelConfigChange: ActionHandler<
    typeof VisStateActions.layerVisualChannelConfigChange
  >;
  layerSetIsValid: ActionHandler<typeof VisStateActions.layerSetIsValid>;
  layerTypeChange: ActionHandler<typeof VisStateActions.layerTypeChange>;
  layerVisConfigChange: ActionHandler<typeof VisStateActions.layerVisConfigChange>;
  layerTextLabelChange: ActionHandler<typeof VisStateActions.layerTextLabelChange>;
  removeLayer: ActionHandler<typeof VisStateActions.removeLayer>;
  duplicateLayer: ActionHandler<typeof VisStateActions.duplicateLayer>;
  listeners?: ElementType;
  showDatasetTable: ActionHandler<typeof VisStateActions.showDatasetTable>;
  removeDataset: ActionHandler<typeof VisStateActions.removeDataset>;
};
